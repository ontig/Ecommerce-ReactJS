import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const theme = createTheme({
  palette: {
    mode: "light",
  },
});

// https://mui.com/material-ui/customization/theming/#theme-provider
export default function Layout() {
  return (
    // The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}
