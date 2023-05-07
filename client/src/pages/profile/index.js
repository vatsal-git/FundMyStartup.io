import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetUserByIdMutation } from "../../store/apis/user.api";
import { userSelector } from "./../../store/user";

import "./index.css";
import { Box } from "@mui/material";
import { Error, HandleResponse } from "../../components/commons/feedback";

const Profile = () => {
  const { userId } = useParams();
  const { user: loggedInUser } = useSelector(userSelector);

  const [user, setUser] = useState(null);

  const [getUserById, getUserByIdRes] = useGetUserByIdMutation();

  console.log({ getUserByIdRes });

  useEffect(() => {
    if (userId) getUserById(userId);
    else if (loggedInUser) setUser(loggedInUser);
    else setUser(null);
  }, [getUserById, loggedInUser, userId]);

  useEffect(() => {
    if (getUserByIdRes?.isSuccess) setUser(getUserByIdRes?.data?.user);
    else if (getUserByIdRes?.isError) setUser(null);
  }, [getUserByIdRes]);

  return (
    <>
      <HandleResponse response={getUserByIdRes} />
      <Error
        show={!loggedInUser && !userId}
        message="You cannot access this page. Please select valid profile to view."
      />
      <Box className="profile-container">
        profile of {user?.name}
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </>
  );
};

export default Profile;
