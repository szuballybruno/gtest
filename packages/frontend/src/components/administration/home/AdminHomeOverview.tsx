import { ArrowBack, ArrowForward, ArrowRight, FiberManualRecord } from '@mui/icons-material';
import { ReactNode } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useAdminHomeOverviewStatsData } from '../../../services/api/userStatsApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { Environment } from '../../../static/Environemnt';
import { usePaging } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoGrid } from '../../controls/EpistoGrid';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { FlexListItem } from '../../universal/FlexListItem';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
const AdminSectionWithButton = (props: {
    title: string,
    children?: ReactNode,
    headerContent?: ReactNode
} & EpistoFlex2Props) => {
    const { title, children, headerContent, ...css } = props;
    return <EpistoFlex2
        direction="column"
        className="roundBorders"
        background="var(--transparentWhite70)"
        p="20px"
        {...css}>

        <EpistoFlex2
            h="40px"
            w="100%"
            align="center"
            justify="space-between">

            <EpistoFont>
                {title}
            </EpistoFont>

            {headerContent}
        </EpistoFlex2>

        {children}
    </EpistoFlex2>;
};

export const AdminHomeOverview = () => {

    const { adminHomePageOverviewStats, adminHomePageOverviewStatsError, adminHomePageOverviewStatsStatus } = useAdminHomeOverviewStatsData();
    const courses = adminHomePageOverviewStats?.companyCourseStats ? adminHomePageOverviewStats.companyCourseStats : [];
    const activeCoursesPaging = usePaging({ items: courses });
    const currentCourse = adminHomePageOverviewStats?.companyCourseStats[activeCoursesPaging.currentIndex];

    const { navigateToHref } = useNavigation();

    return <AdminSubpageHeader
        isInverseBackground
        tabMenuItems={[
            applicationRoutes.administrationRoute.statsRoute.overviewRoute,
            applicationRoutes.administrationRoute.statsRoute.detailsRoute, {
                title: 'Felhasználók áttekintése',
                route: applicationRoutes.administrationRoute.usersRoute.route,
                navAction: () => {

                    navigateToHref(applicationRoutes.administrationRoute.usersRoute.route.getAbsolutePath() + '?preset=reviewRequired');
                }
            }
        ]}>
        <EpistoFlex2 flex="3"
            direction="column">

            <AdminSectionWithButton
                title="Top beérkező kérdések"
                mt="10px"
                headerContent={
                    <EpistoButton
                        variant="colored">
                        Összes hallgató
                    </EpistoButton>}>

                <EpistoGrid
                    auto="fill"
                    mt="20px"
                    h="130px"
                    minColumnWidth="50px"
                    gap="10px"
                    gridTemplateColumns="repeat(3, minmax(0, 1fr))">

                    <StatisticsCard
                        additionalFunction={() => { throw new Error('Not implemented!'); }}
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard1.png')}
                        title="Átlagon felül teljesítenek"
                        value={adminHomePageOverviewStats?.outstandingUsers}
                        suffix="-en" />

                    <StatisticsCard
                        additionalFunction={() => { throw new Error('Not implemented!'); }}
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard2.png')}
                        title="Átlagosan teljesítenek"
                        value={adminHomePageOverviewStats?.avgUsers}
                        suffix="-en" />

                    <StatisticsCard
                        additionalFunction={() => { throw new Error('Not implemented!'); }}
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard3.png')}
                        title="Áttekintés javasolt"
                        value={adminHomePageOverviewStats?.flaggedUsers}
                        suffix="esetben" />
                </EpistoGrid>

            </AdminSectionWithButton>

            <AdminSectionWithButton
                title="Top beérkező kérdések"
                mt="10px"
                headerContent={

                    <EpistoButton
                        variant="colored">
                        Összes kérdés
                    </EpistoButton>}>

                <FlexListItem
                    thumbnailContent={
                        <EpistoFlex2
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="red">

                            18
                        </EpistoFlex2>}
                    midContent={
                        <EpistoFlex2 direction="column">
                            <EpistoFont style={{
                                fontWeight: 'bold'
                            }}>
                                Microsoft Excel Alapok
                            </EpistoFont>
                            <EpistoFont>
                                Nincs esetleg valamilyen billentyűkombináció arra, hogy gyorsan lehessen oszlopokat elrejteni?
                            </EpistoFont>
                        </EpistoFlex2>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }>
                </FlexListItem>





                <FlexListItem
                    thumbnailContent={
                        <EpistoFlex2
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="var(--mildOrange)">

                            10
                        </EpistoFlex2>}
                    midContent={
                        <EpistoFlex2 direction="column">
                            <EpistoFont style={{
                                fontWeight: 'bold'
                            }}>
                                Microsoft PowerPoint Alapok
                            </EpistoFont>
                            <EpistoFont>
                                Miután diavetítő módba lépek, a képernyő elsötétül. Ez mitől lehet?
                            </EpistoFont>
                        </EpistoFlex2>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }>

                </FlexListItem>




                <FlexListItem
                    thumbnailContent={
                        <EpistoFlex2
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="yellow">

                            8
                        </EpistoFlex2>}
                    midContent={
                        <EpistoFlex2 direction="column">
                            <EpistoFont style={{
                                fontWeight: 'bold'
                            }}>
                                Microsoft Word Alapok
                            </EpistoFont>
                            <EpistoFont>
                                A formátummásolás címeknél egyszerűen nem akar működni, de csak ott. Mi lehet a probléma?
                            </EpistoFont>
                        </EpistoFlex2>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }></FlexListItem>

                <FlexListItem
                    thumbnailContent={
                        <EpistoFlex2
                            align="center"
                            justify="center"
                            className="square60 circle"
                            background="lightgreen">

                            3
                        </EpistoFlex2>}
                    midContent={
                        <EpistoFlex2 direction="column">
                            <EpistoFont style={{
                                fontWeight: 'bold'
                            }}>
                                OBS Alapok
                            </EpistoFont>
                            <EpistoFont>
                                MAC-et használok, és fekete kijelzőt látok csak, a hangot szépen felveszi, de kép nincs. Mit lehet ilyenkor csinálni?
                            </EpistoFont>
                        </EpistoFlex2>
                    }
                    endContent={
                        <EpistoButton>
                            Ugrás
                            <ArrowRight />
                        </EpistoButton>
                    }></FlexListItem>

            </AdminSectionWithButton>
        </EpistoFlex2>
        <EpistoFlex2 flex="2"
            h="fit-content">
            <AdminSectionWithButton
                m="10px 0 0 10px"
                flex="1"
                title="Kurzusok teljesítménye"
                headerContent={
                    <EpistoButton
                        variant="colored">
                        Összes kurzus
                    </EpistoButton>}>

                {/* active course thumbnail */}
                <EpistoFlex2
                    align="center"
                    h="200px"
                    padding="20px">

                    <EpistoFlex2 flex="1">
                        <img
                            src={Environment.getAssetUrl(currentCourse?.thumbnailUrl ? currentCourse.thumbnailUrl : '')}
                            alt=""
                            style={{
                                objectFit: 'contain'
                            }}
                            className="roundBorders" />
                    </EpistoFlex2>

                    <EpistoFlex2
                        flex="1"
                        direction="column"
                        p="20px">

                        <EpistoFont>
                            {currentCourse?.title}
                        </EpistoFont>

                        {/* navigation buttons */}
                        <EpistoFlex2
                            h="30px"
                            align="center"
                            justify="center">

                            <EpistoButton onClick={() => activeCoursesPaging.previous()}>

                                <ArrowBack />
                            </EpistoButton>

                            {activeCoursesPaging
                                .items
                                .map((x, index) => <FiberManualRecord
                                    key={index}
                                    style={{
                                        width: '10px',
                                        height: '8px',
                                        color: index === activeCoursesPaging.currentIndex ? 'black' : 'gray'
                                    }} />)}

                            <EpistoButton onClick={() => activeCoursesPaging.next()}>

                                <ArrowForward />
                            </EpistoButton>

                        </EpistoFlex2>
                    </EpistoFlex2>
                </EpistoFlex2>

                <EpistoGrid
                    auto="fill"
                    mt="20px"
                    minColumnWidth="50px"
                    gap="10px"
                    gridTemplateColumns="repeat(2, minmax(0, 1fr))">

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard4.png')}
                        title="Felhasználó jelenleg"
                        value={currentCourse?.activeUsersCount}
                        suffix="aktív" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard5.png')}
                        title="Végezte el a kurzust"
                        value={currentCourse?.completedUsersCount}
                        suffix="tanuló" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard6.png')}
                        title="Hagyta félbe a tanfolyamot"
                        value={currentCourse?.suspendedUsersCount}
                        suffix="tanuló" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard7.png')}
                        title="Átlagos teljesítmény"
                        value={currentCourse?.avgCoursePerformancePercentage
                            ? Math.round(currentCourse.avgCoursePerformancePercentage)
                            : null}
                        suffix="%" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard8.png')}
                        title="Nehéznek megjelölve"
                        value={currentCourse?.difficultVideosCount}
                        suffix="videó" />

                    <StatisticsCard
                        minWidth="180px"
                        p="10px 0"
                        iconPath={Environment.getAssetUrl('/images/teacherdashboard9.png')}
                        title="Vár válaszokra a tanártól"
                        value={currentCourse?.questionsWaitingToBeAnswered}
                        suffix="kérdés" />
                </EpistoGrid>
            </AdminSectionWithButton>
        </EpistoFlex2>
    </AdminSubpageHeader>;
};