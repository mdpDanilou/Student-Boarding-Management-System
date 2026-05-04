import React from "react";
import { 
  Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, 
  Button, Chip, TextField, InputAdornment, Typography, TableContainer 
} from "@mui/material";
import { Search } from "@mui/icons-material";

const PaymentTracker = ({ students, paymentStatus, onStatusChange }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#28396C", mb: 3 }}>
        PAYMENT TRACKER
      </Typography>
      
      <TextField 
        fullWidth 
        placeholder="Search boarder name..." 
        sx={{ mb: 3, bgcolor: "#fff", borderRadius: 2 }}
        InputProps={{ 
          startAdornment: <InputAdornment position="start"><Search /></InputAdornment> 
        }}
      />

      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#28396C" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 800 }}>BOARDER NAME</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 800 }}>ROOM</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 800 }}>MONTHLY RATE</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 800 }}>STATUS</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 800 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => {
              // Logic Kept: Check status using MongoDB _id
              const isPaid = paymentStatus[s._id] === "Paid";
              
              return (
                <TableRow key={s._id}>
                  {/* Updated: Combined name fields for MongoDB Schema */}
                  <TableCell sx={{ fontWeight: 600 }}>
                    {s.first_name} {s.last_name}
                  </TableCell>
                  {/* Updated: room_number field */}
                  <TableCell>
                    <Chip label={`Room ${s.room_number || "N/A"}`} size="small" />
                  </TableCell>
                  <TableCell>₱ 2,500.00</TableCell>
                  <TableCell>
                    <Chip 
                      label={isPaid ? "PAID" : "UNPAID"} 
                      color={isPaid ? "success" : "warning"}
                      sx={{ fontWeight: 900 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      // Logic Kept: Toggle via onStatusChange callback
                      onClick={() => onStatusChange(s._id, isPaid ? "Unpaid" : "Paid")}
                      sx={{ 
                        bgcolor: isPaid ? "#d32f2f" : "#28396C", 
                        borderRadius: 2, 
                        textTransform: "none",
                        "&:hover": { bgcolor: isPaid ? "#b71c1c" : "#1e2b52" }
                      }}
                    >
                      Mark as {isPaid ? "Unpaid" : "Paid"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentTracker;