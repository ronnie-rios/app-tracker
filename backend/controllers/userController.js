const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const passport = require('passport');

const User = require('../models/User');

const requiredToken = passport.authenticate('bearer', { session: false });

const router = express.Router();

//get all users | production only
router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
});

//signup create account
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

//login 
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
            res.json({ id: foundUser._id, token: foundUser.token })
        } else {
            return res.status(400).json({ error: 'invalid pw'})
        }
    } catch (error) {
        res.json(error)
    }
});

//profile data
router.get('/profile/:id', requiredToken, async(req, res) => {
    const id = req.params.id
     try {     
        const foundUser = await User.findById(id);
        if(foundUser === null) {
            return res.status(404).json({ err: 'user not found' })
        }
        res.json({ id: foundUser._id, token: foundUser.token, username: foundUser.username, jobDesc: foundUser.jobDesc, roleLookingFor: foundUser.roleLookingFor, overallExperience: foundUser.overallExperience, skills: foundUser.skills })
        //res.json(foundUser)
        
    } catch (error) {
        res.json(error)
    }
});

router.put('/profile/:id', requiredToken, async (req, res) => {
    const id = req.params.id
    try {
        const foundUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.json({ id: foundUser._id, token: foundUser.token, username: foundUser.username, jobDesc: foundUser.jobDesc, roleLookingFor: foundUser.roleLookingFor, overallExperience: foundUser.overallExperience, skills: foundUser.skills })
    } catch (error) {
        res.json(error)
    }
})

//logout
router.delete('/logout', requiredToken, (req, res) => {
    req.user.token = null
    req.user.save()
        // do not send new token back to client
        .then(() => res.sendStatus(204))
        .catch((err)=> res.json(err))
});

module.exports = router;
