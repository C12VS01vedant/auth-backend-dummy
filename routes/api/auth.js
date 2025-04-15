const express = require('express');
const { signup, login, logout } = require('../../controllers/auth_controllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
