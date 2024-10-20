"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./theme";
import { Box, IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ position: "absolute", top: 4, right: 6 }}>
        <Tooltip title={`Cambiar a ${isDarkMode ? "modo claro" : "modo oscuro"}`}>
          <IconButton onClick={toggleTheme}>
            {isDarkMode ? <WbSunnyIcon data-testid="WbSunnyIcon" /> : <DarkModeIcon data-testid="DarkModeIcon" />}
          </IconButton>
        </Tooltip>
      </Box>
      {children}
    </ThemeProvider>
  );
}
