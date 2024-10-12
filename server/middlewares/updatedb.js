const {Godown, Item, Location, GodownStock} = require('../db');

async function buildTree(godowns) {
    const map = new Map();
    const roots = [];

    try {
        for (const godown of godowns) {
            map.set(godown.id, { ...godown, children: [] });
        }
        for (const godown of godowns) {
            if (godown.parent_godown === null) {
                roots.push(map.get(godown.id));
            } else {
                const parent = map.get(godown.parent_godown);
                if (parent) {
                    parent.children.push(map.get(godown.id));
                }
            }
        }
        return roots;
    } catch (error) {
        console.error('Error building the tree:', error);
        return [];
    }
}

async function PostBulkGodownStock(godown, items){
    try{
        const godownStock = [];
        godown.forEach(g => {
            const stock = {
                godown_id: g.id,
                items: []
            }
            items.forEach(i => {
                if (i.godown_id === g.id) {
                    stock.items.push(i);
                }
            })
            godownStock.push(stock);
        })
        return godownStock;
    }
    catch (error) {
        console.error('Error stocking:', error);
        return [];
    }
}

async function handleUpdateDB(req, res) {
    try{
        const g = await Godown.find().lean();
        return res.json(g);
        const tree = await buildTree(g);
        await Location.deleteMany({});
        await Location.insertMany(tree);
        return res.json({
            message: 'Data inserted successfully'
        });
    } catch (error) {
        console.error('Error updating db:', error);
        return res.json({
            message: 'Error updating db'
        });
    }
}

async function handleGodownStock(req, res) {
    try{
        const godown = await Godown.find().lean();
        const items = await Item.find().lean();
    
        const godownStock = await PostBulkGodownStock(godown, items);
    
        await GodownStock.deleteMany({});
        await GodownStock.insertMany(godownStock);
    
        return res.json({
            message: 'Data inserted successfully'
        });
    } catch (error) {
        console.error('Error updating godown stock:', error);
        return res.json({
            message: 'Error updating godown stock'
        });
    }
}

module.exports = { handleUpdateDB, handleGodownStock };