const Job = require('../model/job');

exports.addJob = function(req, res) {
    const { company_id,company_name, title, category, description, expected_salary, email, skills_required } = req.body;

 
    if (!company_id || !company_name ||!title || !category || !description || !expected_salary || !email || !skills_required) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    
    if (!email.includes('@gmail.com')) {
        return res.status(400).json({ message: 'Email must contain "@gmail.com"' });
    }

    const newJob = new Job({
        company_id,
        company_name,
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

exports.viewAllJobs = function(req, res) {
    // Query the database for all jobs using Job.find() method
    Job.find()
        .then(jobs => {
            // Check if any jobs are found
            if (jobs.length === 0) {
                return res.status(404).json({ message: 'No jobs found' });
            }
            
            // Return the list of jobs in the response with a 200 OK status
            res.status(200).json({ jobs });
        })
        .catch(error => {
            // Handle any errors that occur during the query
            res.status(500).json({ message: error.message });
        });
};

exports.getJobById = function(req, res) {
    const { id } = req.body; // Retrieve job _id from the request body

    // Validate that the id parameter is provided
    if (!id) {
        return res.status(400).json({ message: 'Job ID is required in the request body' });
    }

    // Query the database for a job with the given _id using Job.findById() method
    Job.findById(id)
        .then(job => {
            if (!job) {
                // If no job is found, return a 404 Not Found response
                return res.status(404).json({ message: 'Job not found' });
            }

            // Return the job details in the response with a 200 OK status
            res.status(200).json({ job });
        })
        .catch(error => {
            // Handle any errors that occur during the query
            res.status(500).json({ message: error.message });
        });
};
