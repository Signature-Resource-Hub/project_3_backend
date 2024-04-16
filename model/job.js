const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    company_id: {
        type: String,

        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 100 
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expected_salary: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    skills_required: {
        type: [String],
        required: true
    }
});

const jobModel = mongoose.model('Job', jobSchema);
module.exports = jobModel;
