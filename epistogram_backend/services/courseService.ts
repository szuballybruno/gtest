import { Course } from "../models/entity/Course";
import { CourseCategory } from "../models/entity/CourseCategory";
import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { ModuleDTO } from "../models/shared_models/ModuleDTO";
import { TextDTO } from "../models/shared_models/TextDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { UserCoursesDataDTO } from "../models/shared_models/UserCoursesDataDTO";
import { CourseAdminDetailedView } from "../models/views/CourseAdminDetailedView";
import { CourseAdminShortView } from "../models/views/CourseAdminShortView";
import { CourseItemStateView } from "../models/views/CourseItemStateView";
import { CourseView } from "../models/views/CourseView";
import { staticProvider } from "../staticProvider";
import { getItemCode, readItemCode } from "./encodeService";
import { toCourseAdminShortDTO, toCourseEditDataDTO, toCourseItemDTO, toCourseItemDTOExam, toCourseItemDTOVideo, toCourseShortDTO, toExamDTO, toSimpleCourseItemDTOs } from "./mappings";
import { deleteModulesAsync } from "./moduleService";
import { getVideoByIdAsync } from "./videoService";

export const getCourseProgressDataAsync = async (userId: number) => {

    const courses = await staticProvider
        .ormConnection
        .getRepository(CourseView)
        .createQueryBuilder("cv")
        .leftJoinAndSelect("cv.teacher", "t")
        .where("cv.userId = :userId", { userId })
        .getMany();

    const inProgressCourses = courses
        .filter(x => x.isStarted && !x.isCompleted);

    const completedCourses = courses
        .filter(x => x.isCompleted);

    const inProgressCoursesAsCourseShortDTOs = inProgressCourses
        .map(x => toCourseShortDTO(x));

    const completedCoursesAsCourseShortDTOs = completedCourses
        .map(x => toCourseShortDTO(x));


    return {
        isAnyCoursesComplete: completedCourses.any(x => true),
        isAnyCoursesInProgress: inProgressCourses.any(x => true),

        completedCourses: completedCoursesAsCourseShortDTOs,

        inProgressCourses: inProgressCoursesAsCourseShortDTOs
    } as UserCoursesDataDTO;
}

export const getCourseItemsDescriptorCodesAsync = async (userId: number, courseId: number) => {

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .where("c.id = :courseId", { courseId })
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .getOneOrFail();

    const codes = course
        .videos
        .map(x => ({ code: getItemCode(x.id, "video"), order: x.orderIndex }))
        .concat(course
            .exams
            .map(e => ({ code: getItemCode(e.id, "exam"), order: e.orderIndex })));

    return codes.orderBy(x => x.order).map(x => x.code);
}

export const getCurrentCourseItemsAsync = async (userId: number) => {

    // get current item 
    const courseBridge = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .findOne({
            where: {
                userId,
                isCurrent: true
            }
        });

    if (!courseBridge)
        return [];

    if (!courseBridge.currentItemCode)
        return [];

    const { itemType } = readItemCode(courseBridge.currentItemCode);

    // get course items 
    const modules = await getCourseModulesAsync(userId, courseBridge.courseId);

    if (itemType !== "module") {

        // set current item's state to 'current'
        let currentItem = modules
            .flatMap(x => x.items)
            .single(item => item.descriptorCode === courseBridge.currentItemCode);

        currentItem.state = "current";

        // set current module 
        const currentModule = modules
            .single(x => x.items
                .any(x => x.descriptorCode === currentItem.descriptorCode));

        currentModule.state = "current";
    }
    else {

        const module = modules
            .single(x => x.code === courseBridge.currentItemCode);

        module.state = "current";
    }

    return modules;
}

