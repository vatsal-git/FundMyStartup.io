import React from "react";

import "./index.css";
import { Alert, Box, Typography, CircularProgress } from "@mui/material";

export const HandleResponse = ({ response, noDataMessage }) => {
  if (response?.isLoading) {
    return <Loader />;
  } else if (response?.isError) {
    return <Error message={response?.data?.message} />;
  } else if (
    response?.data?.isSuccess &&
    (!response?.data || response?.data?.length === 0)
  ) {
    return <NoData message={noDataMessage} />;
  }
};

export const Error = ({
  show = true,
  message = "Error occurred",
  width = "100%",
  height = "100%",
  ...props
}) => {
  if (show) {
    return (
      <Box className="error-container" sx={{ width, height }} {...props}>
        <Alert severity="error">{message}</Alert>
      </Box>
    );
  }
};

export const Loader = ({
  show = true,
  height = "100%",
  width = "100%",
  size,
  ...props
}) => {
  if (show) {
    return (
      <Box
        className="loader-container"
        sx={{
          height,
          width,
        }}
        {...props}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }
};

export const NoData = ({
  show = true,
  height = "100%",
  width = "100%",
  message = "No data",
  ...props
}) => {
  if (show) {
    return (
      <Box
        className="noData-container"
        sx={{
          height,
          width,
        }}
        {...props}
      >
        <Typography color="subtitle2" fontSize="smaller">
          {message}
        </Typography>
      </Box>
    );
  }
};
