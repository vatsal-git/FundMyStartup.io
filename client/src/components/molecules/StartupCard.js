import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import ViewStartupModal from "../modals/ViewStartup.modal";

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
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {startup.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {startup.description}
        </Typography>
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
