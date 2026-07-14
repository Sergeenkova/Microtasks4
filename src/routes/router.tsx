import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
} from "react-router-dom";
import { App } from "../App";
import { Abibas } from "../components/pages/Abibas";
import { Adidas } from "../components/pages/Adidas";
import { Error404 } from "../components/pages/Error404";
import { Login } from "../components/pages/Login";
import { Model } from "../components/pages/Model";
import { Prices } from "../components/pages/Prices";
import { ProtectedPage } from "../components/pages/ProtectedPage";
import { Puma } from "../components/pages/Puma";

const PATH = {
  ADIDAS: "adidas",
  PUMA: "puma",
  ABIBAS: "abibas",
  PRICE: "prices",
  MODEL: "/:model/:id",
  PROTECTEDPAGE: "protected",
  ERROR: "/error",
  LOGIN: "/login",
  MAIN: "",
} as const;

export const publicRoutes: RouteObject[] = [
  {
    path: PATH.ADIDAS,
    element: <Adidas />,
  },
  {
    path: PATH.PUMA,
    element: <Puma />,
  },
  {
    path: PATH.ABIBAS,
    element: <Abibas />,
  },
  {
    path: PATH.PRICE,
    element: <Prices />,
  },
  {
    path: PATH.MODEL,
    element: <Model />,
  },
  {
    path: PATH.ERROR,
    element: <Error404 />,
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: PATH.MAIN,
    element: <Adidas />,
  },
];

export const privateRotes: RouteObject[] = [
  {
    path: PATH.PROTECTEDPAGE,
    element: <ProtectedPage />,
  },
];

export const PrivateRoutes = () => {
  const isAuth = false;
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to={PATH.ERROR} />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRotes,
      },
      ...publicRoutes,
    ],
  },
]);
