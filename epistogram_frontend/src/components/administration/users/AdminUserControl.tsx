import { useState } from "react";
import { Route } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useUserListQuery } from "../../../services/api/userApiService";
import AdminAddUserSubpage from "./AdminAddUserSubpage";
import AdminEditUserSubpage from "./AdminEditUserSubpage";
import { AdminUserCourseContentSubpage } from "./AdminUserCourseContentSubpage";
import { AdminUserStatisticsSubpage } from "./AdminUserLearningOverviewSubpage";
import { AdminUserTeacherInfoSubpage } from "./AdminUserTeacherInfoSubpage";
import { AdminUserDataGridSubpage } from "./dataGrids/AdminUsersDataGridSubpage";

export const AdminUserControl = () => {
    const usersRoute = applicationRoutes.administrationRoute.usersRoute;

    const [searchText, setSearchText] = useState<string | null>(null);

    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(searchText);

    const handleSearch = (value: string) => {

        if (value === "")
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    };


    return <>

        {/* Route /administration/users */}
        <Route
            path={usersRoute.route}>

            <AdminUserDataGridSubpage users={users} />
        </Route>

        {/* Route /administration/users/add */}
        <Route path={usersRoute.addRoute.route}>

            <AdminAddUserSubpage
                users={users}
                refetchUsersFunction={refetchUsers} />
        </Route>

        {/* Route /administration/users/:userId/edit */}
        <Route
            path={usersRoute.editRoute.route}>

            <AdminEditUserSubpage
                users={users}
                refetchUsersFunction={refetchUsers} />
        </Route>

        {/* Route /administration/users/:userId/statistics */}
        <Route
            path={usersRoute.statsRoute.route}>

            <AdminUserStatisticsSubpage users={users} />
        </Route>

        {/* Route /administration/users/:userId/teacherinfo */}
        <Route
            path={usersRoute.teacherInfoRoute.route}>

            <AdminUserTeacherInfoSubpage users={users} />
        </Route>

        {/* Route /administration/users/:userId/courses */}
        <Route
            path={usersRoute.courseContentRoute.route}>

            <AdminUserCourseContentSubpage
                users={users}
                refetchUsersFunction={refetchUsers} />
        </Route>
    </>;
};