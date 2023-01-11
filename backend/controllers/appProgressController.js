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
    const newApp = await ApplicationProgress.create(req.body);
    newApp.owner = req.user._id
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
        const findApp = await ApplicationProgress.findById(req.params.id);
        const owner = await checkOwner(req, findApp)
        if (!owner) {
            return res.json({ err: 'err'})
        } else {
            const updateApp = await findApp.updateOne(req.body)
            return res.json(updateApp)
        }
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

const checkOwner = (req, doc) => {
    const owner = doc.owner._id ? doc.owner_id : doc.owner
    if(!req.user._id.equals(owner)){
        return 'err'
    }
    return doc
}