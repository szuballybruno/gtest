import { Id } from '@episto/commontypes';
import { AvailableCourseDTO } from '@episto/communication';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { MobileHeader } from '../universal/MobileHeader';
import { MobileCourseTile } from './MobileCourseTile';

export const MobileAvailableCoursesPage = (props: {
    courses: AvailableCourseDTO[],
    handlePlayCourse: (course: AvailableCourseDTO) => void,
    navigateToDetailsPage: (course: AvailableCourseDTO) => void
}) => {

    const { courses, handlePlayCourse, navigateToDetailsPage } = props;

    return <>

        <ContentPane>

            <MobileHeader title={'Kereső'} />

            {courses
                .map(course => {

                    return <MobileCourseTile
                        key={Id.read(course.courseId)}
                        course={course}
                        handlePlayCourse={handlePlayCourse}
                        navigateToDetailsPage={navigateToDetailsPage} />;
                })}
        </ContentPane>
    </>;
};