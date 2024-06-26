import {ThemeOptions, createTheme} from "@mui/material";

const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#007BFF", // Blue
    },
    secondary: {
      main: "#0056b3", // Dark Blue
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#f8f9fa", // Light Gray
    },
    background: {
      default: "#000000", // Black
      paper: "#343a40", // Dark Gray
    },
    success: {
      main: "#28a745", // Green
    },
    error: {
      main: "#dc3545", // Red
    },
    warning: {
      main: "#ffc107", // Yellow
    },
  },
  typography: {
    fontFamily: "Outfit, Arial, sans-serif",
    h1: {
      fontFamily: "Merriweather, serif",
    },
    h2: {
      fontFamily: "Merriweather, serif",
    },
    h3: {
      fontFamily: "Merriweather, serif",
    },
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
    },
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: "none",
  //         borderRadius: 8,
  //       },
  //     },
  //   },
  //   MuiCard: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 16,
  //         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  //       },
  //     },
  //   },
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         padding: "16px",
  //         borderRadius: "16px",
  //       },
  //     },
  //   },
  // },
});

export default darkTheme;
