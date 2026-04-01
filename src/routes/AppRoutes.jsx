import { lazy, Suspense, } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import UserLayout from "../layouts/UserLayout";
import useUserStore from "../stores/userStores";



const Home = lazy(() => import('../pages/Home'))
const Reading = lazy(() => import('../pages/Reading'))
const Profile = lazy(() => import('../pages/Profile'))
const Login = lazy(() => import('../pages/Login'))
const Library = lazy(() => import('../pages/Library'))
const ReadingSession = lazy(() => import('../pages/ReadingSession'));
const DetailCard = lazy(()=> import('../pages/DetailCard'))

const commonChildren = [
    {
        index: true,
        Component: Home
    }
]

const guestRouter = createBrowserRouter([
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/",
        Component: UserLayout,
        children: [
            ...commonChildren,
            {
                path: "*",
                element: <Navigate to="/login" replace />
            },
        ]
    }
])

const userRouter = createBrowserRouter([
    {
        path: "/",
        Component: UserLayout,
        children: [
            ...commonChildren,
            {
                path: '/reading',
                Component: Reading
            },
            {
                path: '/reading/session',
                Component: ReadingSession
            }
            ,
            {
                path: '/profile',
                Component: Profile
            },
            {
                path: '/library',
                Component: Library
            },
            {
                path: '/library/:id',
                Component: DetailCard
            },
            {
                path: '*',
                element: <Navigate to="/" replace/>
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