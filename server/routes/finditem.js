const express = require('express');
const router = express.Router();
const { handleFindItem } = require('../middlewares/finditem');
const { auth } = require('../middlewares/authenticated');

router.get('/',auth, handleFindItem);

module.exports = router;