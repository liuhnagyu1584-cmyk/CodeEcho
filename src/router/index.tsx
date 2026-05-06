import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";
import Home from "@/pages/Home";
import NotFindPage from "../pages/NotFindPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  { path: "*", element: <NotFindPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
