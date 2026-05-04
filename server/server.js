const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// IMPORT ROUTES
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

// 1. ADD THIS: Root Route for testing
app.get('/', (req, res) => {
    res.send("✅ Backend is running! Access the API at /api/auth or /api/students");
});

// 2. MOUNT ROUTES (Check these prefixes!)
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Error:', err));

app.listen(5000, () => console.log('🚀 Server on http://localhost:5000'));