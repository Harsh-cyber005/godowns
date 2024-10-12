const fs = require('fs').promises;
const { log } = require('console');
const {Godown, Item, Location} = require('../db');

async function removeDBId(arr){
    try{
        const newArr = arr.map(a => {
            const xa = {};
            for (const key in a) {
                if (key !== '_id') {
                    xa[key] = a[key];
                }
            }
            return xa;
        })
        return newArr;
    } catch (error) {
        console.error('Error removing _id:', error);
        return [];
    }
}

async function handleGodownsTest(req, res) {
    try{
        const g = await Godown.find().lean();
        const godowns = await removeDBId(g);
        fs.writeFile('./godowns.json', JSON.stringify(godowns, null, 2), 'utf8');
        return res.json(godowns);
    } catch (error) {
        console.error('Error getting godowns:', error);
        return res.json({
            message: 'Error getting godowns'
        });
    }
}

async function handleItemsTest(req, res) {
    try{
        const i = await Item.find().lean();
        const items = await removeDBId(i);
        fs.writeFile('./items.json', JSON.stringify(items, null, 2), 'utf8');
        return res.json(items);
    } catch (error) {
        console.error('Error getting items:', error);
        return res.json({
            message: 'Error getting items'
        });
    }
}

async function handleLocationsTest(req, res) {
    try{
        const l = await Location.find().lean();
        const locations = await removeDBId(l);
        return res.json(locations);
    } catch (error) {
        console.error('Error getting locations:', error);
        return res.json({
            message: 'Error getting locations'
        });
    }
}

async function handleGetItem(req, res) {
    try{
        const id = req.headers.id;
        
        const item = await Item.findOne({item_id:id}).lean();
        return res.json(item);
    } catch (error) {
        return res.json({
            message: 'Error getting item'
        });
    }
}

module.exports = { handleGodownsTest, handleItemsTest, handleLocationsTest, handleGetItem };