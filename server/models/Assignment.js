const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  date_assigned: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);