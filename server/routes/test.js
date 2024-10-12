const express = require('express');
const router = express.Router();
const { handleGodownsTest, handleItemsTest, handleLocationsTest, handleGetItem } = require('../middlewares/test');
const { auth } = require('../middlewares/authenticated');

const fs = require('fs').promises;

router.get('/godowns',auth, handleGodownsTest);
router.get('/items',auth, handleItemsTest);
router.get('/item',auth, handleGetItem);
router.get('/locations',auth, handleLocationsTest);
router.get('/file',auth,(req,res)=>{
    fs.readFile('./combines.json', 'utf8')
    .then(data => {
        return res.json(JSON.parse(data));
    })
    .catch(err => {
        console.error('Error reading godowns.json:', err);
        return res.json({
            message: 'Error reading godowns.json'
        });
    })
})

module.exports = router;