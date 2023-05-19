import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#338FFF",
    },
    secondary: {
      main: "#ebebeb",
      contrastText: "#000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: "none",
          boxShadow:
            "0px 1.7px 5.3px rgba(0, 0, 0, 0.02),0px 5.6px 17.9px rgba(0, 0, 0, 0.03),0px 25px 80px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

export default theme;
