const express = require("express");
const router = express.Router();
const doctorController = require('../controllers/doctorController.js');
const { route } = require("./authRoutes.js");

// route to add doctor in the database
router.post('/addDoctors',doctorController.addDoctor);

// route to get all doctors from the database
router.get('/getDoctors',doctorController.getDoctors);
router.get('/getDoctorsByDepartment',doctorController.getDoctorsByDepartment);
router.get('/availabeDoctors',doctorController.availabeDoctors);

// this route is used when admin tries to edit doctor data
router.get('/getDoctorByEmail',doctorController.getDoctorByEmail);


// 
router.put('/editDoctor',doctorController.editDoctor);
router.delete('/deleteDoctor',doctorController.deleteDoctor);

module.exports = router;

