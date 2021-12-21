import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { CourseContentEditDataDTO } from "../models/shared_models/CourseContentEditDataDTO";
import { CourseDetailsEditDataDTO as CourseDetailsEditDataDTO } from "../models/shared_models/CourseDetailsEditDataDTO";
import { CreateCourseDTO } from "../models/shared_models/CreateCourseDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { CourseService } from "../services/CourseService";
import { getFilePath, uploadAssigendFileAsync } from "../services/fileService";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class CourseController {

    private _courseService: CourseService;

    constructor(courseService: CourseService) {

        this._courseService = courseService;
    }

    startCourseAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

        return this._courseService.startCourseAsync(params.userId, courseId);
    };

    getAvailableCoursesAction = async (params: ActionParams) => {

        return this._courseService.getAvailableCoursesAsync(params.userId);
    };

    getCourseDetailsEditDataAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

        return await this._courseService.getCourseDetailsEditDataAsync(courseId);
    };

    getCourseContentEditDataAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

        return await this._courseService.getCourseContentEditDataAsync(courseId);
    };

    getAdminCourseListAction = (params: ActionParams) => {

        return this._courseService.getAdminCoursesAsync();
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

        return await this._courseService.getCourseDetailsAsync(courseId);
    }

    saveCourseDetailsAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CourseDetailsEditDataDTO>(params.req?.body);

        await this._courseService.saveCourseDetailsAsync(dto);
    };

    saveCourseContentAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CourseContentEditDataDTO>(params.req?.body);

        await this._courseService
            .saveCourseContentAsync(dto);
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

        await this._courseService.deleteCourseAsync(courseId);
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

        return this._courseService.setCourseTypeAsync(params.userId, courseId, modeType);
    };

    getCourseProgressShortAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressShortAsync(params.userId);
    }

    getCourseProgressDataAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressDataAsync(params.userId);
    };
}