export const getCourseModulesAsync = async (userId: number, courseId: number) => {

    const views = await staticProvider
        .ormConnection
        .getRepository(CourseItemStateView)
        .createQueryBuilder("cisv")
        .where("cisv.courseId = :courseId", { courseId })
        .andWhere("cisv.userId = :userId", { userId })
        .getMany();

    const modules = views
        .groupBy(x => x.moduleId)
        .map(x => {

            const viewAsModule = x.items.first();
            const isLockedModule = x.items[0]?.state === "locked";
            const isCompletedModule = x.items.all(x => x.state === "completed");

            return {
                id: viewAsModule.moduleId,
                name: viewAsModule.moduleName,
                orderIndex: viewAsModule.moduleOrderIndex,
                code: viewAsModule.moduleCode,
                items: x
                    .items
                    .map(x => toCourseItemDTO(x)),
                state: isLockedModule
                    ? "locked"
                    : isCompletedModule
                        ? "completed"
                        : "available"
            } as ModuleDTO;
        });

    return modules;
}

export const getCourseIdByItemCodeAsync = async (descriptorCode: string) => {

    const { itemId, itemType } = readItemCode(descriptorCode);

    if (itemType === "video")
        return (await getVideoByIdAsync(itemId)).courseId;

    if (itemType === "exam")
        return (await getExamByIdAsync(itemId)).courseId;

    return (await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .findOneOrFail(itemId)).courseId;
}

export const getCourseItemCode = (videoId?: number | null, examId?: number | null) => {

    if (videoId)
        return getItemCode(videoId, "video");

    if (examId)
        return getItemCode(examId, "exam");

    throw new Error("Arguments are null or undefined");
}

export const getExamDTOAsync = async (userId: number, examId: number) => {

    const exam = await staticProvider
        .ormConnection
        .getRepository(Exam)
        .createQueryBuilder("e")
        .where("e.id = :examId", { examId })
        .leftJoinAndSelect("e.questions", "q")
        .leftJoinAndSelect("q.answers", "a")
        .getOneOrFail();

    const questionIds = exam.questions.map(x => x.id);

    if (questionIds.length === 0)
        throw new Error("Exam has no questions assigend.");

    return toExamDTO(exam);
}

export const getUserCourseBridgeAsync = async (userId: number, courseId: number) => {

    const userCourseBridge = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .findOne({
            where: {
                userId: userId,
                courseId: courseId
            }
        });

    return userCourseBridge;
}

export const getUserCourseBridgeOrFailAsync = async (userId: number, courseId: number) => {

    const userCourseBridge = await getUserCourseBridgeAsync(userId, courseId);
    if (!userCourseBridge)
        throw new Error("User course bridge not found, maybe the course is not yet started!");

    return userCourseBridge;
}

export const startCourseAsync = async (userId: number, courseId: number) => {

    const module = await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .findOne({
            where: {
                courseId,
                orderIndex: 0
            }
        });

    const moduleCode = module ? getItemCode(module.id, "module") : null;

    if (moduleCode)
        await setCurrentCourse(userId, courseId, moduleCode);

    return {
        text: moduleCode
    } as TextDTO;
}

export const setCurrentCourse = async (
    userId: number,
    courseId: number,
    itemCode: string) => {

    const currentCourseBridge = await getUserCourseBridgeAsync(userId, courseId);

    // insert new bridge
    if (!currentCourseBridge) {

        await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .insert({
                courseId: courseId,
                userId: userId,
                courseMode: "beginner",
                currentItemCode: itemCode
            } as UserCourseBridge);
    }

    // update current video/exam id 
    else {

        await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .save({
                id: currentCourseBridge.id,
                currentItemCode: itemCode
            } as UserCourseBridge);
    }

    // get all bridges for user 
    const bridges = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .find({
            where: {
                userId
            }
        });

    // update current bridge 
    await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .save(bridges
            .map(bridge => ({
                id: bridge.id,
                isCurrent: bridge.courseId === courseId,
            } as UserCourseBridge)));
}

export const setCourseTypeAsync = async (userId: number, courseId: number, mode: CourseModeType) => {

    const userCourseBridge = await getUserCourseBridgeAsync(userId, courseId);
    if (!userCourseBridge)
        throw new Error("User course bridge not found!");

    await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .save({
            courseId: courseId,
            userId: userId,
            id: userCourseBridge.id,
            courseMode: mode
        } as UserCourseBridge);
}

