import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Link, InputAdornment, IconButton, Alert } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Apartment } from "@mui/icons-material";
import API from "../api"; 

const Auth = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError("");

    // --- Validation Logic ---
    const isStudentEmail = email.toLowerCase().endsWith("@student.com");
    const isAdminEmail = email.toLowerCase() === "admin@boardease.com";

    if (!isRegister) {
      // --- LOGIN LOGIC ---
      try {
        if (!isAdminEmail && !isStudentEmail) {
          setError("Invalid domain. Use @student.com or admin@boardease.com");
          return;
        }

        const response = await API.post("/auth/login", { email, password });
        
        // Backend returns { role: 'admin' | 'student' }
        onLogin(response.data.role, email); 

      } catch (err) {
        // Displays backend error (e.g., "Student account not found")
        setError(err.response?.data?.message || "Login failed. Check your connection.");
      }
    } else {
      // --- REGISTRATION LOGIC ---
      // Fix: Allow both @student.com and the specific admin email to register
      if (!isStudentEmail && !isAdminEmail) {
        setError("Invalid email domain for registration.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      try {
        await API.post("/auth/register", { email, password });
        alert("Registration successful! You can now sign in.");
        setIsRegister(false); // Switch back to login view
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed.");
      }
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F6F4E8" }}>
      <Paper elevation={24} sx={{ p: 5, width: "100%", maxWidth: 420, borderRadius: 6, backgroundColor: "#28396C", color: "#F6F4E8", textAlign: "center" }}>
        <Box sx={{ mb: 3 }}>
          <Apartment sx={{ fontSize: 55, color: "#F6F4E8", mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 1, fontFamily: 'Arial Black, sans-serif' }}>
            Board<span style={{ color: "#98A1BC" }}>Ease</span>
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, fontWeight: 800 }}>
            {isRegister ? "Student Register" : "Welcome Back"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
            {isRegister ? "Create an account to get started." : "Sign in to manage your boarding."}
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleAuthAction}>
          <TextField 
            fullWidth placeholder="Email Address" variant="standard"
            value={email} onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Email sx={{ color: "#98A1BC" }} /></InputAdornment>),
              disableUnderline: true, 
              sx: { backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 3, px: 2, py: 1.5, color: "#F6F4E8", mb: 2 }
            }}
          />
          <TextField 
            fullWidth type={showPassword ? "text" : "password"} placeholder="Password" variant="standard"
            value={password} onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Lock sx={{ color: "#98A1BC" }} /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#98A1BC" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true, 
              sx: { backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 3, px: 2, py: 1.5, color: "#F6F4E8" }
            }}
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 4, py: 2, borderRadius: 3, backgroundColor: "#F6F4E8", color: "#28396C", fontWeight: 900 }}>
            {isRegister ? "REGISTER" : "SIGN IN →"}
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <Link 
              component="button" 
              type="button" 
              onClick={() => {
                setIsRegister(!isRegister);
                setError(""); // Clear errors when switching
              }} 
              sx={{ color: "#F6F4E8", fontWeight: 700, textDecoration: "none", cursor: "pointer" }}
            >
              {isRegister ? "Login" : "Register"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;