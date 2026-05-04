import React, { useState } from "react";
import { 
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, TextField, InputAdornment 
} from "@mui/material";
import { Search, Payments, CheckCircle, PendingActions } from "@mui/icons-material";

const PaymentsPage = ({ students, paymentStatus, setPaymentStatus }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const togglePayment = (id) => {
    // Logic Kept: Update global state via props
    const currentStatus = paymentStatus[id] === "Paid";
    setPaymentStatus((prev) => ({
      ...prev,
      [id]: currentStatus ? "Unpaid" : "Paid",
    }));
  };

  const filteredStudents = students.filter((s) => {
    // Logic Kept: Case-insensitive search
    // Updated: Combined first_name and last_name for MongoDB schema
    const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <Box sx={{ width: "100%", animation: "fadeIn 0.5s ease-in" }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#28396C", mb: 3 }}>
        PAYMENT TRACKER
      </Typography>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, display: "flex", alignItems: "center" }}>
        <TextField 
          fullWidth 
          variant="standard" 
          placeholder="Search boarder name..." 
          InputProps={{ 
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "gray", mr: 1 }} />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#28396C" }}>
            <TableRow>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>BOARDER NAME</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>ROOM</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>MONTHLY RATE</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>STATUS</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800, textAlign: "center" }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => {
                // Logic Kept: Check status using unique ID
                // Updated: Using student._id (MongoDB) instead of student.id
                const isPaid = paymentStatus[student._id] === "Paid";
                return (
                  <TableRow key={student._id} hover>
                    <TableCell sx={{ fontWeight: 700, color: "#28396C" }}>
                      {student.first_name} {student.last_name}
                    </TableCell>
                    <TableCell>
                       <Chip label={`Room ${student.room_number || "N/A"}`} size="small" sx={{ fontWeight: 700 }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>₱ 2,500.00</TableCell>
                    <TableCell>
                      <Chip 
                        icon={isPaid ? <CheckCircle /> : <PendingActions />}
                        label={isPaid ? "PAID" : "UNPAID"} 
                        color={isPaid ? "success" : "warning"}
                        sx={{ fontWeight: 900, borderRadius: "6px" }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => togglePayment(student._id)}
                        sx={{ 
                          backgroundColor: isPaid ? "#d32f2f" : "#28396C", 
                          color: "#F6F4E8",
                          fontWeight: 700,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": { backgroundColor: isPaid ? "#b71c1c" : "#1e2b52" }
                        }}
                      >
                        {isPaid ? "Mark as Unpaid" : "Mark as Paid"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 8 }}>
                  <Payments sx={{ fontSize: 50, color: "#98A1BC", mb: 1, opacity: 0.5 }} />
                  <Typography sx={{ color: "gray", fontWeight: 500 }}>
                    No boarders found. Please register students first to track payments.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentsPage;