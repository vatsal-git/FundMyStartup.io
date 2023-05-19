import React from "react";

import "./index.css";
import {
  Alert,
  Box,
  Typography,
  CircularProgress,
  AlertTitle,
  Backdrop,
} from "@mui/material";

export const HandleResponse = ({
  response,
  noDataMessage,
  backdrop,
  ...props
}) => {
  if (response?.isLoading) {
    return <Loader {...props} backdrop={backdrop} />;
  } else if (response?.isError) {
    return <Error message={response?.error?.data?.message} {...props} />;
  } else if (
    response?.isSuccess &&
    ((Array.isArray(response?.data) && response?.data?.length === 0) ||
      !response?.data)
  ) {
    return <NoData message={noDataMessage} {...props} />;
  }
};

export const Error = ({ show = true, message, width = "100%", ...props }) => {
  if (show) {
    return (
      <Box className="error-container" sx={{ width }} {...props}>
        <Alert severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error occurred</AlertTitle>
          {message}
        </Alert>
      </Box>
    );
  }
};

export const Loader = ({
  show = true,
  backdrop,
  height = "100%",
  width = "100%",
  size,
  ...props
}) => {
  if (backdrop && show) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
      >
        <CircularProgress />
      </Backdrop>
    );
  } else if (show) {
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
        <Typography variant="subtitle2" color="GrayText" fontSize="smaller">
          {message}
        </Typography>
      </Box>
    );
  }
};
