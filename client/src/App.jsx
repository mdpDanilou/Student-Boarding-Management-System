import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import API from "./api"; // Import your Axios bridge
import Sidebar from "./components/Sidebar";
import Header from "./components/Header"; 
import Dashboard from "./components/Dashboard"; 
import StudentDashboard from "./components/StudentDashboard"; 
import Student from "./components/Student"; 
import Register from "./components/Register"; 
import Auth from "./components/Auth";
import Payments from "./components/Payments";
import Reports from "./components/Reports";
import Rooms from "./components/Rooms";
import Profile from "./components/Profile"; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userRole, setUserRole] = useState(""); 
  const [currentUserEmail, setCurrentUserEmail] = useState(""); 
  const [activeTab, setActiveTab] = useState("Dashboard");

  // 1. Initialize states as empty arrays/objects
  const [students, setStudents] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({});

  // 2. FETCH DATA FROM MONGODB ON LOAD
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const response = await API.get("/students");
      setStudents(response.data);
      
      // Initialize paymentStatus object from student data
      // Key: student._id, Value: student.payment_status (or default to Pending)
      const statusMap = {};
      response.data.forEach(s => {
        statusMap[s._id] = s.payment_status || "Pending";
      });
      setPaymentStatus(statusMap);
    } catch (err) {
      console.error("Error fetching data from MongoDB:", err);
    }
  };

  const handleLogin = (role, email) => {
    setUserRole(role); 
    setCurrentUserEmail(email); 
    setIsAuthenticated(true);
    setActiveTab("Dashboard");
  };

  // 3. UPDATED HANDLERS FOR MONGODB
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this boarder?")) {
      try {
        await API.delete(`/students/${id}`);
        setStudents(students.filter(s => s._id !== id));
      } catch (err) {
        alert("Failed to delete student");
      }
    }
  };

  const handleEdit = async (updatedStudent) => {
    try {
      const response = await API.put(`/students/${updatedStudent._id}`, updatedStudent);
      setStudents(students.map(s => s._id === updatedStudent._id ? response.data : s));
    } catch (err) {
      alert("Failed to update student");
    }
  };

  const renderContent = () => {
    const commonProps = { 
      students, 
      setStudents, 
      paymentStatus, 
      setPaymentStatus, 
      setActiveTab,
      onEdit: handleEdit // Pass edit handler down
    };

    if (activeTab === "Dashboard") {
      return userRole === "admin" ? (
        <Dashboard {...commonProps} />
      ) : (
        <StudentDashboard students={students} paymentStatus={paymentStatus} currentUserEmail={currentUserEmail} /> 
      );
    }

    switch (activeTab) {
      case "Students": 
        return userRole === "admin" ? (
          <Student {...commonProps} onDelete={handleDelete} />
        ) : (
          <StudentDashboard {...commonProps} />
        );
      case "Register Student":
        return <Register setActiveTab={setActiveTab} onRegister={(newStudent) => { 
          // newStudent already has _id from the backend response in Register.jsx
          setStudents([...students, newStudent]);
          setPaymentStatus(prev => ({ ...prev, [newStudent._id]: "Pending" }));
          setActiveTab("Students"); 
        }} />;
      case "Rooms": return <Rooms students={students} setActiveTab={setActiveTab} />;
      case "Payments": return <Payments {...commonProps} />;
      case "Reports": return <Reports students={students} paymentStatus={paymentStatus} />;
      case "Profile": return <Profile adminData={{ name: userRole === "admin" ? "Ma. Danilou Paculan" : "Student User", email: currentUserEmail }} />;
      default: return <Dashboard {...commonProps} />;
    }
  };

  if (!isAuthenticated) return <Auth onLogin={handleLogin} />;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F6F4E8", minHeight: "100vh" }}>
      <CssBaseline />
      <Sidebar activeTab={activeTab} onMenuClick={setActiveTab} onLogout={() => setIsAuthenticated(false)} userRole={userRole} />
      <Box component="main" sx={{ flexGrow: 1, ml: { sm: "260px" }, display: "flex", flexDirection: "column" }}>
        <Header onProfileClick={() => setActiveTab("Profile")} userRole={userRole} />
        <Toolbar /> 
        <Box sx={{ p: 4 }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default App;