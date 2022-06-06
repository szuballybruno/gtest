import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';
import { ModuleDetailedDTO } from './ModuleDetailedDTO';
import { ModuleDTO } from './ModuleDTO';
import { CourseItemStateType, CourseModeType } from '../types/sharedTypes';
import { VideoPlayerDataDTO } from './VideoDTO';

export type PlayerDataDTO = {
    video: VideoPlayerDataDTO | null;
    exam: ExamPlayerDataDTO | null;
    module: ModuleDetailedDTO;
    answerSessionId: number | null;
    mode: CourseModeType;
    courseId: number;
    courseItemCode: string;
    modules: ModuleDTO[];
    nextItemCode: string | null;
    nextItemState: CourseItemStateType | null;
    shouldRepeatVideo: boolean | null;
}