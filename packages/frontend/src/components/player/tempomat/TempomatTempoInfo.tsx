import { InfoOutlined } from '@mui/icons-material';
import { TempomatModeType } from '@episto/commontypes';
import { Environment } from '../../../static/Environemnt';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { TempomatModeImage } from './TempomatModeImage';

export const TempomatTempoInfo = (props: {
    onClick: () => void,
    tempomatMode: TempomatModeType
}) => {

    const { onClick, tempomatMode } = props;

    const tempomatLabel = (() => {

        if (tempomatMode === 'light')
            return 'Megengedő';

        return 'Szigorú';
    })();

    return (
        <EpistoFlex2 direction="column">

            {/* Current speed title and info */}
            <EpistoFlex2
                align="center">

                <EpistoFont fontSize="fontSmall">

                    A tanfolyam tempója
                </EpistoFont>

                <InfoOutlined
                    onClick={onClick}
                    style={{
                        height: '15px'
                    }} />
            </EpistoFlex2>

            {/* Current speed and settings button */}
            <EpistoButton
                onClick={onClick}>

                <EpistoFlex2
                    align="center"
                    flex="1">

                    <TempomatModeImage
                        isSmall
                        mode={tempomatMode}
                        customizeFn={builder => builder
                            .custom('square25')} />

                    <EpistoFont
                        fontSize="fontSmall"
                        style={{
                            margin: '0 5px',
                            fontWeight: 600
                        }}>

                        {tempomatLabel}
                    </EpistoFont>

                    <img
                        src={Environment.getAssetUrl('/images/tempomatsettings.png')}
                        alt=""
                        style={{
                            height: '20px',
                            width: '20px',
                            marginRight: 5
                        }} />
                </EpistoFlex2>
            </EpistoButton>
        </EpistoFlex2>
    );
};
