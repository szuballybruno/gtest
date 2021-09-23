import React from "react";
import { NavLink } from "react-router-dom";
import { applicationRoutes } from "../../../../configuration/applicationRoutes";
import { getAssetUrl, useIsDesktopView } from "../../../../frontendHelpers";
import { RouteItemType } from "../../../../models/types";
import { useCurrentCourseItemCode } from "../../../../services/dataService";
import { FlexFloat } from "../../FlexFloat";
import classes from "./navbar.module.scss";
import DesktopNavbar from "./navbar_components/DesktopNavbar";

const menuItems = [
    applicationRoutes.homeRoute,
    applicationRoutes.availableCoursesRoute,
    applicationRoutes.learningRoute,
    applicationRoutes.administrationRoute
] as RouteItemType[];

const Navbar = (props: { hideLinks?: boolean }) => {

    const isDesktop = useIsDesktopView();
    const currentCourseItemCode = useCurrentCourseItemCode();

    // render desktop
    const renderDesktopNavbar = () => <DesktopNavbar
        currentCourseItemCode={currentCourseItemCode}
        hideLinks={!!props.hideLinks} />;

    // render mobile
    const renderMobileNavbar = () => {
        return <div className={classes.mobileNavbarOuterWrapperOut}>

            {/* navbar */}
            <div className={classes.mobileNavbarOuterWrapperIn}>
                <NavLink to={applicationRoutes.homeRoute.route}>
                    <div className={classes.mobileNavbarLogoWrapper}>
                        <img alt="EpistoGram Logo" src={getAssetUrl("/images/logo.png")} />
                    </div>
                </NavLink>
            </div>

            {/* dropdonw */}
            {/* <MobileDropdown menuItems={menuItems} showHighlightedButton={props.showHighlightedButton} /> */}
        </div>
    }

    return <FlexFloat id="flexFloat-navbarRoot" height={isDesktop ? "80px" : "60px"} zIndex={3} >
        {isDesktop
            ? renderDesktopNavbar()
            : renderMobileNavbar()}
    </FlexFloat>
}

export default Navbar;
