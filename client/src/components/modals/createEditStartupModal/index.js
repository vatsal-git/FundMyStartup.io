import { useState } from "react";

import StatusChip from "./../../atoms/statusChip";
import ChipInputField from "../../commons/chipInputField";
import ImageInputField from "../../commons/imageInputField";
import { Error } from "../../commons/feedback";
import { DEFAULT_STARTUP_DATA } from "../../../utils/defaultVariables";

import "./index.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const CreateEditStartupModal = ({
  open,
  handleClose,
  handleSubmit,
  isLoading,
  error,
  defaultValues = null,
}) => {
  const [startup, setStartup] = useState(defaultValues ?? DEFAULT_STARTUP_DATA);

  const handleChange = (e) =>
    setStartup({ ...startup, [e.target.name]: e.target.value });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" scroll="paper">
      <DialogTitle>
        <Box className="createEditStartupModal-header">
          <Typography variant="inherit">
            {defaultValues ? `Edit ${defaultValues.name}` : "Create Startup"}
          </Typography>
          <Box>
            <StatusChip status={startup.status} />
            <Switch
              checked={startup.status === "OPEN"}
              onChange={(e) => {
                e.target.checked
                  ? setStartup({ ...startup, status: "OPEN" })
                  : setStartup({ ...startup, status: "CLOSED" });
              }}
              inputProps={{ "aria-label": "controlled", name: "status" }}
            />
          </Box>
        </Box>
      </DialogTitle>
      <Error show={!!error} message={error?.data?.message} mb="1em" />
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          required
          value={startup.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          multiline
          rows={5}
          fullWidth
          required
          value={startup.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="location"
          name="location"
          label="Location"
          type="text"
          fullWidth
          required
          value={startup.location}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="industry"
          name="industry"
          label="Industry"
          type="text"
          fullWidth
          required
          value={startup.industry}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="foundedOn"
          name="foundedOn"
          label="Founded"
          type="date"
          fullWidth
          required
          value={startup.foundedOn.slice(0, 10)}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <ChipInputField
          label="Founders*"
          name="founders"
          values={startup.founders}
          onChange={(newValues) =>
            setStartup({ ...startup, founders: newValues })
          }
          onDelete={(index) => {
            const newValues = [...startup.founders];
            newValues.splice(index, 1);
            setStartup({ ...startup, founders: newValues });
          }}
        />
        <TextField
          margin="dense"
          id="teamSize"
          name="teamSize"
          label="Team Size"
          type="number"
          fullWidth
          required
          value={startup.teamSize}
          onChange={handleChange}
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
        />
        <ChipInputField
          label="Tags"
          name="tags*"
          values={startup.tags}
          onChange={(newValues) => setStartup({ ...startup, tags: newValues })}
          onDelete={(index) => {
            const newValues = [...startup.tags];
            newValues.splice(index, 1);
            setStartup({ ...startup, tags: newValues });
          }}
        />
        <TextField
          margin="dense"
          id="website"
          name="website"
          label="Website"
          type="text"
          fullWidth
          value={startup.website}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="funding"
          name="funding"
          label="Funding"
          type="number"
          fullWidth
          value={startup.funding}
          onChange={handleChange}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
        <ChipInputField
          label="Investors"
          name="investors"
          values={startup.investors}
          onChange={(newValues) =>
            setStartup({ ...startup, investors: newValues })
          }
          onDelete={(index) => {
            const newValues = [...startup.investors];
            newValues.splice(index, 1);
            setStartup({ ...startup, investors: newValues });
          }}
        />
        <ImageInputField
          id="featuredImage"
          label="Featured Image"
          value={startup.featuredImage}
          onChange={(imageFile) => {
            setStartup((prevState) => ({
              ...prevState,
              featuredImage: imageFile,
            }));
          }}
        />
        <ImageInputField
          id="galleryImages"
          label="Gallery Images"
          multiple
          value={startup.galleryImages}
          onChange={(imageFiles) => {
            setStartup((prevState) => ({
              ...prevState,
              galleryImages: imageFiles,
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={(e) => handleSubmit(e, startup, defaultValues)}
        >
          {defaultValues ? "Save" : "Create"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditStartupModal;
