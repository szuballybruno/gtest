import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { FlexFloat } from '../../controls/FlexFloat';

export const VerticalTile = (props: {
    title: string,
    subTitle: string,
    imageComponent: ReactNode,
    infoComponent: ReactNode,
    buttonsComponent: ReactNode

} & EpistoFlex2Props) => {

    const {
        title,
        subTitle,
        imageComponent,
        infoComponent,
        buttonsComponent,
        ...css
    } = props;

    return <FlexFloat
        className="whall roundBorders"
        direction="column"
        position="relative"
        overflow="hidden"
        //shadow="0 0 10px 1px #CCC"
        background="var(--transparentWhite50)"
        justifyContent="space-between"
        padding="5px"
        {...css}>

        {imageComponent}

        <EpistoFlex2
            padding="10px 10px 0 10px"
            direction={'column'}
            flex="1">

            <EpistoFlex2 direction="column"
                flex="5">

                {/* category  */}
                <EpistoFont
                    textColor='eduptiveMildDarkGreen'
                    style={{
                        fontSize: '13px'
                    }}>
                    {subTitle}
                </EpistoFont>

                {/* title */}
                <EpistoFlex2 direction="column">

                    <EpistoFont
                        textColor='eduptiveMildDarkGreen'
                        fontWeight={'heavy'}
                        fontSize="fontLarge">

                        {title}
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>

        <EpistoFlex2
            direction='column'
            padding='0 10px 10px 10px'>

            {infoComponent}
        </EpistoFlex2>

        {buttonsComponent}

    </FlexFloat>;
};