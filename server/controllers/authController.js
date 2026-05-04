const Student = require('../models/studentModel');
const Admin = require('../models/adminModel');

// Ensure it starts with 'exports.login'
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isAdmin = email.toLowerCase() === "admin@boardease.com";
        const user = isAdmin 
            ? await Admin.findOne({ email }) 
            : await Student.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        res.status(200).json({ message: "Login Successful", role: isAdmin ? "admin" : "student" });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};

// Ensure it starts with 'exports.register'
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isAdmin = email.toLowerCase() === "admin@boardease.com";
        if (isAdmin) {
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) return res.status(400).json({ message: "Admin already registered." });
            const newAdmin = new Admin({ email, password });
            await newAdmin.save();
            return res.status(201).json({ message: "Admin registered successfully!" });
        } else {
            const existingStudent = await Student.findOne({ email });
            if (existingStudent) return res.status(400).json({ message: "Student already registered." });
            const newStudent = new Student({ email, password, first_name: "New", last_name: "Student", room_number: "TBD" });
            await newStudent.save();
            return res.status(201).json({ message: "Student registered successfully!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};