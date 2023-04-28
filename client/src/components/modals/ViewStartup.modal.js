import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ViewStartupModal = ({ open, handleClose, startup }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{startup.name}</div>
          <Chip
            label={startup.status === "open" ? "Open" : "Closed"}
            variant="outlined"
            icon={
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                  backgroundColor: startup.status === "open" ? "green" : "red",
                  marginLeft: ".8em",
                }}
              />
            }
          />
        </div>
      </DialogTitle>
      <DialogContent sx={{ minWidth: "500px" }}>
        <div>
          <Typography>Owner - {startup.createdBy}</Typography>
          <Typography>{startup.description}</Typography>
        </div>
        <DialogActions sx={{ padding: "0", paddingTop: "1em" }}>
          <Button onClick={handleClose} className="secondaryBtn">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStartupModal;
