import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import ManageDonations from "./admin/ManageDonations";
import ManageDrives from "./admin/ManageDrives";
import ManageRequests from "./admin/ManageRequests";
import RecipientsList from "./admin/RecipientsList";
import Reports from "./admin/Reports";

// Donor pages
import DonorDashboard from "./donor/DonorDashboard";
import DonateItems from "./donor/DonateItems";
import DonationHistory from "./donor/DonationHistory";
import EmergencyDrives from "./donor/EmergencyDrives";

// Recipient pages
import RecipientDashboard from "./recipient/RecipientDashboard";
import RequestItems from "./recipient/RequestItems";
import TrackRequests from "./recipient/TrackRequests";
import Feedback from "./recipient/Feedback";

// Logistics pages
import LogisticsDashboard from "./logistics/LogisticsDashboard";
import AssignDelivery from "./logistics/AssignDelivery";
import Inventory from "./logistics/Inventory";

function App() {
  return (
    <Router>
      <Routes>

        {/* WELCOME PAGE (default) */}
       

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/donations" element={<ManageDonations />} />
        <Route path="/admin/drives" element={<ManageDrives />} />
        <Route path="/admin/requests" element={<ManageRequests />} />
        <Route path="/admin/recipients" element={<RecipientsList />} />
        <Route path="/admin/reports" element={<Reports />} />

        {/* DONOR */}
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/donate" element={<DonateItems />} />
        <Route path="/donor/history" element={<DonationHistory />} />
        <Route path="/donor/emergency" element={<EmergencyDrives />} />

        {/* RECIPIENT */}
        <Route path="/recipient/dashboard" element={<RecipientDashboard />} />
        <Route path="/recipient/request" element={<RequestItems />} />
        <Route path="/recipient/track" element={<TrackRequests />} />
        <Route path="/recipient/feedback" element={<Feedback />} />

        {/* LOGISTICS */}
        <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
        <Route path="/logistics/assign" element={<AssignDelivery />} />
        <Route path="/logistics/inventory" element={<Inventory />} />
       


      </Routes>
    </Router>
  );
}

export default App;
