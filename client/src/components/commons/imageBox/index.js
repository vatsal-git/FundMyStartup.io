import React from "react";

import "./index.css";
import { Box } from "@mui/material";

const ImageBox = ({ src, alt, children, ...props }) => {
  return (
    <Box
      className="imageBox-container"
      sx={{ borderColor: (theme) => theme.palette.secondary.main }}
      {...props}
    >
      <img src={src} alt={alt} />
      {children}
    </Box>
  );
};

export default ImageBox;
