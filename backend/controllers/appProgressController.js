const ApplicationProgress = require('../models/ApplicationProgress');

 const getAllApps = async (req, res) => {
    const apps = await ApplicationProgress.find();
    return res.json(apps);
};

const getSingleApp = async (req, res) => {
    const id = req.params._id
    const singleApp = await ApplicationProgress.findById(id);
    if(!singleApp) {
        res.status(404).json({ err: 'not found'})
    }
    res.json(singleApp);
}

const postApp = async (req, res) => {
    const newApp = await ApplicationProgress.create(req.body);
    if (!req.body.jobRole || !req.body.company) {
        return res.json({
            err: 'please enter at the role and company'
        })
    } else {
        return res.json(newApp)
    }
}

module.exports = {
    getAllApps,
    getSingleApp,
    postApp
}