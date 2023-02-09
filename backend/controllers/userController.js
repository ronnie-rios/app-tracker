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
            
            res.json({ id: foundUser._id, token: foundUser.token, username: foundUser.username, jobDesc: foundUser.jobDesc, roleLookingFor: foundUser.roleLookingFor, overallExperience: foundUser.overallExperience, skills: foundUser.skills, location: foundUser.location}) //send the whole user obj
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
        const foundUser = await User.findById(id).select('-hashedPassword');
        if(foundUser === null) {
            return res.status(404).json({ err: 'user not found' })
        }
        res.json(foundUser)
        
    } catch (error) {
        res.json(error)
    }
});

router.put('/profile/edit/skills/:id', requiredToken, async (req, res) => {
    const id = req.params.id
    //
    try {
        const updateUser = await User.findByIdAndUpdate(id,{ $push: {skills: req.body } }, { new: true })
        // const updateUser = await foundUser
        res.json({ id: updateUser._id, token: updateUser.token, username: updateUser.username, jobDesc: updateUser.jobDesc, roleLookingFor: updateUser.roleLookingFor, overallExperience: updateUser.overallExperience, skills: updateUser.skills })
    } catch (error) {
        res.json(error)
    }
});
router.delete('/profile/edit/:userId/skills/:skillId', requiredToken, async (req, res) => {
    const id = req.params.userId
    const id2 = req.params.skillId
    try {
        const updateUser = await User.findByIdAndUpdate(id, { $pull: { skills: { _id: id2 } } }, { new: true })
        res.json(updateUser)
    } catch (error) {

        res.json(error)
    }
});
router.put('/profile/edit/:id', requiredToken, async (req, res) => {
    const id = req.params.id
    //
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-hashedPassword')
        //res.json({ id: updateUser._id, token: updateUser.token, username: updateUser.username, jobDesc: updateUser.jobDesc, roleLookingFor: updateUser.roleLookingFor, overallExperience: updateUser.overallExperience, education: updateUser.education, workStatus: updateUser.workStatus, salary: updateUser.salary, idealCompany: updateUser.idealCompany, workCitizen: updateUser.workCitizen, jobLevel: updateUser.jobLevel })
        res.json(updateUser)
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
