import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, createContext, useState, useContext, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { grey, common } from "@mui/material/colors";

const ThemeOptionContext = createContext();

export default function ThemeOption(props) {
   const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
   const [activeTheme, setActiveTheme] = useState(
      document.documentElement.dataset.theme
   );

   function changeTheme(theme) {
      const newTheme =
         theme === "default" ? (prefersDarkMode ? "dark" : "light") : theme;
      setActiveTheme(newTheme);
      window.localStorage.setItem("theme", newTheme);
      document.documentElement.dataset.theme = newTheme;
   }

   const themeConfig = createTheme({
      palette: {
         mode: activeTheme,
      },
   });

   const value = useMemo(() => ({ changeTheme, activeTheme }), [activeTheme]);

   return (
      <ThemeOptionContext.Provider value={value}>
         <ThemeProvider theme={themeConfig} {...props} />
      </ThemeOptionContext.Provider>
   );
}

export function useToggleTheme() {
   const context = useContext(ThemeOptionContext);
   if (!context) {
      throw new Error("ThemeOptionContext must be used with ThemeOption");
   }
   return context;
}
