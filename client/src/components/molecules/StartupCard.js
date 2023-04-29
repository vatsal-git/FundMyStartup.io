import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useState } from "react";
import ViewStartupModal from "../modals/ViewStartup.modal";
import { formatNumberWithSuffix } from "../../utils/commonFunctions";
import PersonIcon from "@mui/icons-material/Person";

const StartupCard = ({ startup }) => {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ border: "1px solid black" }}>
      <CardContent sx={{ position: "relative" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <div
            style={{
              height: "10em",
              width: "100%",
              overflow: "hidden",
              borderRadius: "5px",
              backgroundImage: `url(${startup.featuredImage})`,
              // backgroundImage: `url(${"https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                boxShadow:
                  "0px 0px 2.7px rgba(0, 0, 0, 0.056),0px 0px 6.9px rgba(0, 0, 0, 0.08),0px 0px 14.2px rgba(0, 0, 0, 0.1),0px 0px 29.2px rgba(0, 0, 0, 0.124),0px 0px 80px rgba(0, 0, 0, 0.18) inset",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6" component="h2">
            {startup.name}
          </Typography>
          <Chip
            icon={<PersonIcon fontSize="small" />}
            label={startup.createdBy}
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {startup.description.slice(0, 100) + "..."}
        </Typography>
        <Box display="flex" alignItems="start" flexWrap="wrap" gap={1} mt={2}>
          <Chip label={startup.location} variant="outlined" />
          <Chip label={startup.industry} variant="outlined" />
          <Chip
            label={formatNumberWithSuffix(startup.funding) + "$"}
            variant="outlined"
          />
          <br />
          <Chip label={startup.tags[0]} variant="outlined" />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          className="secondaryBtn"
          sx={{ marginLeft: "auto" }}
          onClick={handleOnClick}
        >
          View Details
        </Button>
        <ViewStartupModal
          open={open}
          handleClose={handleClose}
          startup={startup}
        />
      </CardActions>
    </Card>
  );
};

export default StartupCard;