const getExamByIdAsync = (examId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Exam)
        .findOneOrFail(examId);
}

export const getCourseEditDataAsync = async (courseId: number) => {

    // get course 
    const views = await staticProvider
        .ormConnection
        .getRepository(CourseAdminDetailedView)
        .createQueryBuilder("course")
        .where("course.id = :courseId", { courseId: courseId })
        .getMany();

    const categories = await staticProvider
        .ormConnection
        .getRepository(CourseCategory)
        .createQueryBuilder("cc")
        .leftJoinAndSelect("cc.childCategories", "ccc")
        .where("cc.parentCategoryId IS NULL")
        .getMany();

    return toCourseEditDataDTO(views, categories);
}

export const getAdminCoursesAsync = async () => {

    const courseAdminShortViews = await staticProvider
        .ormConnection
        .getRepository(CourseAdminShortView)
        .createQueryBuilder()
        .getMany();

    return courseAdminShortViews
        .map(casv => toCourseAdminShortDTO(casv));
}

export const deleteCourseAsync = async (courseId: number) => {

    // delete user course bridges
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(UserCourseBridge)
        .where("courseId = :courseId", { courseId })
        .execute();

    // delete modules 
    const modules = await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .createQueryBuilder("m")
        .where('"m"."courseId" = :courseId', { courseId })
        .getMany();

    await deleteModulesAsync(modules.map(x => x.id));

    // delete course 
    await staticProvider
        .ormConnection
        .getRepository(Course)
        .delete(courseId);

}

export const unsetUsersCurrentCourseItemAsync = async (examId?: number, videoId?: number) => {

    const isExam = !!examId;

    // unset user current course item
    const item = isExam
        ? await staticProvider
            .ormConnection
            .getRepository(Exam)
            .findOneOrFail(examId)
        : await staticProvider
            .ormConnection
            .getRepository(Video)
            .findOneOrFail(videoId);

    const currentItemDTO = isExam
        ? toCourseItemDTOExam(item as Exam)
        : toCourseItemDTOVideo(item as Video);

    const currentItemCode = getItemCode(isExam ? examId! : videoId!, isExam ? "exam" : "video");

    const courseId = item.courseId;

    const courseItemDTOs = await getSimpleCourseItemDTOs(courseId);

    const prevIndex = courseItemDTOs
        .findIndex(x => x.descriptorCode === currentItemDTO.descriptorCode) - 1;

    const courseItemsWithoutCurrent = courseItemDTOs
        .filter(x => x.descriptorCode !== currentItemDTO.descriptorCode);

    const previousCourseItem = prevIndex > 0
        ? courseItemDTOs[prevIndex - 1]
        : courseItemsWithoutCurrent.length > 0
            ? courseItemsWithoutCurrent[0]
            : null;

    // update bridges
    const courseBridges = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .find({
            where: {
                currentItemCode: currentItemCode,
                courseId
            }
        });

    courseBridges
        .forEach(x => x.currentItemCode = previousCourseItem?.descriptorCode ?? null);

    await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .save(courseBridges);

    // remove current course bridge
    if (!previousCourseItem)
        await staticProvider
            .ormConnection
            .createQueryBuilder()
            .delete()
            .from(UserCourseBridge)
            .where("courseId = :courseId", { courseId })
            .execute();
}

export const getSimpleCourseItemDTOs = async (courseId: number) => {

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .where("c.id = :courseId", { courseId })
        .getOneOrFail();

    const courseItemDTOs = toSimpleCourseItemDTOs(course);

    return courseItemDTOs;
}

export const getAvailableCoursesAsync = async (userId: number) => {

    const courses = await staticProvider
        .ormConnection
        .getRepository(CourseView)
        .createQueryBuilder("cv")
        .where("cv.userId = :userId", { userId })
        .leftJoinAndSelect("cv.teacher", "t")
        .getMany();

    return courses
        .map(course => toCourseShortDTO(course));
}
