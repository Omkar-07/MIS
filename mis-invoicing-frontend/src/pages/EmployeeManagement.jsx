import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container, Paper, CircularProgress } from "@mui/material";
import authService from "../services/authService";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const role = authService.getUserRole();
    if (role !== "ROLE_ADMIN") {
      setTimeout(() => navigate("/dashboard"), 2000); 
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  if (isAuthorized === null) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthorized) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", marginTop: "80px", padding: "24px" }}>
          <Typography variant="h6" sx={{ color: "error.main", fontWeight: "bold" }}>
            Access Denied
          </Typography>
          <Typography variant="body1">
            You do not have permission to access this page. Redirecting to dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: "80px", padding: "24px" }}>
        <Paper elevation={3} sx={{ padding: "32px", borderRadius: "8px" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
            Employee Management
          </Typography>
          <Typography variant="body1">
            This is the Employee Management page. Here you can manage employees and their roles.
            

          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default EmployeeManagement;
