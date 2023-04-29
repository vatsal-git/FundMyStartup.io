import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";

const ImageInputField = ({
  required,
  id,
  label,
  onChange,
  multiple = false,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false); //TODO: add loading state

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
            variant="outline"
            className="secondaryBtn"
            component="span"
            startIcon={<PhotoCameraIcon />}
            endIcon={uploading && <CircularProgress size={20} />}
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
                <Grid item key={index}>
                  <div
                    style={{
                      position: "relative",
                      height: "10em",
                      width: "10em",
                      overflow: "hidden",
                      border: "1px solid",
                      borderRadius: "10px",
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      "&:hover": { backgroundPosition: "top" },
                    }}
                  >
                    <IconButton
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => handleRemoveImage(index)}
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                </Grid>
              ))
            ) : (
              <Grid item>
                <div
                  style={{
                    position: "relative",
                    height: "10em",
                    width: "10em",
                    overflow: "hidden",
                    border: "1px solid",
                    borderRadius: "10px",
                    backgroundImage: `url(${imagePreview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&:hover": { backgroundPosition: "top" },
                  }}
                >
                  <IconButton
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => handleRemoveImage(0)}
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ImageInputField;
