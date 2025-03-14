import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ReportIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import authService from "../services/authService";

const Navbar = ({ user, logout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userRole = user ? authService.getUserRole() : null;

  const sidebarItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      roles: ["ROLE_ADMIN", "ROLE_SALES_PERSON"],
    },
    {
      text: "Employee Management",
      icon: <PeopleIcon />,
      path: "/employee-management",
      roles: ["ROLE_ADMIN"],
    },
    {
      text: "Payroll",
      icon: <AttachMoneyIcon />,
      path: "/payroll",
      roles: ["ROLE_ADMIN"],
    },
    {
      text: "Time & Attendance",
      icon: <ScheduleIcon />,
      path: "/time-attendance",
      roles: ["ROLE_ADMIN", "ROLE_SALES_PERSON"],
    },
    {
      text: "Reports",
      icon: <ReportIcon />,
      path: "/reports",
      roles: ["ROLE_ADMIN", "ROLE_SALES_PERSON"],
    },
  ];

  // Filter sidebar items based on the user's role
  const filteredSidebarItems = sidebarItems.filter((item) => item.roles.includes(userRole));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#1976d2", zIndex: 1300, height: 64 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            MIS & Invoicing System
          </Typography>

          {!isMobile && (
            <Box>
              {user ? (
                <Button
                  color="inherit"
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                  sx={{ textTransform: "none", padding: "8px 16px" }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{ textTransform: "none", padding: "8px 16px", marginRight: 1 }}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    sx={{
                      textTransform: "none",
                      padding: "8px 16px",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {user && (
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 260,
              backgroundColor: "#f5f5f5",
              padding: "16px 0",
              position: "fixed",
              zIndex: 1200,
            },
          }}
        >
          <Box sx={{ textAlign: "center", padding: "16px" }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                backgroundColor: "#1976d2",
              }}
            >
              {userRole === "ROLE_ADMIN" ? "A" : "S"}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
              {userRole === "ROLE_ADMIN" ? "Admin" : "Salesperson"}
            </Typography>
          </Box>
          <Divider />

          <List sx={{ padding: "8px" }}>
            {filteredSidebarItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  padding: "12px 24px",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px", color: "#1976d2" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: "medium",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;