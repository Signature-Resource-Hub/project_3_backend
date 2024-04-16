const Job = require('../model/job');

exports.addJob = function(req, res) {
    const { company_id, title, category, description, expected_salary, email, skills_required } = req.body;

 
    if (!company_id || !title || !category || !description || !expected_salary || !email || !skills_required) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    
    if (!email.includes('@gmail.com')) {
        return res.status(400).json({ message: 'Email must contain "@gmail.com"' });
    }

    const newJob = new Job({
        company_id,
        title,
        category,
        description,
        expected_salary,
        email,
        skills_required
    });

    newJob.save()
        .then(savedJob => {
            res.status(201).json({ message: 'Job added successfully', job: savedJob });
        })
        .catch(error => {
            res.status(400).json({ message: error.message });
        });
};



// exports.getJobsByCategory = function(req, res) {
//     const { category } = req.body; // Retrieve category from the request body

//     // Check if category is provided
//     if (!category) {
//         return res.status(400).json({ message: 'Category field is required in the request body' });
//     }

//     // Query jobs based on category
//     Job.find({ category })
//         .then(jobs => {
//             if (jobs.length === 0) {
//                 return res.status(404).json({ message: 'No jobs found for the specified category' });
//             }
//             res.status(200).json({ jobs });
//         })
//         .catch(error => {
//             res.status(500).json({ message: error.message });
//         });
// };

exports.getJobsByCategory = function(req, res) {
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({ message: 'Category field is required in the request body' });
    }

    Job.find({ category })
        .then(jobs => {
            if (jobs.length === 0) {
                return res.status(404).json({ message: 'No jobs found for the specified category' });
            }
            res.status(200).json({ jobs });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};