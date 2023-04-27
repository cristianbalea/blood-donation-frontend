import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/Admin";
import DoctorPage from "./pages/Doctor";
import DonorPage from "./pages/Donor"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/donor" element = {<DonorPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
