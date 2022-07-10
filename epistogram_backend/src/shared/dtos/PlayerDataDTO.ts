import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';
import { ModuleDetailedDTO } from './ModuleDetailedDTO';
import { PlaylistModuleDTO } from './PlaylistModuleDTO';
import { CourseItemStateType, CourseModeType } from '../types/sharedTypes';
import { VideoPlayerDataDTO } from './VideoDTO';
import { Course } from '../../models/entity/course/Course';
import { Id } from '../types/versionId';
import { AnswerSession } from '../../models/entity/AnswerSession';

export class PlayerDataDTO {
    videoPlayerData: VideoPlayerDataDTO | null;
    examPlayerData: ExamPlayerDataDTO | null;
    modulePlayerData: ModuleDetailedDTO | null;
    answerSessionId: Id<AnswerSession> | null;
    courseMode: CourseModeType;
    courseId: Id<Course>;
    modules: PlaylistModuleDTO[];
    currentPlaylistItemCode: string;
    nextPlaylistItemCode: string | null;
    nextPlaylistItemState: CourseItemStateType | null;
}