const express = require("express");
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');


// ::::::::::::FOR USER::::::::::::

// route to post appointment
router.post('/postAppointment',appointmentController.postAppointment);


// route to get all pending appointments for a specific doctor
router.get('/getAppointments/:id',appointmentController.getAppointments);

// route to get appointment history for a user
router.get('/getAppointmentHistory/:id',appointmentController.appointmentHistory);



/// ::::::::::::::FOR DOCTOR::::::::::::::::::::

// doctor manages patients appointment[accept or reject]
router.put('/modify',appointmentController.appointmentModify);

// route to get all today appointments for a specific doctor
router.get('/getTodayAppointments/:id',appointmentController.getTodayAppointments);

router.get('/appointments_history/:id',appointmentController.appointments_history);

// doctor manages patient's appointment for today[seen or absent]
router.put('/modifyForToday',appointmentController.appointmentSeenOrAbsent);



module.exports = router;