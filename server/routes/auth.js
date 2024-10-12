const express = require('express');
const router = express.Router();
const { handleSignin, handleSignup } = require('../middlewares/auth');

router.post('/signin', handleSignin);
router.post('/signup', handleSignup);

module.exports = router;