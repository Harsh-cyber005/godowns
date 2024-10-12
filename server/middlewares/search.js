const {Item} = require('../db');

async function handleAutoSearch(req, res) {
    const query = req.headers.query;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const autopipeline = [
            {
                '$search': {
                    'index': 'default',
                    'autocomplete': {
                        'query': query,
                        'path': 'name',
                        'tokenOrder': 'sequential',
                    }
                },
            },
            {
                '$project': {
                    "item_id": 1,
                    "name": 1,
                    "image_url": 1,
                }
            },
            {
                '$limit': 10
            }
        ]
        const arr = await Item.aggregate(autopipeline);

        const response = arr.map(doc => ({
            name: doc.name,
            image_url: doc.image_url,
            id: doc.item_id
        }));

        res.send(response);
    }
    catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: error.message });
    }
}

async function handleBasicSearch(req, res){
    const query = req.headers.query;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const pipelinefuzzy = [
            {
                '$search': {
                    'index': 'fuzzy',
                    'text': {
                        'query': query,
                        'path': ['name'],
                        'fuzzy': {
                            'maxEdits': 2,
                            'prefixLength': 3,
                        }
                    }
                },
            },
            {
                '$project': {
                    "item_id": 1,
                    "name": 1,
                    "image_url": 1,
                }
            },
            {
                '$limit': 1000
            }
        ]
        const arr = await Item.aggregate(pipelinefuzzy);

        const response = arr.map(doc => ({
            name: doc.name,
            image_url: doc.image_url,
            id: doc.item_id
        }));

        res.send(response);
    }
    catch {
        console.error('Error performing search:');
        res.status(500).json({ error: error.message });
    }
}

async function handleFilterSearch(req, res) {
    try {
        const body = req.body;
        let query = {};

        if (body.category && body.category.length > 0) {
            query['category'] = { $in: body.category };
        }

        if (body.priceRange && body.priceRange.length === 2) {
            query['price'] = { $gte: body.priceRange[0], $lte: body.priceRange[1] };
        }

        if (body.status && body.status.length > 0) {
            query['status'] = { $in: "in_stock" };
        }

        if (body.type && body.type.length > 0) {
            query['attributes.type'] = { $in: body.type };
        }

        if (body.material && body.material.length > 0) {
            query['attributes.material'] = { $in: body.material };
        }

        if (body.warranty_years && body.warranty_years.length > 0) {
            query['attributes.warranty_years'] = { $in: body.warranty_years };
        }

        if (body.battery_required && body.battery_required.length > 0) {
            query['battery_required'] = { $in: body.battery_required };
        }
        const items = await Item.find(query);

        res.json(items);

    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    handleAutoSearch,
    handleBasicSearch,
    handleFilterSearch
}