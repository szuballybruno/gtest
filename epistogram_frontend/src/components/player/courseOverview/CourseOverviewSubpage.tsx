import { Flex } from '@chakra-ui/react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCourseOverviewData } from '../../../services/api/miscApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { isNullOrUndefined } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoGrid } from '../../controls/EpistoGrid';
import { ExamLayout } from '../../exam/ExamLayout';
import StatisticsCard from '../../statisticsCard/StatisticsCard';

export const CourseOverviewSubpage = () => {

    const { courseOverviewData } = useCourseOverviewData();

    const { navigate } = useNavigation();

    /**
    * Összesen ennyi videót néztél meg
    * Ennyi EpistoCoint szereztél közben
    * Ennyi idő alatt végezted el a kurzust
    * Összesen ennyi kérdésre válaszoltál
    * A kérdésekre adott válaszaid átlaga
    * A témazárók átlaga
    * A kurzuszáró vizsgád eredménye
    **/

    const courseStatsOverviewData = [
        {
            value: courseOverviewData?.completedVideoCount,
            title: 'Összesen ennyi videót néztél meg',
            suffix: 'db'
        },
        {
            value: courseOverviewData?.coinsAcquired,
            title: 'Ennyi EpistoCoint szereztél közben',
            suffix: 'db'
        },
        {
            value: Math.ceil((courseOverviewData?.totalSpentSeconds ?? 0) / 60),
            title: 'Ennyi idő alatt végezted el a kurzust',
            suffix: 'perc'
        },
        {
            value: courseOverviewData?.answeredVideoQuestionCount,
            title: 'Összesen ennyi kérdésre válaszoltál',
            suffix: 'db'
        },
        {
            value: courseOverviewData?.questionSuccessRate,
            title: 'A kérdésekre adott válaszaid átlaga',
            suffix: '%'
        },
        {
            value: courseOverviewData?.examSuccessRateAverage,
            title: 'A témazárók átlaga',
            suffix: '%'
        },
        {
            value: courseOverviewData?.finalExamSuccessRate,
            title: 'A kurzuszáró vizsgád eredménye',
            suffix: '%'
        }
    ];

    console.log(courseOverviewData);

    return (
        <ExamLayout
            headerCenterText={'A kurzus során elért eredményed'}
            footerButtons={[
                {
                    title: 'Vissza a tanfolyamkeresobe',
                    action: () => {
                        navigate(applicationRoutes.availableCoursesRoute);
                    },
                },
            ]}>

            <Flex
                flex='1'
                background='var(--transparentWhite70)'
                direction="column"
                justify='flex-start'
                className="whall roundBorders mildShadow"
                p="20px">

                <EpistoGrid
                    minColumnWidth={'250px'}
                    gap={'10'}
                    auto={'fill'}
                    w="100%">

                    {courseStatsOverviewData
                        .map((item, index) => {
                            return <StatisticsCard
                                key={index}
                                suffix={item.suffix}
                                title={item.title}
                                value={isNullOrUndefined(item.value) ? undefined : item.value + ''}
                                height={150}
                                p="10px 10px 10px 30px" />;
                        })}
                </EpistoGrid>
            </Flex>
        </ExamLayout>
    );
};