import React, { useState } from "react";
import { 
  Box, Grid, Paper, Typography, Divider, Stack, IconButton, Button 
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StudentDashboard = ({ students = [], paymentStatus = {}, currentUserEmail }) => {
  const [view, setView] = useState("announcements"); 

  // 1. Find the logged-in student using their email
  const me = students.find(s => s.email === currentUserEmail) || {};
  
  // 2. Find roommates using room_number (MongoDB Schema field)
  const roommates = students
    .filter(s => s.room_number === me.room_number && s.email !== currentUserEmail)
    .map(s => `${s.first_name} ${s.last_name}`);

  // 3. Map values to your portal display
  const studentData = {
    room: me.room_number || "TBD",
    status: paymentStatus[me._id] || "Pending", // Matches MongoDB _id
    dueDate: "May 01, 2026",
    balance: paymentStatus[me._id] === "Paid" ? "₱0.00" : "₱2,500.00",
    roommates: roommates.length > 0 ? roommates : ["Only occupant"]
  };

  // Receipt Download Logic
  const handleDownloadReceipt = () => {
    const receiptNo = Math.floor(1000 + Math.random() * 9000);
    const today = new Date().toLocaleDateString('en-PH', { dateStyle: 'long' });
    const fullName = me.first_name ? `${me.first_name} ${me.last_name}` : 'Valued Resident';
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Official Receipt - BoardEase</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 40px; color: #333; }
            .receipt-box { border: 3px solid #28396C; padding: 30px; width: 600px; margin: auto; }
            .header { text-align: center; border-bottom: 2px solid #28396C; padding-bottom: 10px; margin-bottom: 20px; }
            .info-row { margin: 15px 0; font-size: 16px; border-bottom: 1px dotted #ccc; padding-bottom: 5px; }
            .signature-space { margin-top: 50px; text-align: right; }
            .sig-name { font-family: 'Brush Script MT', cursive; font-size: 28px; color: #28396C; display: block; margin-bottom: -5px; }
            .underline { border-top: 1px solid #000; width: 200px; display: inline-block; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="receipt-box">
            <div class="header">
              <h2 style="margin:0;">BOARDEASE</h2>
              <p style="margin:5px 0;">Official Rental Receipt</p>
            </div>
            <p><strong>No.</strong> ${receiptNo} <span style="float:right"><strong>Date:</strong> ${today}</span></p>
            <div class="info-row"><strong>Received from:</strong> ${fullName}</div>
            <div class="info-row"><strong>The sum of pesos:</strong> TWO THOUSAND FIVE HUNDRED PESOS ONLY</div>
            <div class="info-row"><strong>As payment for:</strong> Boarding House - Rental (Room ${studentData.room})</div>
            <div style="margin-top:20px; font-size: 20px;"><strong>Amount: ₱2,500.00</strong></div>
            <div class="signature-space">
              <span class="sig-name">Mdanilou</span>
              <div class="underline">Authorized Signature</div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const renderDetails = () => {
    switch (view) {
      case "room":
        return (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 5, borderLeft: "8px solid #28396C" }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <IconButton onClick={() => setView("announcements")} size="small"><ArrowBackIcon /></IconButton>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#28396C" }}>ROOM DETAILS</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ pl: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Room Number:</b> {studentData.room}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Occupants:</b> {studentData.roommates.join(", ")}</Typography>
              <Typography variant="body1"><b>Amenities:</b> Free Wi-Fi, Shared Kitchen, Sub-metered Electricity</Typography>
            </Box>
          </Paper>
        );
      case "payment":
        return (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 5, borderLeft: "8px solid #2e7d32" }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <IconButton onClick={() => setView("announcements")} size="small"><ArrowBackIcon /></IconButton>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#2e7d32" }}>PAYMENT HISTORY</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ pl: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Status:</b> {studentData.status}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Due Date:</b> {studentData.dueDate}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}><b>Balance:</b> {studentData.balance}</Typography>
              {studentData.status === "Paid" && (
                <Button variant="contained" color="success" onClick={handleDownloadReceipt} size="small">
                  Download Official Receipt
                </Button>
              )}
            </Box>
          </Paper>
        );
      default:
        return (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: "#28396C" }}>📢 Boarding House Announcements</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>Monthly Water Bill</Typography>
            <Typography variant="body2" color="text.secondary">Please settle your water bill by May 25, 2026.</Typography>
          </Paper>
        );
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2, animation: "fadeIn 0.5s ease-in" }}>
      <Typography variant="h3" sx={{ fontWeight: 900, color: "#28396C", mb: 4 }}>
        WELCOME, {me.first_name ? me.first_name.toUpperCase() : "STUDENT"}!
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} onClick={() => setView("room")} sx={{ p: 3, borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 2, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <HomeIcon sx={{ color: "#28396C", fontSize: 40 }} />
            <Box><Typography variant="caption">ASSIGNED ROOM</Typography><Typography variant="h5" sx={{ fontWeight: 900 }}>{studentData.room}</Typography></Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} onClick={() => setView("payment")} sx={{ p: 3, borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 2, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <ReceiptLongIcon sx={{ color: "#2e7d32", fontSize: 40 }} />
            <Box><Typography variant="caption">PAYMENT STATUS</Typography><Typography variant="h5" sx={{ fontWeight: 900, color: "#2e7d32" }}>{studentData.status}</Typography></Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ maxWidth: "800px" }}>{renderDetails()}</Box>
    </Box>
  );
};

export default StudentDashboard;