import { Player } from '@lottiefiles/react-lottie-player';
import { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { CurrentUserContext } from '../system/AuthenticationFrame';

export const Greetings = () => {

    const { navigate2 } = useNavigation();
    const { firstName } = useContext(CurrentUserContext);

    return <EpistoFlex2
        direction="row"
        alignItems="center">

        <EpistoFlex2
            direction="column"
            justifyContent="flex-start"
            height="100%">

            <EpistoFont
                fontSize2="small"
                style={{
                    padding: '20px 20px 10px 10px'
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsFirst + ' ' + firstName + ','}
            </EpistoFont>

            <EpistoFont
                fontSize2="small"
                style={{
                    padding: '20px 20px 10px 10px'
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsSecond}
            </EpistoFont>

            <EpistoFont
                fontSize2="small"
                style={{
                    padding: '20px 20px 10px 10px'
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsThird}
            </EpistoFont>

            <EpistoFlex2
                direction="column"
                width="100%"
                alignItems="center"
                mt="10px">

                <EpistoButton
                    variant={'colored'}
                    onClick={() => {
                        navigate2(applicationRoutes.availableCoursesRoute);
                    }}>

                    {translatableTexts.practiseQuestions.goToCourses}
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>

        <EpistoFlex2>
            <Player
                autoplay
                loop
                src={Environment.getAssetUrl('lottie_json/initial_greetings.json')}
                style={{ height: '300px', width: '300px' }}
            />
        </EpistoFlex2>
    </EpistoFlex2>;
};