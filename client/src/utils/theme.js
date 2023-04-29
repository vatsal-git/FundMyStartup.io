import createTheme from "@material-ui/core/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "rgba(0, 0, 0, 0.5)",
      contrastText: "#000000",
    },
  },
});

export default theme;
