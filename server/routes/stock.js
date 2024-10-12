const express = require('express');
const router = express.Router();
const { handleGodownStocks, handleGodownStock, handleMoveItem, handleModifyStock, handleCombine} = require('../middlewares/stock');
const { auth } = require('../middlewares/authenticated');

router.get('/stocks',auth, handleGodownStocks);
router.get('/stock',auth, handleGodownStock);
router.get('/combine',auth, handleCombine)
router.put('/mv',auth, handleMoveItem);
router.put('/mod',auth, handleModifyStock);

module.exports = router;