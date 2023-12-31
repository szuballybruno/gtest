import { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { CurrentUserContext } from '../system/AuthenticationFrame';
export const NoQuestionsAvailable = () => {

    const { navigate2 } = useNavigation();
    const user = useContext(CurrentUserContext);
    const { isMobile } = Responsivity
        .useIsMobileView();

    return <EpistoFlex2
        flex='1'
        align='center'
        minWidth={isMobile ? undefined : '400px'}>

        <EpistoFlex2
            flex={1}
            align={isMobile ? 'flex-start' : undefined}
            justify={isMobile ? 'space-between' : undefined}
            padding='10px 20px 10px 10px'
            direction={'column'}>

            <EpistoFont
                style={{
                    fontSize: '13px',
                    paddingRight: '20px'
                }}>
                {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosOne + ' ' + user.firstName},
            </EpistoFont>

            <>
                <EpistoFont
                    style={{
                        fontSize: '13px',
                        marginTop: '10px',
                        display: 'inline-block'
                    }}>

                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosTwo}<br />
                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosFour}
                </EpistoFont>

                <EpistoFont
                    style={{
                        fontSize: '13px',
                        marginTop: '10px',
                        display: 'inline-block'
                    }}>

                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosThree}
                </EpistoFont>

                <EpistoButton
                    variant='light'
                    onClick={() => navigate2(applicationRoutes.availableCoursesRoute)}
                    style={{
                        margin: '20px 0 0 0',
                        maxWidth: '300px'
                    }}>

                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosButton}
                </EpistoButton>
            </>
        </EpistoFlex2>

        {!isMobile && <EpistoFlex2
            flex='1'
            maxWidth='250px'
            height='100%'
            align='center'>

            <img
                src={Environment.getAssetUrl('/images/welcome3D.png')}
                alt=""
                style={{
                    objectFit: 'contain',
                }} />
        </EpistoFlex2>}
    </EpistoFlex2>;
};
