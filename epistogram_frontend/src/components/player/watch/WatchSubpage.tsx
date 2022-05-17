import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { usePlayerData } from '../../../services/api/playerApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { setPageTitle, useIsDesktopView } from '../../../static/frontendHelpers';
import { useStringParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFont } from '../../controls/EpistoFont';
import { FlexFloat } from '../../controls/FlexFloat';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { LoadingFrame } from '../../system/LoadingFrame';
import { Copyright } from '../../universal/Copyright';
import { CourseItemSelector } from './CourseItemSelector';
import { ExamPlayer } from './ExamPlayer';
import { ModuleView } from './ModuleView';
import { WatchView } from './WatchView';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';

export const WatchSubpage = () => {

    const warningDialogLogic = useEpistoDialogLogic('warn3');
    const { navigateToPlayer } = useNavigation();
    const descriptorCode = useStringParam('descriptorCode')!;
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    // get player page data
    const {
        playerData,
        playerDataStatus,
        playerDataError,
        refetchPlayerData
    } = usePlayerData(descriptorCode);

    // calc
    const isDeleted = playerDataError?.code === 'deleted';
    const video = playerData?.video;
    const exam = playerData?.exam;
    const module = playerData?.module;
    const answerSessionId = playerData?.answerSessionId;
    const courseMode = playerData?.mode ?? 'beginner';
    const courseId = playerData?.courseId;
    const courseModules = playerData?.modules ?? [];
    const nextItemCode = playerData?.nextItemCode;
    const title = video?.title || exam?.title || module?.name;
    const currentItemCode = playerData?.courseItemCode ?? '';
    const nextItemState = playerData?.nextItemState ?? null;
    const isPlayerLoaded = playerDataStatus === 'success';

    // redirect if current item should be locked 
    useEffect(() => {

        if (!playerData?.courseItemCode)
            return;

        if (playerData.courseItemCode === descriptorCode)
            return;

        console.log('Invalid course item code: ' + descriptorCode);
        navigateToPlayer(playerData.courseItemCode);
    }, [playerData?.courseItemCode]);

    useEffect(() => {

        if (title)
            setPageTitle(title);
    }, [title]);

    const navigateToCourseItem = (descriptorCode: string) => {

        warningDialogLogic
            .openDialog({
                title: translatableTexts.player.doYouReallyStopExam,
                description: translatableTexts.player.stopExamWarning,
                buttons: [
                    {
                        title: translatableTexts.player.yes,
                        action: () => navigateToPlayer(descriptorCode)
                    }
                ],
            });
    };

    const isDesktopView = useIsDesktopView();

    const handleContinueCourse = () => {

        console.log('Continue course, next item code: ' + nextItemCode);

        if (nextItemCode)
            navigateToPlayer(nextItemCode);
    };

    return (
        isDeleted
            ? <>
                <Flex
                    className='whall'
                    align='center'
                    justify='center'>

                    <Flex
                        background='white'
                        padding='100px'
                        borderRadius='15px'>

                        <EpistoFont>
                            Course has been deleted!
                        </EpistoFont>
                    </Flex>
                </Flex>
            </>
            : <>
                <EpistoDialog logic={warningDialogLogic} />

                <LoadingFrame
                    loadingState={[]}
                    height='100vh'
                    direction="column"
                    error={[playerDataError]}>

                    <Flex
                        px="20px"
                        height='100vh'
                        mb="50px">

                        {/* main column */}
                        <Box
                            id="mainColumn"
                            overflowY='scroll'
                            className="whall" >

                            {video && <WatchView
                                isPlayerLoaded={isPlayerLoaded}
                                currentItemCode={currentItemCode}
                                nextItemState={nextItemState}
                                courseId={courseId!}
                                courseMode={courseMode}
                                refetchPlayerData={refetchPlayerData}
                                answerSessionId={answerSessionId!}
                                video={video}
                                modules={courseModules}
                                continueCourse={handleContinueCourse}
                                navigateToCourseItem={navigateToCourseItem} />}

                            {exam && <ExamPlayer
                                continueCourse={handleContinueCourse}
                                answerSessionId={answerSessionId!}
                                setIsExamInProgress={isExamStarted => setIsSidebarHidden(isExamStarted)}
                                courseId={courseId!}
                                exam={exam} />}

                            <ModuleView module={module}
                                startModule={handleContinueCourse} />
                        </Box>

                        {/* right sidebar */}
                        <FlexFloat
                            id="courseItemListSidebar"
                            justify="flex-start"
                            zIndex="10"
                            ml="10px"
                            bg="var(--transparentWhite70)"
                            maxWidth={isSidebarHidden ? '0px' : '420px'}
                            opacity={isSidebarHidden ? 0 : 1}
                            transition="0.5s">

                            {isDesktopView && <Flex
                                direction="column"
                                id="courseItemSelectorRoot"
                                overflowY='scroll'
                                pb="200px"
                                width="420px"
                                minWidth="420px">

                                <CourseItemSelector
                                    currentItemCode={currentItemCode}
                                    nextItemState={nextItemState}
                                    courseId={courseId!}
                                    mode={courseMode}
                                    modules={courseModules}
                                    isPlayerLoaded={isPlayerLoaded}
                                    refetchPlayerData={refetchPlayerData} />
                            </Flex>}
                        </FlexFloat>
                    </Flex>

                    <Copyright />

                </LoadingFrame>
            </>
    );
};