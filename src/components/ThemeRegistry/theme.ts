import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#f06292",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c2185b",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export default { lightTheme, darkTheme };
