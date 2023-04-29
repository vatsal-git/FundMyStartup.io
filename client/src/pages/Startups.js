import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useGetAllStartupsMutation } from "../store/apis/startup.api";
import StartupCard from "../components/molecules/StartupCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateStartupModal from "../components/modals/CreateStartup.modal";
import { useSelector } from "react-redux";
import { userSelector } from "./../store/user";

const StartupPage = () => {
  const { user } = useSelector(userSelector);
  const [openCreateStartupModal, setOpenCreateStartupModal] = useState(false);

  const [getAllStartups, { data, isLoading, isError, error }] =
    useGetAllStartupsMutation();

  useEffect(() => {
    getAllStartups();
  }, []);

  console.log({ data });

  const handleOpenCreateStartupModal = () => {
    setOpenCreateStartupModal(true);
  };
  const handleCloseCreateStartupModal = ({ fetchNewData }) => {
    setOpenCreateStartupModal(false);
    if (fetchNewData) getAllStartups();
  };

  return (
    <div style={{ padding: "0 1.5em" }}>
      <div
        style={{
          margin: "2em 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Startups</Typography>
        {user?.role === "entrepreneur" && (
          <>
            <Button
              className="secondaryBtn"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateStartupModal}
            >
              Create
            </Button>
            <CreateStartupModal
              open={openCreateStartupModal}
              handleClose={handleCloseCreateStartupModal}
            />
          </>
        )}
      </div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4em",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {isError && <Typography color="error">{error.data.message}</Typography>}
      {!isLoading && !isError && (!data || !data.startups.length) && (
        <Typography color="textSecondary">
          No startups found. Be the first one to create a startup!
        </Typography>
      )}
      {!isLoading && !isError && data && !!data.startups.length && (
        <Grid container spacing={3}>
          {data.startups.map((startup) => (
            <Grid item xs={12} sm={6} md={4} key={startup._id}>
              <StartupCard startup={startup} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default StartupPage;
