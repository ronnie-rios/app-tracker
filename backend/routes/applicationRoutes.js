const express = require('express');
const router = express.Router();
const { getAllApps, postApp } = require('../controllers/appProgressController');

router.get('/', (req, res) => {
    getAllApps(req, res)
});
router.post('/', (req, res) => {
    postApp(req, res)
});


module.exports = router;