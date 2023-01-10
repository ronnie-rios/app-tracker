//imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./util/auth')
//express 
const port = 7001;
mongoose.connect('mongodb://localhost/apptracker');

const app = express();

app.use(cors());
app.use(express.json());
app.use(auth)

//routes
const applicationsRoutes = require('./routes/applicationRoutes');
app.use('/applications', applicationsRoutes);

const userRoutes = require('./controllers/userController');
app.use('/users', userRoutes)
//Express Listener
const listener = () => {
    console.log(`server on ${port}`);
}

app.listen(port, listener)

