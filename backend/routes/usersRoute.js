const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const { route } = require("./doctorsRoute.js");

router.get('/getUsers',usersController.getUsers);

router.delete('/deleteUser',usersController.deleteUser);

module.exports = router;