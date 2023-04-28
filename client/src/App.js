import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetUserMutation } from "./store/apis/user.api";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "./store/user";
import { getCookie } from "./utils/commonFunctions";
import Navbar from "./components/atoms/Navbar";
import "./styles/commonStyles.css";
import "./styles/componentStyles.css";
import "./styles/muiCustomStyles.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Startups from "./pages/Startups";

const App = () => {
  const dispatch = useDispatch();
  const [getUserMutation] = useGetUserMutation();

  useEffect(() => {
    if (getCookie("token")) {
      getUserMutation().then((res) => {
        if (res.data?.user) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(removeUser());
        }
      });
    }
  }, [dispatch, getUserMutation]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/startups" element={<Startups />} />
      </Routes>
    </Router>
  );
};

export default App;
