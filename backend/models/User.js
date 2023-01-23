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
    token: String,
    jobDesc: String,
    roleLookingFor: String,
    overallExperience: Number,
    skills: [{
        skillName: String,
        years: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// jobDesc: Str
// roleLookingFor: Str etry full etc
// experience: int 1,2,3 years etc
//skills { asdfasdfasdfsdf JSr,asdfas}
