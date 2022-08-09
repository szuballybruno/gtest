import { FlexProps } from '@chakra-ui/layout';
import { EpistoFont } from '../controls/EpistoFont';
import { FlexFloat } from '../controls/FlexFloat';

export const FloatChip = (props: FlexProps & { name: string, icon: any }) => {

    const { name, icon, ...css } = props;

    return <FlexFloat
        className="tintChildSvg"
        height="30px"
        borderRadius="15px"
        margin="5px"
        {...css}>
        <svg width="40px"
            color={css.color as any ?? 'var(--epistoTeal)'}>
            {icon}
        </svg>
        <EpistoFont
            style={{
                fontSize: 'small',
                marginRight: '10px'
            }}>
            {name}
        </EpistoFont>
    </FlexFloat>;
};