const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/notepad_db';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.log('MongoDB connection failed. Falling back to local port listener for UI debugging.');
        console.error('Error:', err.message);
        // Still listen so the frontend doesn't get connection refused, 
        // even if DB operations might fail (we should handle this in controllers or use a mock)
        app.listen(PORT, () => console.log(`Server running on port ${PORT} (Disconnected from DB)`));
    });
