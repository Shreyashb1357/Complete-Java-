import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DriverDashboard from "./pages/driver/DriverDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserInterface from "./pages/user/UserInterface";
import UniversalInterface from "./UniversalInterface";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/universal" element={<UniversalInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver/:driverId" element={<DriverDashboard />} />
        <Route path="/user/:userId" element={<UserInterface />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </div>
  );
}

export default App;
