import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import "react-loading-skeleton/dist/skeleton.css";

import { MessageProvider } from "./context/message/MessageContext";
import { SocketProvider } from "./context/socket/SocketContext";
import Spinner from "./components/Spinner";

const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const Home = lazy(() => import("./pages/Home/Home"));
const HouseListPage = lazy(() => import("./pages/HouseListPage/HouseListPage"));
const HousePage = lazy(() => import("./pages/HousePage/HousePage"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const ProtectedLayout = lazy(
  () => import("./pages/ProtectedLayout/ProtectedLayout"),
);
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ProfileUpdate = lazy(() => import("./pages/ProfileUpdate/ProfileUpdate"));
const NewPost = lazy(() => import("./pages/NewPost/NewPost"));
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/post/list",
        element: <HouseListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/post/:id",
        element: <HousePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/update",
        element: <ProfileUpdate />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/post/new",
        element: <NewPost />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <SocketProvider>
      <MessageProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <Spinner parentContainerClassName="absolute z-10 flex h-full w-full items-center justify-center backdrop-blur-[2px]" />
            }
          >
            <RouterProvider router={router} />
            <Toaster
              toastOptions={{
                success: {
                  duration: 2000,
                },
                error: {
                  duration: 3000,
                },
              }}
            />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MessageProvider>
    </SocketProvider>
  );
}

export default App;
