const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendSchema = new Schema({
    JobID: {
        type: String,
        									
        required: true
    },
    Title: {
        type: String,
        required: true,
        maxlength: 100 
    },
    Requirements: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        
        required: true,
        
    },
    Country: {
        type: String,
        required: true
    },
    Zip5:{
        type: Number,
        required:true
    }
});

const recommendmodel = mongoose.model('Recommend', recommendSchema);
module.exports = recommendmodel;
