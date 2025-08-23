import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

import { AppLayout } from "@/components/layout/app-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Loading } from "@/components/loading";

import { GuestRoute, ProtectedRoute } from "@/routes/protected-route";

const NotFoundPage = lazy(() => import("@/pages/404"));
const UnauthorizedPage = lazy(() => import("@/pages/401"));
const HomePage = lazy(() => import("@/pages/home"));
const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const ProfilePage = lazy(() => import("@/pages/profile-page"));

export const appRouter = createBrowserRouter([
  {
    element: <Suspense fallback={<Loading />}>{<AppLayout />}</Suspense>,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            path: "/",
            Component: HomePage,
          },
        ],
      },
      {
        element: <GuestRoute />,
        children: [
          {
            Component: AuthLayout,
            children: [
              {
                path: "/login",
                Component: LoginPage,
              },
              {
                path: "/register",
                Component: RegisterPage,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            Component: DashboardLayout,
            children: [
              {
                path: "/dashboard",
                Component: DashboardPage,
              },
              {
                path: "/profile",
                Component: ProfilePage,
              },
            ],
          },
        ],
      },
      {
        path: "/not-authorized",
        Component: UnauthorizedPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
