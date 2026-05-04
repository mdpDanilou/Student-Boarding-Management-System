const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// IMPORT ROUTES
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// 1. Root Route for testing (Helps you see if the URL is live)
app.get('/', (req, res) => {
    res.send("✅ Backend is running! Access the API at /api/auth or /api/students");
});

// 2. MOUNT ROUTES
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Error:', err));

// 4. VERCEL/LOCAL LOGIC
// We only run app.listen locally. On Vercel, we just export the app.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.APP_PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Local Server on http://localhost:${PORT}`));
}

// CRITICAL: Export the app for Vercel's serverless handler
module.exports = app;   