import React from "react";
import { Chip } from "@mui/material";

const StatusChip = ({ status }) => {
  return (
    <Chip
      label={status === "open" ? "Open" : "Closed"}
      variant="outlined"
      icon={
        <div
          style={{
            height: "15px",
            width: "15px",
            borderRadius: "50%",
            backgroundColor: status === "open" ? "green" : "red",
            marginLeft: ".8em",
          }}
        />
      }
    />
  );
};

export default StatusChip;
