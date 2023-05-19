import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import UploadAvatar from "../../atoms/uploadAvatar";
import { Error, HandleResponse } from "../../commons/feedback";
import { handleLogout } from "../../../utils/commonFunctions";
import ConfirmationModal from "../../modals/confirmationModal";
import { setUser } from "../../../store/user";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../../store/apis/user.api";

import { DEFAULT_PROFILE_FORM_FIELDS } from "../../../utils/defaultVariables";

import "./index.css";
import { Box, TextField, Typography, Button, Avatar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const ProfileBasicInfo = ({ user, isMyProfile }) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(DEFAULT_PROFILE_FORM_FIELDS);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const [updateUser, updateUserRes] = useUpdateUserMutation();
  const [deleteUser, deleteUserRes] = useDeleteUserMutation();

  useEffect(() => {
    if (user) {
      setFormFields({
        avatar: user?.avatar || null,
        name: user?.name || "",
        email: user?.email || "",
        location: user?.location || "",
        phoneNumber: user?.phoneNumber || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (updateUserRes?.isSuccess) {
      dispatch(setUser(updateUserRes?.data));
      setFormFields({
        ...formFields,
        avatar: updateUserRes?.data?.avatar || null,
        name: updateUserRes?.data?.name || "",
        email: updateUserRes?.data?.email || "",
        location: updateUserRes?.data?.location || "",
        phoneNumber: updateUserRes?.data?.phoneNumber || "",
      });
      setIsEditing(false);
    }
  }, [updateUserRes?.isSuccess]);

  useEffect(() => {
    if (deleteUserRes?.isSuccess) handleLogout(dispatch);
  }, [deleteUserRes, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateUser(formFields);
  };

  const handleCancel = () => {
    setFormFields({
      avatar: user?.avatar || null,
      name: user?.name || "",
      email: user?.email || "",
      location: user?.location || "",
      phoneNumber: user?.phoneNumber || "",
    });
    setIsEditing(false);
  };

  return (
    <Box className="profileBasicInfo-container">
      <Box className="profileBasicInfo-header-container">
        <Typography variant="h3">
          {isEditing ? "Editing" : ""} Basic Info 📖
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt={formFields.name}
            src={formFields.avatar || "/"}
            sx={{ width: "3em", height: "3em" }}
          />
          {isEditing && (
            <UploadAvatar
              formFields={formFields}
              setFormFields={setFormFields}
            />
          )}
        </Box>
      </Box>
      {isMyProfile && (
        <>
          <Error
            show={updateUserRes?.isError}
            message={updateUserRes?.error?.data?.message}
          />
          <HandleResponse response={deleteUserRes} backdrop />
        </>
      )}
      <Box
        component="form"
        className="profileBasicInfo-form-container"
        noValidate
      >
        <TextField
          disabled={!isEditing}
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          required
          value={formFields.name}
          onChange={handleChange}
        />
        <TextField
          disabled={!isEditing}
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          required
          value={formFields.email}
          onChange={handleChange}
        />
        <TextField
          disabled={!isEditing}
          margin="dense"
          id="location"
          name="location"
          label="Location"
          type="text"
          fullWidth
          value={formFields.location}
          onChange={handleChange}
        />
        <TextField
          disabled={!isEditing}
          margin="dense"
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          fullWidth
          value={formFields.phoneNumber}
          onChange={handleChange}
        />
      </Box>
      {isMyProfile && (
        <Box className="profileBasicInfo-actionButtons">
          {isEditing ? (
            <>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={handleFormSubmit}
                loading={updateUserRes?.isLoading}
              >
                Save
              </LoadingButton>
              <Button onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
            </>
          ) : (
            <>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outlined">
                  Edit Profile
                </Button>
              )}
              <Button
                onClick={() => setOpenDeleteConfirmationModal(true)}
                variant="outlined"
                color="error"
              >
                Delete Profile
              </Button>
              <ConfirmationModal
                open={openDeleteConfirmationModal}
                handleClose={() => setOpenDeleteConfirmationModal(false)}
                handleSubmit={() => deleteUser()}
                message="Are you sure you want to delete your profile?"
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfileBasicInfo;
