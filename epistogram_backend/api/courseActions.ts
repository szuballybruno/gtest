import { Request } from "express";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { getUserIdFromRequest } from "../services/authenticationService";
import { getUserCoursesDataAsync, setCourseTypeAsync, startCourseAsync } from "../services/courseService"
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const startCourseAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const courseId = withValueOrBadRequest<number>(req.query.courseId, "number");

    return startCourseAsync(userId, courseId);
});

export const setCourseTypeAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const courseId = withValueOrBadRequest<number>(req.query.courseId, "number");
    const modeType = withValueOrBadRequest<CourseModeType>(req.query.mode);

    return setCourseTypeAsync(userId, courseId, modeType);
});

export const getUserCoursesDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getUserCoursesDataAsync(userId);
});