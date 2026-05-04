const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  room_number: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  occupied: { type: Number, default: 0 }
});

module.exports = mongoose.model('Room', RoomSchema);