import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import { Dashboard, People, PersonAdd, MeetingRoom, Payments, Assessment, Logout, Apartment } from "@mui/icons-material";
import { Button } from "@mui/material"; // Kept since you use it for Logout

const Sidebar = ({ activeTab, onMenuClick, onLogout, userRole }) => {
  const drawerWidth = 260;

  const menuItems = userRole === "admin" 
    ? [
        { text: "Dashboard", icon: <Dashboard /> },
        { text: "Students", icon: <People /> },
        { text: "Register Student", icon: <PersonAdd /> },
        { text: "Rooms", icon: <MeetingRoom /> },
        { text: "Payments", icon: <Payments /> },
        { text: "Reports", icon: <Assessment /> },
      ]
    : [{ text: "Dashboard", icon: <Dashboard /> }, { text: "Rooms", icon: <MeetingRoom /> }];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth, flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, boxSizing: "border-box", 
          backgroundColor: "#28396C", color: "#F6F4E8", border: "none" 
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: "center", mt: 2 }}>
        <Apartment sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 1 }}>
          Board<span style={{ color: "#98A1BC" }}>Ease</span>
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 1.5 }}>
          {userRole?.toUpperCase()} PORTAL
        </Typography>
      </Box>
      
      <List sx={{ px: 2, mt: 3 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              onClick={() => onMenuClick(item.text)}
              selected={activeTab === item.text}
              sx={{
                borderRadius: "12px",
                backgroundColor: activeTab === item.text ? "rgba(246, 244, 232, 0.15)" : "transparent",
                "&.Mui-selected": { backgroundColor: "rgba(246, 244, 232, 0.2)" },
                "&.Mui-selected:hover": { backgroundColor: "rgba(246, 244, 232, 0.25)" },
                "&:hover": { backgroundColor: "rgba(246, 244, 232, 0.1)" }
              }}
            >
              <ListItemIcon sx={{ color: "#98A1BC", minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 700, fontSize: "0.9rem" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 3 }}>
        <Button 
          fullWidth variant="contained" startIcon={<Logout />} onClick={onLogout}
          sx={{ 
            backgroundColor: "rgba(246, 244, 232, 0.1)", color: "#F6F4E8", 
            fontWeight: 800, borderRadius: "10px", "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.8)" } 
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;