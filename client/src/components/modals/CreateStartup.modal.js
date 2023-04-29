import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useCreateStartupMutation } from "../../store/apis/startup.api";
import ChipInputField from "../atoms/ChipInputField";
import ImageInputField from "../atoms/ImageInputField";
import { useSelector } from "react-redux";
import { userSelector } from "./../../store/user";

const DEFAULT_STARTUP_DATA = {
  name: "Test Startup",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  location: "India",
  industry: "Information Technology",
  foundedOn: new Date().toISOString().slice(0, 10),
  tags: ["Test tag 1", "Test tag 2", "Test tag 3"],
  founders: ["Test founder 1", "Test founder 2"],
  investors: ["Test investor 1", "Test investor 2"],
  teamSize: 20,
  funding: 10000000,
  website: "www.myteststartup.com",
  featuredImage: null,
  galleryImages: [],
};

const CreateStartupModal = ({ open, handleClose }) => {
  const { user } = useSelector(userSelector);
  const [startupData, setStartupData] = useState(DEFAULT_STARTUP_DATA);

  const [createStartup, { isLoading, isSuccess, isError, error }] =
    useCreateStartupMutation();

  useEffect(() => {
    if (isSuccess) {
      handleClose({ fetchNewData: isSuccess });
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createStartup({
      ...startupData,
      createdBy: user._id,
    });
  };

  const handleChange = (e) => {
    setStartupData({ ...startupData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" scroll={"paper"}>
      <DialogTitle>
        Create Startup
        <br />
        {isError && (
          <Typography sx={{ color: "red" }}>{error.data.message}</Typography>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <form>
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
            multiline
            fullWidth
            required
            value={startupData.description}
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
            value={startupData.location}
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
            value={startupData.industry}
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
            value={startupData.foundedOn}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <ChipInputField
            label="Founders"
            name="founders"
            value={startupData.founders}
            onChange={(event) =>
              setStartupData({
                ...startupData,
                founders: event.target.value.split(","),
              })
            }
            onDelete={(index) => {
              const newValues = [...startupData.founders];
              newValues.splice(index, 1);
              setStartupData({ ...startupData, founders: newValues });
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
            value={startupData.teamSize}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 1,
              },
            }}
          />
          <ChipInputField
            label="Tags"
            name="tags"
            value={startupData.tags}
            onChange={(event) =>
              setStartupData({
                ...startupData,
                tags: event.target.value.split(","),
              })
            }
            onDelete={(index) => {
              const newValues = [...startupData.tags];
              newValues.splice(index, 1);
              setStartupData({ ...startupData, tags: newValues });
            }}
          />
          <TextField
            margin="dense"
            id="website"
            name="website"
            label="Website"
            type="text"
            fullWidth
            value={startupData.website}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="funding"
            name="funding"
            label="Funding"
            type="number"
            fullWidth
            value={startupData.funding}
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
            value={startupData.investors}
            onChange={(event) =>
              setStartupData({
                ...startupData,
                investors: event.target.value.split(","),
              })
            }
            onDelete={(index) => {
              const newValues = [...startupData.investors];
              newValues.splice(index, 1);
              setStartupData({ ...startupData, investors: newValues });
            }}
          />
          <ImageInputField
            id="featuredImage"
            label="Featured Image"
            value={startupData.featuredImage}
            onChange={(imageFile) => {
              setStartupData((prevState) => ({
                ...prevState,
                featuredImage: imageFile,
              }));
            }}
          />
          <ImageInputField
            id="galleryImages"
            label="Gallery Images"
            multiple
            value={startupData.galleryImages}
            onChange={(imageFiles) => {
              setStartupData((prevState) => ({
                ...prevState,
                galleryImages: [...prevState.galleryImages, ...imageFiles],
              }));
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="secondaryBtn">
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          className={isLoading ? "" : "primaryBtn"}
          onClick={handleSubmit}
        >
          <span>Create</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStartupModal;
