
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import authService from './services/authService'; // Import authService
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';
import ResendVerification from './components/ResendVerificationPage';
import EmployeeManagement from './pages/EmployeeManagement';
import Payroll from './pages/Payroll';
import TimeAttendance from './pages/TimeAttendance';
import Reports from './pages/Reports';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState(null);

  
  const logout = async () => {
    try {
      await authService.logout(); 
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null); 
      window.location.href = '/login'; 
    }
  };

 
  let inactivityTimer;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      logout(); 
    }, 30 * 60 * 1000); 
  };

  
  useEffect(() => {
    if (user) {
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keypress', resetInactivityTimer);
      window.addEventListener('click', resetInactivityTimer);

 
      resetInactivityTimer();


      return () => {
        window.removeEventListener('mousemove', resetInactivityTimer);
        window.removeEventListener('keypress', resetInactivityTimer);
        window.removeEventListener('click', resetInactivityTimer);
        clearTimeout(inactivityTimer); 
      };
    }
  }, [user]); 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); 
    }
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Navbar user={user} logout={logout} />
      <Container sx={{ paddingTop: '80px', paddingBottom: '24px' }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/api/verify" element={<VerifyEmail />} /> {/* Add this route */}
          <Route path="/login" element={<Login setUser={setUser} />} /> {/* Pass setUser here */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route
            path="/employee-management"
            element={user ? <EmployeeManagement /> : <Navigate to="/login" />}
          />
          <Route
            path="/payroll"
            element={user ? <Payroll /> : <Navigate to="/login" />}
          />
          <Route
            path="/time-attendance"
            element={user ? <TimeAttendance /> : <Navigate to="/login" />}
          />
          <Route
            path="/reports"
            element={user ? <Reports /> : <Navigate to="/login" />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;