import React from "react";
import { Box, Grid, Paper, Typography, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from '@mui/icons-material/Assignment';

const Dashboard = ({ students = [], paymentStatus = {}, setActiveTab = () => {} }) => {
  const totalStudents = students.length;

  // Logic: Anyone NOT explicitly marked "Paid" is Pending
  const pendingCount = students.filter(student => {
    // UPDATED: Using _id for MongoDB compatibility
    const status = paymentStatus[student._id]; 
    return status !== "Paid";
  }).length;

  // Calculate Revenue: Only from "Paid" students
  const paidCount = Object.values(paymentStatus).filter(status => status === "Paid").length;
  const totalRevenue = paidCount * 2500; 

  const stats = [
    { label: "Students", value: totalStudents, color: "#28396C", icon: <PeopleAltIcon />, tab: "Students" },
    // Logic kept: Occupancy grows with students (10% per student up to 100%)
    { label: "Occupancy", value: totalStudents > 0 ? `${Math.min(totalStudents * 10, 100)}%` : "0%", color: "#28396C", icon: <MeetingRoomIcon />, tab: "Rooms" },
    { label: "Pending", value: pendingCount, color: "#d32f2f", icon: <WarningAmberIcon />, tab: "Payments" },
    { label: "Revenue", value: `₱${totalRevenue.toLocaleString()}`, color: "#2e7d32", icon: <AccountBalanceWalletIcon />, tab: "Reports" },
  ];

  return (
    <Box sx={{ p: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", animation: "fadeIn 0.5s ease-in" }}>
      {/* Header */}
      <Box sx={{ width: "100%", maxWidth: "1100px", mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: "#28396C", textTransform: "uppercase", letterSpacing: 1 }}>
          Admin Overview
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ maxWidth: "1100px", mb: 5 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={4} 
              onClick={() => setActiveTab(stat.tab)}
              sx={{ 
                p: 3, borderRadius: 5, display: "flex", alignItems: "center", gap: 2, 
                cursor: "pointer", transition: "0.2s", 
                "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }
              }}
            >
              <Box sx={{ backgroundColor: "rgba(40, 57, 108, 0.1)", p: 1.5, borderRadius: 3, color: stat.color, display: "flex" }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>{stat.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#28396C" }}>{stat.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Activity Log */}
      <Paper elevation={6} sx={{ p: 5, width: "100%", maxWidth: "1100px", borderRadius: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#28396C", mb: 2 }}>
          Activity Log
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {students.length > 0 ? (
          <List>
            {[...students].reverse().slice(0, 3).map((s) => (
              // UPDATED: Using _id for MongoDB list keys
              <ListItem key={s._id} sx={{ borderBottom: "1px solid #f9f9f9" }}>
                <ListItemIcon><AssignmentIcon sx={{ color: "#28396C" }} /></ListItemIcon>
                <ListItemText 
                  // UPDATED: s.first_name and s.last_name from our schema
                  primary={`New Registration: ${s.first_name} ${s.last_name}`} 
                  // UPDATED: s.room_number and s.contact_number from our schema
                  secondary={`Assigned to Room ${s.room_number || "Pending"} • Contact: ${s.contact_number}`} 
                  primaryTypographyProps={{ fontWeight: 700, color: "#28396C" }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ py: 3, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              No recent activity recorded.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;