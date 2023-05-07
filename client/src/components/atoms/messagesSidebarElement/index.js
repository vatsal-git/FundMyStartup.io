import React from "react";

import "./index.css";
import theme from "../../../utils/theme";
import { Box, Typography } from "@mui/material";
import SexyAvatar from "./../../commons/sexyAvatar/index";

const MessagesSidebarElement = ({
  title,
  avatar,
  isActive,
  onElementClick,
  latestMessage,
}) => {
  const containerSx = {
    backgroundColor: isActive ? theme.palette.primary.main : "",
    color: isActive ? theme.palette.primary.contrastText : "",
  };

  return (
    <Box
      className="messagesSidebarElement"
      sx={containerSx}
      onClick={onElementClick}
    >
      <SexyAvatar name={title} avatar={avatar} height={40} width={40} />
      <Box>
        <Typography variant="h6" fontWeight="600">
          {title.slice(0, 20)}
        </Typography>
        <Typography variant="body2" fontWeight="300" noWrap className="messageSidebarElement-latestMessage">
          {latestMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessagesSidebarElement;
