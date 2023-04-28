import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CreateStartupModal = ({ open, handleClose }) => {
  const [startupData, setStartupData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ startupData });
    handleClose();
  };

  const handleChange = (e) => {
    setStartupData({ ...startupData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Startup</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            required
            value={startupData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            required
            value={startupData.description}
            onChange={handleChange}
          />
          <DialogActions sx={{ padding: "0", paddingTop: "1em" }}>
            <Button onClick={handleClose} className="secondaryBtn">
              Cancel
            </Button>
            <Button type="submit" className="primaryBtn">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStartupModal;
