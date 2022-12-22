const express = require('express');
const router = express.Router();
const { getAllApps, postApp, putApp, getSingleApp } = require('../controllers/appProgressController');

router.get('/', (req, res) => {
    getAllApps(req, res)
});
router.get('/:id', (req, res) => {
    getSingleApp(req, res)
});
router.post('/', (req, res) => {
    postApp(req, res)
});

router.put('/:id', (req, res) => {
    putApp(req, res)
});


module.exports = router;