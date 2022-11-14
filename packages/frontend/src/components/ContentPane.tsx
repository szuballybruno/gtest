import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EpistoFlex2Props } from './controls/EpistoFlex';
import { LeftSidebarElementRefContext } from './PageRootContainer';

type ContentPanePropsType = {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    isNavbarLowHeight?: boolean,
    noMaxWidth?: boolean,
    showLogo?: boolean,
    isMinimalMode?: boolean,
    noOverflow?: boolean
} & EpistoFlex2Props;

export const ContentPane = (props: ContentPanePropsType) => {

    const context = useContext(LeftSidebarElementRefContext);

    useEffect(() => {

        if (!context)
            return;

        context
            .setContentPaneProps(props);
    }, [context, props]);

    if (!context?.contentElementRef?.current)
        return <></>;

    return createPortal(props.children, context.contentElementRef.current);
};
