import ShopkeeperLogin from "../page/ShopkeeperLogin/ShopkeeperLogin";
import MakeMenu from "../page/MakeMenu/MakeMenu";
import Home from "../page/Home/Home";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shopkeeperlogin",
    element: <ShopkeeperLogin />,
  },
  {
    path: "/makemenu",
    element: <MakeMenu />,
  },
]);
export default router;
