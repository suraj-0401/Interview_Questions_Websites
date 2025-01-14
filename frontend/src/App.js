import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { setAuthToken } from "./api";
import SubmissionForm from "./components/Submission";
import MySubmission from "./components/MySubmission";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submission" element={<SubmissionForm />} />
        <Route path="/mysubmission" element={<MySubmission />} />
      </Routes>
    </Router>
  );
};

export default App;
