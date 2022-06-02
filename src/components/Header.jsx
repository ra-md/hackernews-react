import { NavLink } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { common } from "@mui/material/colors";
import { useToggleTheme } from "./ThemeOption";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function Header({ paths }) {
   const { changeTheme, mode } = useToggleTheme();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <AppBar position="static">
         <Container maxWidth="md">
            <Box
               sx={{
                  display: "flex",
                  my: 1.5,
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               <div>
                  {paths.map((path) => {
                     return (
                        <Link
                           sx={{ pr: 2 }}
                           key={path}
                           component={NavLink}
                           to={path}
                           color={common.white}
                           style={({ isActive }) =>
                              isActive
                                 ? { fontWeight: 700 }
                                 : { fontWeight: 400 }
                           }
                           underline="hover"
                        >
                           {path === "/" ? "HN" : path}
                        </Link>
                     );
                  })}
               </div>
               <Button
                  sx={{ color: "white" }}
                  aria-controls={open ? "theme-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
               >
                  Theme
               </Button>
               <Menu
                  id="theme-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
               >
                  <MenuItem
                     onClick={() => {
                        handleClose();
                        changeTheme("default");
                     }}
                  >
                     OS Default
                  </MenuItem>
                  <MenuItem
                     onClick={() => {
                        handleClose();
                        changeTheme("light");
                     }}
                  >
                     Light
                  </MenuItem>
                  <MenuItem
                     onClick={() => {
                        handleClose();
                        changeTheme("dark");
                     }}
                  >
                     Dark
                  </MenuItem>
               </Menu>
            </Box>
         </Container>
      </AppBar>
   );
}
