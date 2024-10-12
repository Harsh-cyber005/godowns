const {Godown, Item} = require('../db');

async function findItemLocation(godownId, godowns) {
    try{
        const path = [];
        let currentId = godownId;
        const parentMap = new Map();
        godowns.forEach(godown => {
            parentMap.set(godown.id, godown.parent_godown);
        });
        while (currentId) {
            const currentGodown = godowns.find(g => g.id === currentId);
            if (currentGodown) {
                path.push({ id: currentGodown.id, name: currentGodown.name });
            }
            currentId = parentMap.get(currentId);
        }
        return path;
    } catch (error) {
        console.error('Error finding item location:', error);
        return [];
    }
}

async function handleFindItem(req, res) {
    try{
        const id = req.headers.id;
        const item = await Item.findOne({ item_id: id });
        const finalLocation = [];
        finalLocation.push(item);
        const Godowns = await Godown.find().lean();
        const location = await findItemLocation(item.godown_id, Godowns);
        finalLocation.push(location);
        return res.json(finalLocation);
    } catch (error) {
        console.error('Error finding item:', error);
        return res.json({
            message: 'Error finding item'
        });
    }
}

module.exports = {handleFindItem};