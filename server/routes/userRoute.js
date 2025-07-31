const express = require('express');
const { registerValidator, loginValidation,getUserValidation } = require('../utils/validation/userValidation');
const { signup, login, getUser, getAllUsers } = require('../controllers/userService');
const router = express.Router();

router.post('/register', registerValidator, signup);

router.post('/login', loginValidation, login);

router.get('/', getAllUsers);

router.get('/:id',getUserValidation, getUser);

module.exports = router;
