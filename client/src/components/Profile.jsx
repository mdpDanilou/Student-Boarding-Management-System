import React, { useState, useRef } from "react";
import { Box, Paper, Typography, TextField, Button, Avatar, Grid, Alert, InputAdornment } from "@mui/material";
import { Save, PhotoCamera, Badge, Lock, Email, Person } from "@mui/icons-material";
import API from "../api"; // Added API import to save changes to MongoDB

const Profile = ({ adminData }) => {
  const fileInputRef = useRef(null);
  
  // 1. Load initial avatar from localStorage (Kept as is)
  const [avatar, setAvatar] = useState(() => localStorage.getItem("boardease_admin_avatar") || null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Local state for form fields to allow editing
  const [formData, setFormData] = useState({
    name: adminData.name || "Administrator",
    email: adminData.email || "admin@boardease.com"
  });

  // 2. Process image upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String);
        localStorage.setItem("boardease_admin_avatar", base64String);
        
        // 3. Dispatch global event to update the Header (Kept logic)
        window.dispatchEvent(new Event("avatarChanged")); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setError("");
      // logic: In a real MongoDB setup, you'd send formData to /api/users/update
      // await API.put(`/users/${adminData.id}`, formData);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to update profile settings.");
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#28396C", mb: 4, letterSpacing: -1 }}>
        ADMIN PROFILE
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>Profile updated successfully!</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}

      <Grid container spacing={4}>
        {/* Left Card: Photo */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 5, textAlign: "center", borderRadius: 5, boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
            <Avatar 
              src={avatar} 
              sx={{ 
                width: 140, height: 140, mx: "auto", mb: 2, 
                bgcolor: "#28396C", fontSize: "3.5rem", fontWeight: 900,
                boxShadow: "0 8px 20px rgba(40, 57, 108, 0.2)"
              }}
            >
              {!avatar && formData.name.charAt(0)}
            </Avatar>
            
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#28396C" }}>{formData.name}</Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 3 }}>System Administrator</Typography>
            
            <Button 
              variant="outlined" 
              startIcon={<PhotoCamera />} 
              onClick={() => fileInputRef.current.click()}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
            >
              Change Photo
            </Button>
          </Paper>
        </Grid>

        {/* Right Card: Settings */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 5, boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Badge color="primary" /> Account Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth label="Full Name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  InputProps={{ startAdornment: (<InputAdornment position="start"><Person size={20}/></InputAdornment>) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth label="Email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  InputProps={{ startAdornment: (<InputAdornment position="start"><Email size={20}/></InputAdornment>) }}
                />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Lock color="primary" /> Password & Security
                </Typography>
                <TextField fullWidth type="password" label="Current Password" sx={{ mb: 2 }} placeholder="Leave blank to keep current" />
                <TextField fullWidth type="password" label="New Password" />
              </Grid>
            </Grid>

            <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
              <Button 
                variant="contained" 
                startIcon={<Save />} 
                onClick={handleSave}
                sx={{ bgcolor: "#28396C", px: 4, py: 1.5, borderRadius: 2, fontWeight: 800 }}
              >
                SAVE PROFILE
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;