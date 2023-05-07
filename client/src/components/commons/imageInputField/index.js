import React, { useState } from "react";

import { Box, Button, Grid, IconButton, Paper } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";
import { Loader } from "../feedback";
import ImageBox from "../imageBox";

const PreviewImage = ({ imageSrc, handleRemoveImage }) => (
  <Grid item>
    <ImageBox src={imageSrc} height="10em" width="10em">
      <IconButton
        size="small"
        onClick={handleRemoveImage}
        sx={{
          position: "absolute",
          top: "0.5em",
          right: "0.5em",
          backgroundColor: "white",
          opacity: 0.7,
        }}
      >
        <ClearIcon />
      </IconButton>
    </ImageBox>
  </Grid>
);

const ImageInputField = ({
  required,
  id,
  label,
  onChange,
  multiple = false,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (event) => {
    setUploading(true);
    if (multiple) {
      const files = event.target.files;
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        promises.push(readFileAsDataURL(file));
      }
      const results = await Promise.all(promises);
      if (imagePreview) setImagePreview([...imagePreview, ...results]);
      else setImagePreview([...results]);
      let urlFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        urlFiles.push(URL.createObjectURL(file));
      }
      onChange(urlFiles);
    } else {
      const file = event.target.files[0];
      const result = await readFileAsDataURL(file);
      setImagePreview(result);
      const urlFile = URL.createObjectURL(file);
      onChange(urlFile);
    }
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    if (multiple) {
      const newImagePreview = [...imagePreview];
      newImagePreview.splice(index, 1);
      setImagePreview(newImagePreview);
    } else {
      setImagePreview(null);
      onChange(null);
    }
  };

  return (
    <Box my={2}>
      <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
        <input
          required={required}
          accept="image/*"
          id={id}
          name={id}
          type="file"
          multiple={multiple}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor={id}>
          <Button
            variant="outlined"
            component="span"
            startIcon={<PhotoCameraIcon />}
            endIcon={<Loader show={uploading} size={20} />}
            sx={{ width: "100%" }}
          >
            {label}
          </Button>
        </label>
        <Grid container mt={1} spacing={2}>
          {imagePreview &&
            (multiple ? (
              imagePreview.length !== 0 &&
              imagePreview?.map((imageSrc, index) => (
                <PreviewImage
                  key={index}
                  imageSrc={imageSrc}
                  handleRemoveImage={() => handleRemoveImage(index)}
                />
              ))
            ) : (
              <PreviewImage
                imageSrc={imagePreview}
                handleRemoveImage={() => handleRemoveImage(0)}
              />
            ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ImageInputField;
