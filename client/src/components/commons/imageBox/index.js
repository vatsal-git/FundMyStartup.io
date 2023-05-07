import React from "react";

import "./index.css";
import { Box } from "@mui/material";

const ImageBox = ({ src, height, width, children, ...props }) => {
  return (
    <Box
      className="imageBox-container"
      sx={{ backgroundImage: `url(${src})`, height, width }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ImageBox;
