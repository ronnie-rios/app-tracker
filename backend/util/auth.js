
// require the passport authentication library 
const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const User = require('../models/User')
// using passport and bearer

passport.use(new Strategy(function (token, done) {
    User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }
        return done(null, user, { scope: 'all' })
    })
}))

module.exports = passport.initialize()