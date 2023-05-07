import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useCreateStartupMutation,
  useDeleteStartupMutation,
  useGetAllStartupsCreatedByMutation,
  useGetAllStartupsMutation,
  useUpdateStartupMutation,
} from "../../store/apis/startup.api";
import StartupCard from "../../components/molecules/startupCard";
import CreateEditStartupModal from "../../components/modals/createEditStartupModal";
import ConfirmationModal from "../../components/modals/confirmationModal";
import { Loader, Error, NoData } from "../../components/commons/feedback";

import "./index.css";
import { Box, Grid, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Startups = () => {
  const { userId } = useParams();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [startupToDelete, setStartupToDelete] = useState(null);
  const [startupToEdit, setStartupToEdit] = useState(null);

  const [getAllStartups, startupsRes] = useGetAllStartupsMutation();
  const [getAllStartupsCreatedBy, startupsCreatedByRes] =
    useGetAllStartupsCreatedByMutation();
  const [createStartup, createStartupRes] = useCreateStartupMutation();
  const [updateStartup, updateStartupRes] = useUpdateStartupMutation();
  const [deleteStartup, deleteStartupRes] = useDeleteStartupMutation();

  useEffect(() => {
    userId ? getAllStartupsCreatedBy(userId) : getAllStartups();
  }, [getAllStartups, getAllStartupsCreatedBy, userId]);

  useEffect(() => {
    if (createStartupRes.isSuccess) {
      // getAllStartupsCreatedBy(userId);
      setOpenCreateModal(false);
    }
  }, [createStartupRes.isSuccess, getAllStartupsCreatedBy, userId]);

  useEffect(() => {
    if (updateStartupRes.isSuccess) {
      getAllStartupsCreatedBy(userId);
      setStartupToEdit(null);
    }
  }, [getAllStartupsCreatedBy, updateStartupRes.isSuccess, userId]);

  useEffect(() => {
    if (deleteStartupRes.isSuccess) {
      getAllStartupsCreatedBy(userId);
      setStartupToEdit(null);
    }
  }, [deleteStartupRes.isSuccess, getAllStartupsCreatedBy, userId]);

  const handleCreateSubmit = (e, startup) => {
    e.preventDefault();
    const newStartup = {
      ...startup,
      createdBy: userId,
    };
    createStartup(newStartup);
  };

  const handleEditSubmit = (e, startup, prevData) => {
    e.preventDefault();
    const updatedData = { updatedBy: userId };
    Object.keys(startup).forEach((key) => {
      if (startup[key] !== prevData[key]) {
        updatedData[key] = startup[key];
      }
    });
    updateStartup({ id: startup._id, payload: updatedData });
  };

  const handleCreateOpen = () => setOpenCreateModal(true);
  const handleEdit = (startup) => setStartupToEdit(startup);
  const handleDelete = (startup) => setStartupToDelete(startup);

  return (
    <Box className="startups-container">
      <Box className="startups-titleBar">
        <Typography variant="h3">
          {userId ? "My Startups 🔮" : "Startups 🏗️"}
        </Typography>
        {userId && (
          <>
            <Button
              startIcon={<AddIcon />}
              onClick={handleCreateOpen}
              variant="contained"
            >
              Create
            </Button>
            <CreateEditStartupModal
              open={openCreateModal}
              handleClose={() => setOpenCreateModal(false)}
              handleSubmit={handleCreateSubmit}
              isLoading={createStartupRes.isLoading}
              error={createStartupRes.error}
            />
          </>
        )}
      </Box>
      <Loader
        show={userId ? startupsCreatedByRes?.isLoading : startupsRes?.isLoading}
        padding="4em"
      />
      <Error
        show={userId ? startupsCreatedByRes?.isError : startupsRes?.isError}
        message={
          userId
            ? startupsCreatedByRes?.error?.data?.message
            : startupsRes?.error?.data?.message
        }
        marginBottom="1em"
      />
      <NoData
        show={
          userId
            ? !startupsCreatedByRes?.data?.startups?.length
            : !startupsRes?.data?.startups?.length
        }
        message="No startups found."
        padding="4em"
      />
      {(startupsRes?.data?.startups ||
        startupsCreatedByRes?.data?.startups) && (
        <Grid container spacing={3}>
          {userId
            ? startupsCreatedByRes?.data?.startups.map((startup) => (
                <React.Fragment key={startup._id}>
                  <StartupCard
                    startup={startup}
                    modifyActions={{ handleEdit, handleDelete }}
                  />
                  {startupToEdit?._id === startup?._id && (
                    <CreateEditStartupModal
                      open={true}
                      handleClose={() => setStartupToEdit(null)}
                      handleSubmit={handleEditSubmit}
                      defaultValues={startup}
                      isLoading={updateStartupRes.isLoading}
                      error={updateStartupRes.error}
                    />
                  )}
                  {startupToDelete?._id === startup?._id && (
                    <ConfirmationModal
                      open={true}
                      handleClose={() => setStartupToDelete(null)}
                      handleSubmit={() => {
                        deleteStartup(startupToDelete?._id);
                        getAllStartupsCreatedBy(userId);
                        setStartupToDelete(null);
                      }}
                      message={`Are you sure you want to delete ${startupToDelete?.name}?`}
                    />
                  )}
                </React.Fragment>
              ))
            : startupsRes?.data?.startups.map((startup) => (
                <StartupCard key={startup._id} startup={startup} />
              ))}
        </Grid>
      )}
    </Box>
  );
};

export default Startups;
