import React from "react";
import { useUIState } from "../providers/UIStateProvider";
import {
  Drawer,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as ProfileIcon,
  PersonAdd as RegisterIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { blue, grey, pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function AppDrawer() {
  const { openDrawer, setOpenDrawer } = useUIState();
  const navigate = useNavigate();

  return (
    <Drawer
      open={openDrawer}
      anchor="left"
      onClose={() => setOpenDrawer(false)}
    >
      <Box sx={{ width: 350 }}>
        <Box
          sx={{
            height: 250,
            bgcolor: "banner.background",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 96,
                height: 96,
                bgcolor: pink[500],
                color: "inherit",
              }}
            >
              A
            </Avatar>
            <Box>
              <Typography
                sx={{ fontWeight: "bold", color: blue[500], fontSize: 24 }}
              >
                Alice
              </Typography>
              <Typography sx={{ color: grey[600], fontSize: 16, mt: -1 }}>
                @alice
              </Typography>
            </Box>
          </Box>
        </Box>

        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              disableRipple
              onClick={() => {
                navigate("/");
                setOpenDrawer(false);
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disableRipple>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disableRipple>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disableRipple onClick={() => {
              navigate("/register");
              setOpenDrawer(false);
            }}>
              <ListItemIcon>
                <RegisterIcon />
              </ListItemIcon>
              <ListItemText>Register</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              disableRipple
              onClick={() => {
                navigate("/login");
                setOpenDrawer(false);
              }}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
