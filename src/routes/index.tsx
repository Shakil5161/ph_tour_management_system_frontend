import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import { generateRoutes } from "@/generateRoutes";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types";
import { withAuth } from "@/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
    {
        // element: <App/>
        path: '/',
        Component: App,
        children: [
            {
                Component: withAuth(About),
                path: 'about'
            }
        ]
    },
    {
        path: '/admin',
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        children: [
            { index: true, element: <Navigate to="/admin/analytics" />},
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        path: '/user',
        Component: withAuth(DashboardLayout, role.user as TRole),
        children: [
            { index: true, element: <Navigate to="/user/bookings"/> },
            ...generateRoutes(userSidebarItems)
        ]
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/register',
        Component: Register
    },
    {
        path: '/verify',
        Component: Verify
    },
    {
        path: '/unauthorized',
        Component: Unauthorized
    },

])