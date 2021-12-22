import { ViewColumn, ViewEntity } from "typeorm";
import { CourseVisibilityType } from "../shared_models/types/sharedTypes";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseDetailsView {

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    title: string;

    @ViewColumn()
    shortDescription: string;

    @ViewColumn()
    description: string;

    @ViewColumn()
    difficulty: number;

    @ViewColumn()
    benchmark: number;

    @ViewColumn()
    humanSkillBenefitsDescription: string;

    @ViewColumn()
    visibility: CourseVisibilityType;

    @ViewColumn()
    languageName: string;

    @ViewColumn()
    technicalRequirements: string;

    @ViewColumn()
    skillBenefits: string;

    @ViewColumn()
    humanSkillBenefits: string;

    @ViewColumn()
    categoryId: number;

    @ViewColumn()
    categoryName: string;

    @ViewColumn()
    subCategoryId: number;

    @ViewColumn()
    subCategoryName: string;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    teacherLastName: string;

    @ViewColumn()
    coverFilePath: string;
}