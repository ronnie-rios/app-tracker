//imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./util/auth')
//express 
const port = 7001;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/apptracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

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

