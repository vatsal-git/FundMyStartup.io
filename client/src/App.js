import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Startups from "./pages/startups";
import Messages from "./pages/messages";
import Profile from "./pages/profile";
import Navbar from "./components/atoms/navbar";
import Footer from "./components/atoms/footer";
import { getCookie } from "./utils/commonFunctions";
import { useGetUserMutation } from "./store/apis/user.api";
import { removeUser, setUser, userSelector } from "./store/user";

import "./common.css";
import { Divider } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const isAuth = !!getCookie("token");

  const [getUserMutation, getUserMutationRes] = useGetUserMutation();

  useEffect(() => {
    if (isAuth) getUserMutation();
  }, [getUserMutation, isAuth]);

  useEffect(() => {
    if (getUserMutationRes?.isSuccess) {
      getUserMutationRes?.data?.user
        ? dispatch(setUser(getUserMutationRes.data.user))
        : dispatch(removeUser());
    }
  }, [dispatch, getUserMutationRes]);

  return (
    <Router>
      <Navbar />
      <Divider />
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/startups" element={<Startups key="all" />} />
        {isAuth && (
          <>
            {user?.role === "entrepreneur" && (
              <Route
                exact
                path="/startups/:userId"
                element={<Startups key="mine" />}
              />
            )}
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/messages/:chatWith" element={<Messages />} />
            <Route
              exact
              path="/profile"
              element={<Profile key="loggedInUser" />}
            />
            <Route
              exact
              path="/profile/:userId"
              element={<Profile key="all" />}
            />
          </>
        )}
      </Routes>
      <Divider />
      <Footer />
    </Router>
  );
};

export default App;
