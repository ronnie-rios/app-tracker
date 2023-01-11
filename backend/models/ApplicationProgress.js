const mongoose = require('mongoose');

const ApplicationProgressSchema = new mongoose.Schema({
    dateSubmitted: Date,
    jobRole: String,
    company: String,
    technologies: String,
    fromWhere: String,
    interview: Boolean,
    phoneScreening: Boolean,
    accepted: Boolean,
    denied: Boolean,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    }
}, { timestamps: true });

const ApplicationProgress = mongoose.model('ApplicationProgress', ApplicationProgressSchema);

module.exports = ApplicationProgress;