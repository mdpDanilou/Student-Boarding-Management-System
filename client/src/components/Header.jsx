import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from "@mui/material";

const Header = ({ onProfileClick, userRole }) => {
  const [headerAvatar, setHeaderAvatar] = useState(null);

  // Function to pull the latest image from storage
  const updateAvatar = () => {
    const savedAvatar = localStorage.getItem("boardease_admin_avatar");
    setHeaderAvatar(savedAvatar);
  };

  useEffect(() => {
    // Check for avatar on initial load
    updateAvatar();

    // Listen for the custom "avatarChanged" event from Profile.jsx
    window.addEventListener("avatarChanged", updateAvatar);

    // Clean up listener when component closes
    return () => window.removeEventListener("avatarChanged", updateAvatar);
  }, []);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: { sm: `calc(100% - 260px)` }, 
        ml: { sm: "260px" }, 
        backgroundColor: "#28396C", // Matching your deep blue theme
        boxShadow: "none",
        zIndex: 1201 
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#F6F4E8", letterSpacing: 0.5 }}>
            {userRole === "admin" ? "Administrator Portal" : "Student Portal"}
          </Typography>
          <IconButton onClick={onProfileClick} sx={{ p: 0 }}>
            {/* The small avatar in the top right */}
            <Avatar 
              src={headerAvatar} 
              sx={{ 
                bgcolor: "#F6F4E8", 
                color: "#28396C", 
                fontWeight: 900,
                width: 35,
                height: 35,
                fontSize: "0.9rem",
                border: "2px solid rgba(255,255,255,0.2)"
              }}
            >
              {!headerAvatar && "A"}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;