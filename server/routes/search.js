const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authenticated');
const { handleAutoSearch, handleBasicSearch, handleFilterSearch} = require('../middlewares/search');

router.get('/auto',auth, handleAutoSearch);
router.get('/basic',auth, handleBasicSearch);
router.put('/filter',auth, handleFilterSearch);

module.exports = router;