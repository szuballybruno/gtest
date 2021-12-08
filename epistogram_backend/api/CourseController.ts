import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { Video } from "../models/entity/Video";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { CourseEditDataDTO as CourseEditDataDTO } from "../models/shared_models/CourseEditDataDTO";
import { CreateCourseDTO } from "../models/shared_models/CreateCourseDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { deleteCourseAsync, getAdminCoursesAsync, getAvailableCoursesAsync, getCourseEditDataAsync, getCourseProgressDataAsync, setCourseTypeAsync, startCourseAsync } from "../services/courseService";
import { getFilePath, uploadAssigendFileAsync } from "../services/fileService";
import { toCourseDetailsDTO } from "../services/mappings";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class CourseController {

    startCourseAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

        return startCourseAsync(params.userId, courseId);
    };

    getAvailableCoursesAction = async (params: ActionParams) => {

        return getAvailableCoursesAsync(params.userId);
    };

    getCourseEditDataAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

        return await getCourseEditDataAsync(courseId);
    };

    getAdminCourseListAction = (params: ActionParams) => {

        return getAdminCoursesAsync();
    }

    getCourseBriefDataAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

        const course = await staticProvider
            .ormConnection
            .getRepository(Course)
            .findOneOrFail(courseId);

        return {
            id: course.id,
            title: course.title
        } as CourseBriefData;
    };

    getCourseDetailsAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req.query.courseId, "number");

        const course = await staticProvider
            .ormConnection
            .getRepository(Course)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.category", "cat")
            .leftJoinAndSelect("c.subCategory", "scat")
            .where("c.id = :courseId", { courseId })
            .getOneOrFail();

        return toCourseDetailsDTO(course);
    }

    saveCourseAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CourseEditDataDTO>(params.req?.body);

        // save basic info
        await staticProvider
            .ormConnection
            .getRepository(Course)
            .save({
                id: dto.courseId,
                title: dto.title,
                categoryId: dto.category.id,
                subCategoryId: dto.subCategory.id
            });

        // save module order index 
        await staticProvider
            .ormConnection
            .getRepository(CourseModule)
            .save(dto
                .modules
                .map(x => ({
                    id: x.id,
                    orderIndex: x.orderIndex
                } as CourseModule)));

        // save video orders
        await staticProvider
            .ormConnection
            .getRepository(Video)
            .save(dto
                .modules
                .flatMap(x => x.items)
                .filter(x => x.type === "video")
                .map(x => ({
                    id: x.id,
                    orderIndex: x.orderIndex,
                    moduleId: x.moduleId
                } as Video)));

        // save exam orders
        await staticProvider
            .ormConnection
            .getRepository(Exam)
            .save(dto
                .modules
                .flatMap(x => x.items)
                .filter(x => x.type === "exam")
                .map(x => ({
                    id: x.id,
                    orderIndex: x.orderIndex,
                    moduleId: x.moduleId
                } as Video)));
    };

    saveCourseThumbnailAction = async (params: ActionParams) => {

        const file = withValueOrBadRequest<UploadedFile>(params.req.files?.file);
        const courseId = withValueOrBadRequest<number>(params.req.body.courseId, "number");

        const getCourseAsync = () => staticProvider
            .ormConnection
            .getRepository(Course)
            .findOneOrFail(courseId);

        const setCourseThumbnailIdAsync = (thumbnailFileId: number) => staticProvider
            .ormConnection
            .getRepository(Course)
            .save({
                id: courseId,
                coverFileId: thumbnailFileId
            });

        return uploadAssigendFileAsync<Course>(
            getFilePath("courseCoverImages", "courseCoverImage", courseId, ".jpg"),
            getCourseAsync,
            setCourseThumbnailIdAsync,
            course => course.coverFileId,
            file.data);
    }

    deleteCourseAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

        await deleteCourseAsync(courseId);
    }

    createCourseAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CreateCourseDTO>(params.req.body);

        await staticProvider
            .ormConnection
            .getRepository(Course)
            .insert({
                title: dto.title,
                teacherId: 1,
                categoryId: 1,
                subCategoryId: 1,
            });
    }

    setCourseModeAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req.query.courseId, "number");
        const modeType = withValueOrBadRequest<CourseModeType>(params.req.query.mode);

        return setCourseTypeAsync(params.userId, courseId, modeType);
    };

    getCourseProgressDataAction = async (params: ActionParams) => {

        return getCourseProgressDataAsync(params.userId);
    };
}