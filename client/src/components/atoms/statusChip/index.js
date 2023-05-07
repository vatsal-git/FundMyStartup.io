import React from "react";

import { Chip } from "@mui/material";

const StatusChip = ({ status }) => {
  return (
    <Chip
      variant="contained"
      color={status === "OPEN" ? "success" : "error"}
      label={status === "OPEN" ? "OPEN" : "CLOSED"}
    />
  );
};

export default StatusChip;
