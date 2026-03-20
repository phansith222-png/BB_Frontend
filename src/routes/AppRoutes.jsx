import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import UserLayout from "../layouts/UserLayout";
import useUserStore from "../stores/userStores";



const Home = lazy(() => import('../pages/Home'))
const Reading = lazy(() => import('../pages/Reading'))
const Profile = lazy(() => import('../pages/Profile'))
const Login = lazy(() => import('../pages/Login'))

const guestRouter = createBrowserRouter([
    {
        path: "/",
        Component: UserLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
])

const userRouter = createBrowserRouter([
    {
        path: "/",
        Component: UserLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/reading',
                Component: Reading
            },
            {
                path: '/profile',
                Component: Profile
            },
            {
                path: '*',
                element: <Navigate to="/" />
            },
        ]
    }
])

function AppRouter() {
    const user = useUserStore(state => state.user)
    const finalRouter = user ? userRouter : guestRouter
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-base-200/30">
                <div className="flex flex-col items-center gap-4 p-20 rounded-3xl bg-white">
                    <span className="loading loading-ring loading-xl text-primary scale-150"></span>
                    <span className="text-sm font-medium text-base-content italic">Please wait ...</span>
                </div>
            </div>
        }>
            <RouterProvider key={user?.id} router={finalRouter} />
        </Suspense>
    )
}
export default AppRouter