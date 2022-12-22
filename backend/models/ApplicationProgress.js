const mongoose = require('mongoose');

const ApplicationProgressSchema = new mongoose.Schema({
    jobRole: String,
    company: String,
    technologies: String,
    fromWhere: String,
    interview: Boolean,
    phoneScreening: Boolean,
    accepted: Boolean
}, { timestamps: true });

const ApplicationProgress = mongoose.model('ApplicationProgress', ApplicationProgressSchema);

module.exports = ApplicationProgress;