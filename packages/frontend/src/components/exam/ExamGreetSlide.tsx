import { ExamPlayerDataDTO } from '@episto/communication';
import { Responsivity } from '../../helpers/responsivity';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { ExamLayout } from './ExamLayout';
import { ExamResultStats } from './ExamResultStats';

export const ExamGreetSlide = (props: {
    exam: ExamPlayerDataDTO,
    handleBackToPlayer: () => void,
    startExam: () => void
}) => {

    const {
        exam,
        handleBackToPlayer,
        startExam
    } = props;

    const { isMobile } = Responsivity
        .useIsMobileView();

    const { isIPhone } = Responsivity
        .useIsIPhone();

    return <ExamLayout
        maxH={(() => {

            if (isIPhone) {
                return 'calc(100vh - 160px)';
            }

            if (isMobile) {
                return 'calc(100vh - 120px)';
            }
        })()}
        className={!isMobile ? 'whall' : undefined}
        justify='flex-start'
        headerCenterText={exam.title}
        footerButtons={new ArrayBuilder()
            .addIf(isMobile, {
                title: 'Vissza a videókhoz',
                action: handleBackToPlayer
            })
            .addIf(exam.canTakeAgain, {
                title: exam.examStats ? 'Újrakezdés' : translatableTexts.exam.startExam,
                action: startExam
            })
            .getArray()}>

        <EpistoFlex2
            direction="column"
            align="center"
            flex='1'
            justify={exam.examStats ? undefined : 'center'}
            //justify='center'
            width={'100%'}
            height={!isMobile ? '100%' : undefined}
            background='var(--transparentWhite70)'
            padding='20px'
            className="roundBorders mildShadow">

            <img
                src={Environment.getAssetUrl('/images/examCover.png')}
                alt={''}
                style={{
                    objectFit: 'contain',
                    maxHeight: 200,
                    margin: '30px 0'
                }} />

            <EpistoFont
                fontSize="font22">

                {exam.title}
            </EpistoFont>

            <EpistoFont
                style={{
                    padding: '30px',
                    maxWidth: '500px'
                }}>

                {exam.examStats
                    ? translatableTexts.exam.greetTextRetry
                    : translatableTexts.exam.greetText}
            </EpistoFont>

            {/* if previously completed  */}
            {exam.examStats && <EpistoFlex2
                direction='column'
                width='100%'
                height='100%'>

                {/* stats label */}
                <EpistoFont>

                    {translatableTexts.exam.statsLabelText}
                </EpistoFont>

                {/* stats */}
                <EpistoFlex2
                    mt="20px"
                    align="center"
                    justify="center"
                    width="100%">

                    <ExamResultStats
                        stats={exam.examStats} />
                </EpistoFlex2>
            </EpistoFlex2>}
        </EpistoFlex2>
    </ExamLayout>;
};
