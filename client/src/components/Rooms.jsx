import React from "react";
import { Box, Grid, Paper, Typography, Button, Chip, Divider } from "@mui/material";

const Rooms = ({ students = [], setActiveTab = () => {} }) => {
  
  // These IDs should ideally come from your MongoDB 'rooms' collection
  const roomList = ["101", "102", "103", "104", "105"];

  return (
    <Box sx={{ p: 0, animation: "fadeIn 0.5s ease-in" }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#28396C", mb: 4, textTransform: "uppercase" }}>
        Room Management
      </Typography>

      <Grid container spacing={3}>
        {roomList.map((roomNum) => {
          // MongoDB Change: 's.room' must match the 'room_number' in your schema
          const occupants = students.filter(s => s.room_number === roomNum);
          const isOccupied = occupants.length > 0;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={roomNum}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 5, border: "1px solid #e0e0e0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: "#28396C" }}>
                    ROOM {roomNum}
                  </Typography>
                  <Chip 
                    label={isOccupied ? "OCCUPIED" : "AVAILABLE"} 
                    size="small"
                    sx={{ 
                      fontWeight: 900, 
                      bgcolor: isOccupied ? "#ffebee" : "#e8f5e9", 
                      color: isOccupied ? "#d32f2f" : "#2e7d32" 
                    }} 
                  />
                </Box>

                <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
                  CURRENT OCCUPANTS:
                </Typography>
                
                <Box sx={{ minHeight: 60, maxHeight: 100, overflowY: "auto", mt: 1 }}>
                  {isOccupied ? (
                    occupants.map(s => (
                      // CRITICAL CHANGE: Use s._id (MongoDB) instead of s.id (SQL)
                      <Typography key={s._id} variant="body2" sx={{ fontWeight: 700, color: "#28396C", py: 0.2 }}>
                        • {s.first_name} {s.last_name}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ fontStyle: "italic", color: "text.disabled", mt: 1 }}>
                      No occupants yet.
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "gray", display: "block" }}>Monthly Rent</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 900, color: "#28396C" }}>
                      ₱2,500
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => setActiveTab("Students")}
                    sx={{ 
                      borderRadius: 2, 
                      fontWeight: 700, 
                      textTransform: "none", 
                      bgcolor: "#28396C",
                      "&:hover": { bgcolor: "#1e2b52" }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Rooms;