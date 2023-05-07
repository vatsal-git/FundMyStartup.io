import React from "react";

import "./index.css";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const MessagePill = ({
  message,
  onMouseEnter,
  onMouseLeave,
  handleDelete,
  isSender,
  willShowDelete,
  pillClassName,
  ...props
}) => {
  const containerSx = {
    flexDirection: willShowDelete && isSender ? "row" : "row-reverse",
  };

  const deleteIconSx = {
    display: willShowDelete ? "block" : "none",
    marginLeft: isSender ? "auto" : "",
    marginRight: !isSender ? "auto" : "",
  };

  const pillSx = {
    backgroundColor: isSender ? "#e0e0e0" : "#000000",
    color: isSender ? "#000000" : "#ffffff",
    marginLeft: isSender && !willShowDelete ? "auto" : "",
    marginRight: !isSender && !willShowDelete ? "auto" : "",
    "&:hover": {
      backgroundColor: isSender ? "#ededed" : "#2b2b2b",
    },
  };

  return (
    <Box
      onMouseLeave={onMouseLeave}
      className="messagePill-container"
      sx={containerSx}
      {...props}
    >
      <IconButton color="error" onClick={handleDelete} sx={deleteIconSx}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
      <Box onMouseEnter={onMouseEnter} className="messagePill" sx={pillSx}>
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
};

export default MessagePill;
