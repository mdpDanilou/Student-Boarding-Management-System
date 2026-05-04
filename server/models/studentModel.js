const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact_number: { type: String, required: true },
    address: { type: String },
    room_number: { type: String, required: true },
    school: { type: String },
    payment_status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);