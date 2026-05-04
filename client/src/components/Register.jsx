import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, MenuItem, Grid, Alert } from "@mui/material";
import API from "../api"; // Import the API bridge

const Register = ({ onRegister, setActiveTab }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "", // Updated for MongoDB Schema
    last_name: "",  // Updated for MongoDB Schema
    address: "",
    contact_number: "", // Matches Schema
    room_number: "",    // Matches Schema
    boarding_date: "",  // Matches Schema
    school: "",
    guardian_name: "",   // Matches Schema
    guardian_contact: "" // Matches Schema
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Send data to MongoDB via Backend
      const response = await API.post("/students", formData);
      
      // 2. Update local state in App.jsx so the list refreshes immediately
      onRegister(response.data); 
      
      // 3. Redirect to Student List
      setActiveTab("Students");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register student. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 2, mb: 4, animation: "fadeIn 0.5s ease-in" }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <form onSubmit={handleSubmit}>
        
        {/* CARD 1: BOARDER INFORMATION */}
        <Paper elevation={4} sx={{ p: 5, borderRadius: 8, background: "#ffffff", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#28396C", textAlign: "center", mb: 1 }}>
            STUDENT REGISTRATION
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", color: "gray", mb: 4 }}>
            Please provide the following boarder information.
          </Typography>

          <Grid container spacing={2.5}>
            {/* SPLIT NAME LOGIC */}
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>FIRST NAME</Typography>
              <TextField 
                fullWidth required placeholder="First name" 
                value={formData.first_name} 
                onChange={(e) => setFormData({...formData, first_name: e.target.value})} 
                sx={{ mt: 0.5 }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>LAST NAME</Typography>
              <TextField 
                fullWidth required placeholder="Last name" 
                value={formData.last_name} 
                onChange={(e) => setFormData({...formData, last_name: e.target.value})} 
                sx={{ mt: 0.5 }} 
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>CONTACT NO.</Typography>
              <TextField 
                fullWidth required placeholder="09XXXXXXXXX" 
                value={formData.contact_number} 
                onChange={(e) => setFormData({...formData, contact_number: e.target.value})} 
                sx={{ mt: 0.5 }} 
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>HOME ADDRESS</Typography>
              <TextField 
                fullWidth required placeholder="Street, Barangay, City, Province" 
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
                sx={{ mt: 0.5 }} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>ASSIGN ROOM</Typography>
              <TextField 
                select fullWidth required 
                value={formData.room_number} 
                onChange={(e) => setFormData({...formData, room_number: e.target.value})} 
                sx={{ mt: 0.5 }}
              >
                {["101", "102", "103", "104", "105"].map((num) => (
                  <MenuItem key={num} value={num}>Room {num}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>BOARDING DATE</Typography>
              <TextField 
                type="date" fullWidth required 
                value={formData.boarding_date} 
                onChange={(e) => setFormData({...formData, boarding_date: e.target.value})} 
                sx={{ mt: 0.5 }} 
                InputLabelProps={{ shrink: true }} 
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>SCHOOL / INSTITUTION</Typography>
              <TextField 
                fullWidth required placeholder="Enter school name" 
                value={formData.school} 
                onChange={(e) => setFormData({...formData, school: e.target.value})} 
                sx={{ mt: 0.5 }} 
              />
            </Grid>
          </Grid>
        </Paper>

        {/* CARD 2: GUARDIAN INFORMATION */}
        <Paper elevation={4} sx={{ p: 5, borderRadius: 8, background: "#ffffff" }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#28396C", borderBottom: "2px solid #F6F4E8", pb: 1, mb: 1 }}>
                GUARDIAN / PARENT CONTACT
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>GUARDIAN NAME</Typography>
              <TextField 
                fullWidth required placeholder="Enter guardian/parent name" 
                value={formData.guardian_name} 
                onChange={(e) => setFormData({...formData, guardian_name: e.target.value})} 
                sx={{ mt: 0.5 }} 
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#28396C" }}>EMERGENCY CONTACT NO.</Typography>
              <TextField 
                fullWidth required placeholder="Guardian's contact number" 
                value={formData.guardian_contact} 
                onChange={(e) => setFormData({...formData, guardian_contact: e.target.value})} 
                sx={{ mt: 0.5 }} 
              />
            </Grid>
          </Grid>
        </Paper>

        {/* ACTION BUTTONS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
          <Button 
            variant="outlined" 
            onClick={() => setActiveTab("Dashboard")} 
            sx={{ borderRadius: 2, px: 6, py: 1.2, fontWeight: 700, color: "#28396C", borderColor: "#28396C", textTransform: "none" }}
          >
            CANCEL
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ borderRadius: 2, px: 6, py: 1.2, fontWeight: 700, bgcolor: "#28396C", textTransform: "none", '&:hover': { bgcolor: "#1e2b52" } }}
          >
            REGISTER BOARDER
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;