const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const projectController = require('../controller/projectController');

router.post('/loginUser', userController.loginUser);

// Routes of Project Registration 
router.post('/createProject' , projectController.createProjects);

module.exports = router;