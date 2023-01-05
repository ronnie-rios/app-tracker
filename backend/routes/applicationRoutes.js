const express = require('express');
const router = express.Router();
const { getAllApps, postApp, putApp, getSingleApp, deleteApp } = require('../controllers/appProgressController');

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

router.delete('/:id', (req, res) => {
    deleteApp(req, res)
});


module.exports = router;