import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';

const Navbar = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: 1300, 
        backgroundColor: "#28396C", // Updated to your new Deep Blue
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" 
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Professional Icon Container */}
          <Box 
            sx={{ 
              backgroundColor: '#F6F4E8', 
              borderRadius: '8px', 
              p: 0.5, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <ApartmentIcon sx={{ fontSize: 28, color: '#28396C' }} />
          </Box>

          {/* Branding with Bold Font */}
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 900, // Ultra Bold
                letterSpacing: 0.5, 
                color: '#F6F4E8', 
                fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                textTransform: 'uppercase'
              }}
            >
              Board<span style={{ color: '#98A1BC' }}>Ease</span>
            </Typography>
            <Typography 
              sx={{ 
                fontWeight: 600, 
                fontSize: '0.7rem', 
                color: '#98A1BC', 
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                mt: -0.5
              }}
            >
              Management System
            </Typography>
          </Box>
        </Box>

        {/* Optional: Right side detail or User profile can go here */}
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 700, 
            color: '#F6F4E8', 
            opacity: 0.8,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          Administrator Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;