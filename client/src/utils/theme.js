import createTheme from "@material-ui/core/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "rgba(0, 0, 0, 0)",
      contrastText: "#000000",
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#333333",
        },
      },
      containedSecondary: {
        backgroundColor: "transparent",
        color: "#000000",
        "&:hover": {
          backgroundColor: "#EEEEEE",
        },
      },
    },
  },
});

export default theme;
