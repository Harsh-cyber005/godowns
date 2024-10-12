const {Godown, Item, Location, GodownStock, Combine} = require('../db');
const fs = require('fs').promises;

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

async function modifyStock(res, id, quantity){
    try{
        const item = await Item.findOne({ item_id: id });
        const godownStock = await GodownStock.findOne({ godown_id: item.godown_id });
        const index = godownStock.items.findIndex(i => i.item_id === id);
        godownStock.items[index].quantity = quantity;
        console.log(godownStock);
        item.quantity = quantity;
        await godownStock.save();
        await item.save();
        return res.json({
            message: 'Stock modified successfully'
        });
    }
    catch(error){
        return res.status(500).json({
            message: 'Error modifying stock',
            error: error
        });
    }
}

async function moveitem(item, oldGodownId, newGodownId){
    try{
        const oldGodown = await GodownStock.findOne({ godown_id: oldGodownId });
        const newGodown = await GodownStock.findOne({ godown_id: newGodownId });
        const oldItems = oldGodown.items;
        const newItems = newGodown.items;
        const oldIndex = oldItems.findIndex(i => i.item_id === item.item_id);
        const newItem = oldItems.splice(oldIndex, 1);
        newItems.push(newItem);
        await oldGodown.save();
        await newGodown.save();
    } catch (error) {
        console.error('Error moving item:', error);
    }
}

async function buildTree(godowns) {
    const map = new Map();
    const roots = [];

    try {
        for (const godown of godowns) {
            map.set(godown.id, { 
                ...godown,
                children: []
            });
        }

        for (const godown of godowns) {
            const currentGodown = map.get(godown.id);
            if (godown.parent_godown === null) {
                roots.push(currentGodown);
            } else {
                const parent = map.get(godown.parent_godown);
                if (parent) {
                    parent.children.push(currentGodown);
                }
            }
        }

        return roots; // Return the root nodes of the tree
    } catch (error) {
        console.error('Error building the tree:', error);
        return []; // Return an empty array in case of an error
    }
}

async function combine(godowns, items){
    try{
        const godownStock = [];
        godowns.forEach(g => {
            const stock = {
                id: g.id,
                items: [],
                name: g.name,
                parent_godown: g.parent_godown
            }
            items.forEach(i => {
                if (i.godown_id === g.id) {
                    stock.items.push(i);
                }
            })
            godownStock.push(stock);
        })
        return godownStock;
    } catch (error) {
        console.error('Error combining:', error);
        return [];
    }
}

async function handleGodownStocks(req, res) {
    try{
        const g = await GodownStock.find().lean();
        const godownStock = await removeDBId(g);
        return res.json(godownStock);
    } catch (error) {
        console.error('Error getting godown stocks:', error);
        return res.json({
            message: 'Error getting godown stocks'
        });
    }
}

async function handleGodownStock(req, res){
    try{
        const id = req.body.id;
        const g = await GodownStock.find({
            godown_id: id
        }).lean();
        const godownStock = await removeDBId(g);
        return res.json(godownStock[0].items);
    } catch (error) {
        console.error('Error getting godown stock:', error);
        return res.json({
            message: 'Error getting godown stock'
        });
    }
}

async function handleMoveItem(req, res) {
    try{
        const id = req.body.id;
        const newGodownId = req.body.newGodownId;
        const item = await Item.findOne({ item_id: id });
        const oldGodownId = item.godown_id;
        item.godown_id = newGodownId;
        await item.save();
        await moveitem(item, oldGodownId, newGodownId);
        return res.json({
            message: 'Item moved successfully'
        });
    } catch (error) {
        console.error('Error moving item:', error);
        return res.json({
            message: 'Error moving item'
        });
    }
}

async function handleModifyStock(req, res) {
    try{
        const id = req.body.id;
        const quantity = req.body.quantity;
        await modifyStock(res, id, quantity);
    } catch (error) {
        console.error('Error modifying stock:', error);
        return res.json({
            message: 'Error modifying stock'
        });
    }
}

async function handleCombine(req, res) {
    try{
        const g = await Godown.find().lean();
        const i = await Item.find().lean();
        const godownStock = await combine(g, i);
        const tree = await buildTree(godownStock);
        // return res.json(godownStock);
        await Combine.deleteMany({});
        await Combine.insertMany(tree);
        return res.json(tree);
    } catch (error) {
        console.error('Error updating db:', error);
        return res.json({
            message: 'Error updating db'
        });
    }
}

module.exports = {handleGodownStocks, handleGodownStock, handleMoveItem, handleModifyStock, handleCombine};