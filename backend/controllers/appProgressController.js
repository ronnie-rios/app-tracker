const ApplicationProgress = require('../models/ApplicationProgress');

 const getAllAppsOwner = async (req, res) => {
    const apps = await ApplicationProgress.find().populate('owner');
    return res.json(apps);
};
 const getAllApps = async (req, res) => {
    const apps = await ApplicationProgress.find({ owner: req.user._id });
    return res.json(apps);
};

const getSingleApp = async (req, res) => {
    const id = req.params.id
    const singleApp = await ApplicationProgress.findById(id);
    if(!singleApp) {
        res.status(404).json({ err: 'not found'})
    }
    res.json(singleApp);
}

const postApp = async (req, res) => {
    console.log(req.body);
    const newApp = await ApplicationProgress.create(req.body);
    // newApp.owner = req.user._id
    if (!req.body.jobRole || !req.body.company) {
        return res.json({
            err: 'please enter at the role and company'
        })
    } else {
        return res.json(newApp)
    }
}

const putApp = async (req, res) => {
    try {
        const updateApp = await ApplicationProgress.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(updateApp)
    } catch (error) {
        res.json(error)
    }
}
const deleteApp = async (req, res) => {
    try {
        const removeApp = await ApplicationProgress.findByIdAndDelete(req.params.id);
        return res.json(removeApp)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    getAllAppsOwner,
    getAllApps,
    getSingleApp,
    postApp,
    putApp,
    deleteApp
}