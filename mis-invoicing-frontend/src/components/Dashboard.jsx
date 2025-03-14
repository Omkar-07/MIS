import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Divider,
  Avatar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ReportIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";

// Sidebar items with roles
const sidebarItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", roles: ["ROLE_ADMIN", "ROLE_SALES_PERSON"] },
  { text: "Employee Management", icon: <PeopleIcon />, path: "/employee-management", roles: ["ROLE_ADMIN"] },
  { text: "Payroll", icon: <AttachMoneyIcon />, path: "/payroll", roles: ["ROLE_ADMIN"] },
  { text: "Time & Attendance", icon: <ScheduleIcon />, path: "/time-attendance", roles: ["ROLE_ADMIN", "ROLE_SALES_PERSON"] },
  { text: "Reports", icon: <ReportIcon />, path: "/reports", roles: ["ROLE_ADMIN", "ROLE_SALES_PERSON"] },
];

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Fetch user role on component mount
  useEffect(() => {
    const role = authService.getUserRole();
    if (!role) {
      navigate("/login");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  // Filter sidebar items based on the user's role
  const filteredSidebarItems = sidebarItems.filter((item) => item.roles.includes(userRole));

  // Logout function
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Redirect to Reset Password Page
  const handleResetPassword = () => {
    navigate("/forgot-password");
  };

  // Show loading state while fetching role
  if (!userRole) {
    return <Typography>Loading...</Typography>;
  }

  // Card styles
  const cardStyles = {
    height: "100%",
    borderRadius: "12px",
    padding: "16px",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar position="fixed" sx={{ zIndex: 1300, height: 64, backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            MIS & Invoicing System
          </Typography>
          <Box>
            <Button color="inherit" onClick={handleResetPassword} sx={{ marginRight: 2, textTransform: "none" }} startIcon={<LockResetIcon />}>
              Reset Password
            </Button>
            <Button color="inherit" onClick={handleLogout} sx={{ textTransform: "none" }} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 260,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 260, boxSizing: "border-box", backgroundColor: "#f5f5f5", position: "fixed", zIndex: 1200 },
        }}
      >
        <Toolbar />
        <Box sx={{ textAlign: "center", padding: "16px" }}>
          <Avatar sx={{ width: 80, height: 80, margin: "0 auto 8px", backgroundColor: "#1976d2" }}>
            {userRole === "ROLE_ADMIN" ? "A" : "S"}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {userRole === "ROLE_ADMIN" ? "Admin" : "Salesperson"}
          </Typography>
        </Box>
        <Divider />
        <List>
          {filteredSidebarItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                padding: "12px 24px",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: "#1976d2" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: "medium" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "260px",
          padding: "24px",
          paddingTop: "80px",
          backgroundColor: "#fafafa",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Welcome, {userRole === "ROLE_ADMIN" ? "Admin" : "Salesperson"}!
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "16px" }}>
          {/* Admin-Specific Content */}
          {userRole === "ROLE_ADMIN" && (
            <>
              <Grid item xs={12} md={4}>
                <Card sx={{ ...cardStyles, backgroundColor: "#e3f2fd" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                      Employee Management
                    </Typography>
                    <Typography variant="body1">Manage employees and their roles.</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ ...cardStyles, backgroundColor: "#e8f5e9" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                      Payroll
                    </Typography>
                    <Typography variant="body1">View and manage payroll details.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}

          {/* Shared Content */}
          <Grid item xs={12} md={4}>
            <Card sx={{ ...cardStyles, backgroundColor: "#fbe9e7" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Time & Attendance
                </Typography>
                <Typography variant="body1">Track employee attendance.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ ...cardStyles, backgroundColor: "#fff3e0" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Reports
                </Typography>
                <Typography variant="body1">Generate and view reports.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;