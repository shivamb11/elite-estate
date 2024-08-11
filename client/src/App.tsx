import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import "react-loading-skeleton/dist/skeleton.css";

import AppLayout from "./pages/AppLayout/AppLayout";
import Home from "./pages/Home/Home";
import HouseListPage from "./pages/HouseListPage/HouseListPage";
import HousePage from "./pages/HousePage/HousePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedLayout from "./pages/ProtectedLayout/ProtectedLayout";
import Profile from "./pages/Profile/Profile";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import NewPost from "./pages/NewPost/NewPost";
import Contact from "./pages/Contact/Contact";
import ErrorPage from "./pages/Error/ErrorPage";
import { MessageProvider } from "./context/message/MessageContext";
import { SocketProvider } from "./context/socket/SocketContext";

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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MessageProvider>
    </SocketProvider>
  );
}

export default App;
