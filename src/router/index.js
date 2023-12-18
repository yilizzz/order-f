import BossLogin from "../page/bossLogin/bossLogin";
import MakeMenu from "../page/MakeMenu/MakeMenu";
import Home from "../page/Home/Home";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bosslogin",
    element: <BossLogin />,
  },
  {
    path: "/makemenu",
    element: <MakeMenu />,
  },
]);
export default router;
