import {createTheme} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007BFF", // Blue
    },
    secondary: {
      main: "#0056b3", // Dark Blue
    },
    text: {
      primary: "#000000", // Black
      secondary: "#343a40", // Dark Gray
    },
    background: {
      default: "#FFFFFF", // White
      paper: "#f8f9fa", // Light Gray
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
    button: {
      textTransform: "none",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "5px",
          },
          "*::-webkit-scrollbar-track": {
            background: "#E4EFEF",
          },
          "*::-webkit-scrollbar-thumb": {
            background: "#1D388F61",
            borderRadius: "2px",
          },
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       textTransform: "none",
    //       borderRadius: 8,
    //     },
    //   },
    // },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 16,
    //       boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    //     },
    //   },
    // },
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       padding: "16px",
    //       borderRadius: "16px",
    //     },
    //   },
    // },
  },
});

export default theme;
