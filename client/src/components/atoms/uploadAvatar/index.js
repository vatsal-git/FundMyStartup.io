import React from "react";
import imageCompression from "browser-image-compression";

import { IconButton } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const UploadAvatar = ({ setFormFields, formFields }) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 100,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          setFormFields({
            ...formFields,
            avatar: reader.result,
          });
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <input
        accept="image/*"
        id="profile-picture"
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <label htmlFor="profile-picture">
        <IconButton
          component="span"
          size="small"
          color="primaryLight"
          sx={{
            position: "absolute",
            bottom: "-1em",
            left: "-1em",
          }}
        >
          <PhotoCameraOutlinedIcon />
        </IconButton>
      </label>
      <IconButton
        onClick={() => setFormFields({ ...formFields, avatar: null })}
        size="small"
        color="error"
        sx={{
          position: "absolute",
          bottom: "-1em",
          right: "-1em",
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </>
  );
};

export default UploadAvatar;
