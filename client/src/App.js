import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/atoms/navbar";
import Footer from "./components/atoms/footer";
import { useGetUserMutation } from "./store/apis/user.api";
import { setUser, userSelector } from "./store/user";
import { getCookie, handleLogout } from "./utils/commonFunctions";
import { routeList } from "./utils/routes";

import "./App.css";
import { Divider } from "@mui/material";
import { Error, HandleResponse } from "./components/commons/feedback";

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
      if (getUserMutationRes?.data) {
        dispatch(setUser(getUserMutationRes?.data));
      } else handleLogout(dispatch);
    } else if (getUserMutationRes?.isError) handleLogout(dispatch);
  }, [dispatch, getUserMutationRes]);

  const willRouteRender = (route) => {
    let willRouteRender = false;
    if (route.authReq) {
      if (isAuth) {
        if (!route.roleReq || route.roleReq === user?.role) {
          willRouteRender = true;
        }
      }
    } else {
      willRouteRender = true;
    }
    return willRouteRender;
  };

  return (
    <Router>
      <Navbar />
      <Divider />
      <HandleResponse response={getUserMutationRes} backdrop />
      <Routes>
        {routeList.map((route, i) => {
          return (
            <Route
              key={route.path}
              exact
              path={route.path}
              element={
                willRouteRender(route) ? (
                  route.element
                ) : (
                  <Error message="Error Rendering Route" p="4em" />
                )
              }
            />
          );
        })}
      </Routes>
      <Divider />
      <Footer />
    </Router>
  );
};

export default App;
