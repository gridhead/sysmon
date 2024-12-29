import {
  AccessAlarm,
  AccountTree,
  BugReport,
  Cable,
  Dashboard,
  Favorite,
  Info,
  Inventory,
  Memory,
  Settings,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";

import ObtainHeader from "../comp/head.tsx";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const vibe = useSelector((area) => area.area.vibe);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar variant="dense" sx={{ color: vibe }}>
        <Typography fontWeight="bold">Observer</Typography>
      </Toolbar>
      <Divider />
      <List>
        <NavLink to="/" className="sidelink">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Resources" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="/page_task" className="sidelink">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountTree />
              </ListItemIcon>
              <ListItemText primary="Activities" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="/page_proc" className="sidelink">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessAlarm />
              </ListItemIcon>
              <ListItemText primary="Processing" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="/page_memo" className="sidelink">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Memory />
              </ListItemIcon>
              <ListItemText primary="Performance" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="/page_ntwk" className="sidelink">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Cable />
              </ListItemIcon>
              <ListItemText primary="Connections" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="/page_disk" className="sidelink">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Partitions" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Preferences" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Information" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BugReport />
            </ListItemIcon>
            <ListItemText primary="Communicate" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="Contribute" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          color: { vibe },
        }}
        color="default"
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="headelem">
            <ObtainHeader />
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "rgba(224, 224,  224, 0.5)",
        }}
      >
        <Toolbar variant="dense" />
        <Outlet />
      </Box>
    </Box>
  );
}
