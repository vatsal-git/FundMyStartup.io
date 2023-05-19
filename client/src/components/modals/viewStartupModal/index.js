import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import StatusChip from "../../atoms/statusChip";
import ImageBox from "../../commons/imageBox";
import { userSelector } from "../../../store/user";
import { formatNumberWithSuffix } from "../../../utils/commonFunctions";

import "./index.css";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

const ViewChips = ({ data }) => {
  return (
    <Box className="view-startup-modal-content-chips-container">
      {data?.map((item) => (
        <Chip key={item} label={item} variant="outlined" />
      ))}
    </Box>
  );
};

const ViewStartupModal = ({ open, handleClose, startup }) => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);

  const onChat = () => {
    handleClose();
    navigate("/messages/" + startup.createdBy._id);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="view-startup-modal-titleBar">
        <Typography variant="inherit">{startup.name}</Typography>
        <StatusChip status={startup.status} />
      </DialogTitle>
      <DialogContent dividers>
        <Box className="view-startup-modal-content">
          <ImageBox src={startup.featuredImage} height="15em" />
          <Box mt={2}>
            <Typography variant="subtitle2">🏷️Tags:</Typography>
            <ViewChips data={startup.tags} />
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2">⚒️Founder(s):</Typography>
            <ViewChips data={startup.founders} />
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2">💰Investors:</Typography>
            <ViewChips data={startup.investors} />
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              ✈️Location:
            </Typography>
            <Typography variant="body1" sx={{ display: "inline", ml: "0.5em" }}>
              {startup.location}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              🏭Industry:
            </Typography>
            <Typography variant="body1" sx={{ display: "inline", ml: "0.5em" }}>
              {startup.industry}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              📅Founded On:
            </Typography>
            <Typography variant="body1" sx={{ display: "inline", ml: "0.5em" }}>
              {new Date(startup.foundedOn).toLocaleDateString()}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              👥Team Size:
            </Typography>
            <Typography variant="body1" sx={{ display: "inline", ml: "0.5em" }}>
              {startup.teamSize}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              💸Funding(USD):
            </Typography>
            <Typography variant="body1" sx={{ display: "inline", ml: "0.5em" }}>
              {formatNumberWithSuffix(startup.funding)}$
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle2"
              sx={{ display: "inline", mr: "0.5em" }}
            >
              ⚙️Website:
            </Typography>
            <Link href={startup.website} target="_blank">
              {startup.website}
            </Link>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              👤Startup created by:
            </Typography>
            <Link to={`/profile/${startup.createdBy._id}`}>
              {startup.createdBy.name}
            </Link>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2">🗨️Description:</Typography>
            <Typography variant="body1" textAlign="justify">
              {startup.description}
            </Typography>
          </Box>
          {!!startup.galleryImages.length && (
            <Box mt={2}>
              <Typography variant="subtitle2">📸Product Gallery:</Typography>
              <Grid container spacing="1em" mt={0}>
                {startup.galleryImages.map((image, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
                    <ImageBox src={image} height="10em" width="100%" />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        {user && startup.createdBy._id !== user._id && (
          <Button onClick={onChat} variant="contained">
            Chat
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewStartupModal;
