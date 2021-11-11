import { JoinColumn, ManyToOne, ViewColumn, ViewEntity } from "typeorm";
import { CourseItemStateType, CourseModeType } from "../shared_models/types/sharedTypes";
import { Exam } from "../entity/Exam";
import { Video } from "../entity/Video";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseItemStateView {

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    itemIsVideo: boolean;

    @ViewColumn()
    itemId: number;

    @ViewColumn()
    moduleId: number;

    @ViewColumn()
    moduleName: string;

    @ViewColumn()
    moduleOrderIndex: number;

    @ViewColumn()
    itemOrderIndex: number;

    @ViewColumn()
    itemTitle: string;

    @ViewColumn()
    itemSubtitle: string;

    @ViewColumn()
    itemCode: string;

    @ViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    courseMode: CourseModeType;

    @ViewColumn()
    state: CourseItemStateType;
}