import React, { useState } from "react";
import { 
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Tooltip, TextField, Button, Dialog, 
  DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";

const Student = ({ students, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Updated filter logic to handle split names and MongoDB naming
  const filteredStudents = students.filter((s) => {
    const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return (
      fullName.includes(search) ||
      s.contact_number.includes(searchTerm) ||
      (s.address && s.address.toLowerCase().includes(search))
    );
  });

  const handleEditClick = (student) => {
    setSelectedStudent({ ...student });
    setOpenEdit(true);
  };

  const handleSaveEdit = () => {
    onEdit(selectedStudent);
    setOpenEdit(false);
  };

  return (
    <Box sx={{ width: "100%", animation: "fadeIn 0.5s ease-in" }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#28396C", mb: 3 }}>
        REGISTERED BOARDERS
      </Typography>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Search sx={{ color: "gray" }} />
        <TextField 
          fullWidth 
          variant="standard" 
          placeholder="Search by name, contact, or address..." 
          InputProps={{ disableUnderline: true }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#28396C" }}>
            <TableRow>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>NAME</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>ADDRESS</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>CONTACT</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>ROOM</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800 }}>SCHOOL</TableCell>
              <TableCell sx={{ color: "#F6F4E8", fontWeight: 800, textAlign: "center" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student._id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {student.first_name} {student.last_name}
                  </TableCell>
                  <TableCell sx={{ color: "gray", maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {student.address || "No Address"}
                  </TableCell>
                  <TableCell>{student.contact_number}</TableCell>
                  <TableCell>
                    <Box sx={{ backgroundColor: "#e3f2fd", color: "#1976d2", px: 1.5, py: 0.5, borderRadius: 1, display: "inline-block", fontWeight: 700 }}>
                      {student.room_number}
                    </Box>
                  </TableCell>
                  <TableCell>{student.school}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Tooltip title="Edit Info">
                      <IconButton onClick={() => handleEditClick(student)} sx={{ color: "#28396C" }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove Boarder">
                      <IconButton onClick={() => onDelete(student._id)} sx={{ color: "#d32f2f" }}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 5, color: "gray" }}>
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 900, color: "#28396C" }}>Edit Boarder Details</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField 
              label="First Name" 
              fullWidth 
              value={selectedStudent?.first_name || ""} 
              onChange={(e) => setSelectedStudent({ ...selectedStudent, first_name: e.target.value })} 
            />
            <TextField 
              label="Last Name" 
              fullWidth 
              value={selectedStudent?.last_name || ""} 
              onChange={(e) => setSelectedStudent({ ...selectedStudent, last_name: e.target.value })} 
            />
            <TextField 
              label="Home Address" 
              fullWidth 
              multiline 
              rows={2} 
              value={selectedStudent?.address || ""} 
              onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })} 
            />
            <TextField 
              label="Contact Number" 
              fullWidth 
              value={selectedStudent?.contact_number || ""} 
              onChange={(e) => setSelectedStudent({ ...selectedStudent, contact_number: e.target.value })} 
            />
            <TextField 
              label="Room" 
              fullWidth 
              value={selectedStudent?.room_number || ""} 
              onChange={(e) => setSelectedStudent({ ...selectedStudent, room_number: e.target.value })} 
            />
            <TextField 
              label="School / Institution" 
              fullWidth 
              value={selectedStudent?.school || ""} 
              onChange={(e) => setSelectedStudent({ ...selectedStudent, school: e.target.value })} 
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEdit(false)} sx={{ color: "gray", fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" sx={{ backgroundColor: "#28396C", fontWeight: 700 }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Student;