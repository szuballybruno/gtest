import { FlexProps } from '@chakra-ui/react';
import { EpistoHeader } from '../EpistoHeader';
import { FlexFloat } from '../controls/FlexFloat';
import {ReactNode} from 'react';

export const DashboardSection = (props: FlexProps & {
    title: string,
    variant?: 'noShadow' | 'normal',
    showDivider?: boolean,
    headerContent?: ReactNode
}) => {

    const { title, children, variant, showDivider, headerContent, ...css } = props;

    return <FlexFloat
        className="roundBorders"
        background="transparent"
        direction="column"
        p="10px"
        boxShadow={variant === 'noShadow' ? 'none' : undefined}
        {...css}>

        <EpistoHeader
            text={title}
            showDivider={showDivider}
            variant="strongSub"
            m="5px 10px 0 10px">

            {headerContent}
        </EpistoHeader>

        {children}
    </FlexFloat>;
};
