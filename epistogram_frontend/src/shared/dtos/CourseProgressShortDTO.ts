import { Id } from '../types/versionId';

export class CourseProgressShortDTO {
    courseId: Id<'Course'>;
    totalCourseItemCount: number;
    completedCourseItemCount: number;
    progressPercentage: number;
    courseTitle: string;
}