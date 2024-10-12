const express = require('express');
const router = express.Router();
const { handleUpdateDB, handleGodownStock } = require('../middlewares/updatedb');
const { auth } = require('../middlewares/authenticated');

router.post('/updatedb',auth, handleUpdateDB);
router.post('/godownstock',auth, handleGodownStock);

module.exports = router;