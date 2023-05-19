import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileBasicInfo from "../../components/molecules/profileBasicInfo";
import ProfileMyRevenue from "../../components/molecules/profileMyRevenue";
import ProfileMyInvestments from "../../components/molecules/profileMyInvestments";
import { HandleResponse } from "../../components/commons/feedback";
import { useGetUserByIdMutation } from "../../store/apis/user.api";
import { userSelector } from "./../../store/user";

import "./index.css";
import { Box, Divider, Typography } from "@mui/material";
import theme from "../../utils/theme";

const Profile = () => {
  const { userId } = useParams();
  const { user: loggedInUser } = useSelector(userSelector);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);

  const activeProfileTabSx = {
    color: theme.palette.primary.main,
  };

  const [getUserById, getUserByIdRes] = useGetUserByIdMutation();

  useEffect(() => {
    if (userId) getUserById(userId);
    else if (loggedInUser) setUser(loggedInUser);
    else setUser(null);
  }, [getUserById, loggedInUser, userId]);

  useEffect(() => {
    if (getUserByIdRes?.isSuccess) setUser(getUserByIdRes?.data);
    else if (getUserByIdRes?.isError) setUser(null);
  }, [getUserByIdRes]);

  return (
    <Box className="profile-container">
      <HandleResponse response={getUserByIdRes} />
      {user && (
        <>
          {/* {user?._id === loggedInUser?._id && (
            <>
              <Box className="profile-tabs-header-container">
                <Box
                  className="profile-tab"
                  onClick={() => setTab(0)}
                  sx={tab === 0 ? activeProfileTabSx : {}}
                >
                  <Typography variant="body1">Basic Info</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                  className="profile-tab"
                  onClick={() => setTab(1)}
                  sx={tab === 1 ? activeProfileTabSx : {}}
                >
                  {user?.role === "ENTREPRENEUR" && "My Revenue"}
                  {user?.role === "INVESTOR" && "My Investments"}
                </Box>
              </Box>
              <Divider />
            </>
          )} */}
          <Box className="profile-tabs-body-container">
            {tab === 0 && (
              <ProfileBasicInfo
                user={user}
                isMyProfile={user?._id === loggedInUser?._id}
              />
            )}
            {/* {user?._id === loggedInUser?._id && tab === 1 && (
              <>
                {user?.role === "ENTREPRENEUR" && (
                  <ProfileMyRevenue user={user} />
                )}
                {user?.role === "INVESTOR" && (
                  <ProfileMyInvestments user={user} />
                )}
              </>
            )} */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
