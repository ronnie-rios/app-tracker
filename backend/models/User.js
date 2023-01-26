const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
        
    },
    //all of this data,
    // personal + work exper and lines 20 -17 as a separate model
    token: String,
    idealCompany: String,
    roleLookingFor: String,
    previousRole: String,
    overallExperience: Number,
    skills: [{
        skillName: String,
        years: Number
    }],
    education: String,
    workStatus: String,
    salary: Number,
    jobLevel: String,
    workType: String,
    workCitizen: String, //work in US 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// jobDesc: Str
// roleLookingFor: Str etry full etc
// experience: int 1,2,3 years etc
//skills { asdfasdfasdfsdf JSr,asdfas}
