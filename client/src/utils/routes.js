import Home from "../pages/home";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Startups from "../pages/startups";
import Messages from "../pages/messages";
import Profile from "../pages/profile";

export const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/startups",
    element: <Startups key="all-startups" />,
  },
  {
    path: "/startups/:userId",
    element: <Startups key="my-startups" />,
    authReq: true,
    roleReq: "ENTREPRENEUR",
  },
  {
    path: "/messages",
    element: <Messages />,
    authReq: true,
  },
  {
    path: "/messages/:chatWith",
    element: <Messages />,
    authReq: true,
  },
  {
    path: "/profile",
    element: <Profile key="loggedInUser" />,
    authReq: true,
  },
  {
    path: "/profile/:userId",
    element: <Profile key="all" />,
  },
];
