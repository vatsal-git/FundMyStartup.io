import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import StatusChip from "../atoms/StatusChip";
import { formatNumberWithSuffix } from "../../utils/commonFunctions";

const ViewStartupModal = ({ open, handleClose, startup }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" scroll={"paper"}>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{startup.name}</div>
          <StatusChip status={startup.status} />
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            <div
              style={{
                height: "15em",
                width: "100%",
                overflow: "hidden",
                borderRadius: "10px",
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
          <Box mt={1}>
            <Typography variant="overline">Tags:</Typography>
            <br />
            <Box display="flex" alignItems="center" gap={1}>
              {startup.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Box>
          </Box>
          <Box mt={1}>
            <Typography variant="overline">Founder(s):</Typography>
            <br />
            <Box display="flex" alignItems="center" gap={1}>
              {startup.founders.map((founder) => (
                <Chip key={founder} label={founder} variant="outlined" />
              ))}
            </Box>
          </Box>
          <Box my={1}>
            <Typography variant="overline">Investors:</Typography>
            <br />
            <Box display="flex" alignItems="center" gap={1}>
              {startup.investors.map((investor) => (
                <Chip key={investor} label={investor} variant="outlined" />
              ))}
            </Box>
          </Box>
          <Typography variant="overline">
            Location: {startup.location}
          </Typography>
          <Typography variant="overline">
            Industry: {startup.industry}
          </Typography>
          <Typography variant="overline">
            Founded On: {new Date(startup.foundedOn).toLocaleDateString()}
          </Typography>
          <Typography variant="overline">
            Team Size: {startup.teamSize}
          </Typography>
          <Typography variant="overline">
            Funding(USD): {formatNumberWithSuffix(startup.funding)}$
          </Typography>
          <Typography variant="overline">
            Website: <a href={startup.website}>{startup.website}</a>
          </Typography>
          <Typography variant="overline">
            Startup created by: {startup.createdBy}
          </Typography>
          <Typography variant="overline">Description:</Typography>
          <Typography variant="subtitle1">{startup.description}</Typography>
          <Box mt={1}>
            <Typography variant="overline">Product Gallery:</Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{ flexWrap: "wrap" }}
            >
              {startup.galleryImages.map((image) => (
                <div
                  key={image}
                  style={{
                    height: "10em",
                    width: "10em",
                    overflow: "hidden",
                    borderRadius: "10px",
                    backgroundImage: `url(${image})`,
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
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="secondaryBtn">
          Close
        </Button>
        <Button onClick={handleClose} className="primaryBtn">
          Chat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewStartupModal;
