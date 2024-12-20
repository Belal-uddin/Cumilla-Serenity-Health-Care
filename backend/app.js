// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js')
const doctorsRoute = require('./routes/doctorsRoute.js')
const usersRoute = require('./routes/usersRoute.js')
const appointmentRoute = require('./routes/appointmentRoute.js')
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());


app.use('/auth',authRoutes);
app.use('/api/doctors',doctorsRoute);
app.use('/api/users',usersRoute);
app.use('/appointment',appointmentRoute);


module.exports = app;
