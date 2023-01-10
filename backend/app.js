//imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//express 
const app = express();
app.use(cors());
const port = 7001;
app.use(express.json());

//mongoose connection
mongoose.connect('mongodb://localhost/apptracker');

//routes
const applicationsRoutes = require('./routes/applicationRoutes');
app.use('/applications', applicationsRoutes)
//Express Listener
const listener = () => {
    console.log(`server on ${port}`);
}

app.listen(port, listener)

