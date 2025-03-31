import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import authService from "./services/authService";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import ResendVerification from "./components/ResendVerificationPage";
import AddGroup from "./pageComponents/AddGroup";
import EditGroup from "./pageComponents/EditGroup";
import ManageGroups from "./pages/ManageGroups";
import Layout from "./pageComponents/Layout";
import ManageChain from "./pages/ManageChain";
import ManageBrands from "./pages/ManageBrands";
import ManageSubZones from "./pages/ManageSubZones";
// import ManageEstimate from "./pages/ManageEstimate";
import ManageInvoices from "./pages/ManageInvoices";
import AddChain from "./pageComponents/AddChain";
import EditChain from "./pageComponents/EditChain";
import AddBrand from "./pageComponents/AddBrand";
import EditBrand from "./pageComponents/EditBrand";
import CreateEstimate from "./pageComponents/CreateEstimate";
import EditEstimate from "./pageComponents/EditEstimate";
import ManageEstimates from "./pages/ManageEstimates";

const App = () => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Navbar user={user} logout={logout} />
      <Routes>
        {/* Non-Authenticated Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/api/verify" element={<VerifyEmail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resend-verification" element={<ResendVerification />} />

        {/* Authenticated Routes */}
        {user ? (
          <Route path="/" element={<Layout logout={logout} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-groups" element={<ManageGroups />} />
            <Route path="add-group" element={<AddGroup />} />
            <Route path="edit-group/:groupId" element={<EditGroup />} />
            <Route path="manage-chain" element={<ManageChain />} />
            <Route path="add-chain" element={<AddChain />} />
            <Route path="edit-chain/:chainId" element={<EditChain />} />
            <Route path="manage-brands" element={<ManageBrands />} />
            <Route path="add-brand" element={<AddBrand />} />
            <Route path="edit-brand/:brandId" element={<EditBrand />} />
            <Route path="manage-subzones" element={<ManageSubZones />} />
            {/* <Route path="manage-estimate" element={<ManageEstimate />} /> */}
            <Route path="manage-invoices" element={<ManageInvoices />} />
            <Route path="manage-estimate" element={<ManageEstimates />} />
            <Route path="create-estimate" element={<CreateEstimate />} />
            <Route path="edit-estimate/:estimateId" element={<EditEstimate />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;