import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Donor Pages
import DonorDashboard from "./donor/DonorDashboard.jsx";
import DonateItems from "./donor/DonateItems.jsx";
import DonationHistory from "./donor/DonationHistory.jsx";
import EmergencyDrives from "./donor/EmergencyDrives.jsx";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard.jsx";
import DonorsList from "./admin/DonorsList.jsx";
import ManageDrives from "./admin/ManageDrives.jsx";
import RecipientsList from "./admin/RecipientsList.jsx";
import Reports from "./admin/Reports.jsx";

// Logistics Pages
import LogisticsDashboard from "./logistics/LogisticsDashboard.jsx";
import Inventory from "./logistics/Inventory.jsx";
import AssignDelivery from "./logistics/AssignDelivery.jsx";

// Recipient Pages
import RecipientDashboard from "./recipient/RecipientDashboard.jsx";
import RequestItems from "./recipient/RequestItems.jsx";
import TrackRequests from "./recipient/TrackRequests.jsx";
import Feedback from "./recipient/Feedback.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/donors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DonorsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageDrives />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recipients"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RecipientsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* DONOR ROUTES */}
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/donate"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <DonateItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/history"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <DonationHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/drives"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <EmergencyDrives />
            </ProtectedRoute>
          }
        />

        {/* LOGISTICS ROUTES */}
        <Route
          path="/logistics/dashboard"
          element={
            <ProtectedRoute allowedRoles={["logistics"]}>
              <LogisticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/logistics/inventory"
          element={
            <ProtectedRoute allowedRoles={["logistics"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/logistics/assign"
          element={
            <ProtectedRoute allowedRoles={["logistics"]}>
              <AssignDelivery />
            </ProtectedRoute>
          }
        />

        {/* RECIPIENT ROUTES */}
        <Route
          path="/recipient/dashboard"
          element={
            <ProtectedRoute allowedRoles={["recipient"]}>
              <RecipientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipient/request"
          element={
            <ProtectedRoute allowedRoles={["recipient"]}>
              <RequestItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipient/track"
          element={
            <ProtectedRoute allowedRoles={["recipient"]}>
              <TrackRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipient/feedback"
          element={
            <ProtectedRoute allowedRoles={["recipient"]}>
              <Feedback />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
