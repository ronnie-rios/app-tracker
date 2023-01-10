const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const passport = require('passport');

const User = require('../models/User');

const requiredToken = passport.authenticate('bearer', { session: false });

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
});

router.post('/signup', async (req, res) => {
    try {
        if(!req.body.email || !req.body.password) {
            return res.json({ error: 'err signing up'})
        } else {
            const hashedPw = await bcrypt.hash(req.body.password, 10)
            const userData = {
                email: req.body.email,
                username: req.body.username,
                hashedPassword: hashedPw
            }
            const newUser = await User.create(userData);
            return res.json(newUser)
        }
    } catch (error) {
        return res.status(500).json({ error: 'error posting'})
    }
});
router.post('/login', async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    try {     
        const foundUser = await User.findOne({ email });
        if(foundUser === null) {
            return res.status(404).json({ err: 'user not found' })
        }
        const bcryptCompare = await bcrypt.compare(password, foundUser.hashedPassword);
        if(bcryptCompare) {
            const token = crypto.randomBytes(8).toString('hex');
            foundUser.token = token
            foundUser.save()
            res.json(foundUser)
        } else {
            return res.status(400).json({ error: 'invalid pw'})
        }
    } catch (error) {
        
    }
});

module.exports = router;