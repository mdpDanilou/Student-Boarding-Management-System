import React, { useState } from "react";
import { 
  Box, Paper, Typography, Divider, Stack, Button, 
  IconButton, Table, TableBody, TableCell, TableHead, TableRow, Chip, Grid 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Reports = ({ students, paymentStatus }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  // Dynamic date for report titles
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const reportCategories = [
    { id: 1, title: "Monthly Revenue Report", date: currentMonth, description: "Summary of all collected and pending payments." },
    { id: 2, title: "Room Occupancy Report", date: currentMonth, description: "Detailed list of room availability and assignments." },
    { id: 3, title: "Student Directory", date: "Full Term", description: "Complete record of active boarders." }
  ];

  // --- 1. REVENUE REPORT LOGIC ---
  const renderRevenueReport = () => {
    const monthlyRate = 2500;
    const totalExpected = students.length * monthlyRate;
    
    // logic: matches paymentStatus keys with MongoDB _id
    const collectedAmount = Object.values(paymentStatus || {}).filter(status => status === "Paid").length * monthlyRate;

    return (
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <IconButton onClick={() => setSelectedReport(null)} sx={{ color: "#28396C" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 900, color: "#28396C" }}>REVENUE REPORT - {currentMonth.toUpperCase()}</Typography>
        </Stack>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'left', borderRadius: 3, borderLeft: "6px solid #28396C" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>TOTAL EXPECTED</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#28396C" }}>₱{totalExpected.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'left', borderRadius: 3, borderLeft: "6px solid #2e7d32" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#2e7d32" }}>COLLECTED</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#2e7d32" }}>₱{collectedAmount.toLocaleString()}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Table size="small">
          <TableHead sx={{ backgroundColor: "rgba(40, 57, 108, 0.05)" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 900 }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => {
              // Updated: Using _id for status check
              const isPaid = paymentStatus[s._id] === "Paid";
              return (
                <TableRow key={s._id}>
                  {/* Updated: Combined names */}
                  <TableCell sx={{ fontWeight: 600 }}>{s.first_name} {s.last_name}</TableCell>
                  <TableCell>₱{monthlyRate.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={isPaid ? "PAID" : "PENDING"} 
                      size="small" 
                      sx={{ 
                        fontWeight: 900, 
                        color: isPaid ? "#2e7d32" : "#d32f2f", 
                        backgroundColor: isPaid ? "rgba(46, 125, 50, 0.1)" : "rgba(211, 47, 47, 0.1)" 
                      }} 
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    );
  };

  // --- 2. OCCUPANCY REPORT LOGIC ---
  const renderOccupancyReport = () => (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton onClick={() => setSelectedReport(null)} sx={{ color: "#28396C" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#28396C" }}>ROOM OCCUPANCY REPORT</Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />
      <Table>
        <TableHead sx={{ backgroundColor: "rgba(40, 57, 108, 0.05)" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 900 }}>ROOM</TableCell>
            <TableCell sx={{ fontWeight: 900 }}>STATUS</TableCell>
            <TableCell sx={{ fontWeight: 900 }}>OCCUPANT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {["101", "102", "103", "104", "105"].map((roomNum) => {
            // Updated: Matching room_number
            const occ = students.find(s => s.room_number === roomNum);
            return (
              <TableRow key={roomNum}>
                <TableCell sx={{ fontWeight: 700 }}>{roomNum}</TableCell>
                <TableCell>
                  <Chip 
                    label={occ ? "OCCUPIED" : "AVAILABLE"} 
                    size="small" 
                    variant="outlined"
                    color={occ ? "error" : "success"} 
                    sx={{ fontWeight: 800 }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {occ ? `${occ.first_name} ${occ.last_name}` : "---"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );

  // --- 3. STUDENT DIRECTORY LOGIC ---
  const renderStudentDirectory = () => (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton onClick={() => setSelectedReport(null)} sx={{ color: "#28396C" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#28396C" }}>STUDENT DIRECTORY</Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />
      <Table>
        <TableHead sx={{ backgroundColor: "rgba(40, 57, 108, 0.05)" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 900 }}>NAME</TableCell>
            <TableCell sx={{ fontWeight: 900 }}>SCHOOL</TableCell>
            <TableCell sx={{ fontWeight: 900 }}>ROOM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s._id}>
              <TableCell sx={{ fontWeight: 700, color: "#28396C" }}>
                {s.first_name} {s.last_name}
              </TableCell>
              <TableCell sx={{ textTransform: 'uppercase', fontWeight: 500 }}>{s.school}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{s.room_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

  const renderContent = () => {
    switch (selectedReport.id) {
      case 1: return renderRevenueReport();
      case 2: return renderOccupancyReport();
      case 3: return renderStudentDirectory();
      default: return null;
    }
  };

  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      {!selectedReport ? (
        <>
          <Typography variant="h3" sx={{ fontWeight: 900, color: "#28396C", mb: 1 }}>SYSTEM REPORTS</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>Select a category to view detailed analytics.</Typography>
          
          <Stack spacing={2} sx={{ maxWidth: "1000px" }}>
            {reportCategories.map((report) => (
              <Paper 
                key={report.id} 
                elevation={2}
                sx={{ 
                  p: 3, 
                  borderRadius: 4, 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  borderLeft: "6px solid transparent",
                  "&:hover": { borderLeft: "6px solid #28396C" }
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: "#28396C" }}>{report.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>{report.description}</Typography>
                </Box>
                <Button 
                  variant="contained" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => setSelectedReport(report)}
                  sx={{ 
                    backgroundColor: "#28396C", 
                    fontWeight: 800, 
                    borderRadius: 2,
                    px: 3,
                    "&:hover": { backgroundColor: "#1e2b52" }
                  }}
                >
                  SHOW
                </Button>
              </Paper>
            ))}
          </Stack>
        </>
      ) : (
        <Paper elevation={4} sx={{ p: 4, borderRadius: 6, width: "100%", maxWidth: "1000px" }}>
          {renderContent()}
        </Paper>
      )}
    </Box>
  );
};

export default Reports;