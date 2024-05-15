const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import Mongoose model
const RecommendModel = require('./recommendModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/job_recommendation', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// API endpoint to get recommended jobs by title
app.get('/recommend/:title', async (req, res) => {
    try {
        const title = req.params.title;

        // Find recommended jobs with similar titles
        const recommendedJobs = await RecommendModel.find({ Title: { $regex: title, $options: 'i' } }).limit(5);

        res.json({ jobs: recommendedJobs });
    } catch (error) {
        console.error('Error fetching recommended jobs:', error);
        res.status(500).json({ error: 'Error fetching recommended jobs' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
