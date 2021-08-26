import {IdType} from "../../shared_models/types/sharedTypes";
import {GetUserCoursesDTO} from "../models/shared_models/GetUserCoursesDTO";
import {toCourseAdminDTO} from "./mappings";
import {getTypeORMConnection} from "../database";
import {Course} from "../models/entity/Course";

export const getAdminCoursesAsync = async (userId: IdType, dto: GetUserCoursesDTO) => {
    const aggregatedCourses = await getTypeORMConnection()
        .getRepository(Course)
        .find()
    return aggregatedCourses.map(course => toCourseAdminDTO(course));
}
