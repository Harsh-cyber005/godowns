const fs = require('fs').promises;
const express = require('express');

const filters = {
    "category": new Set(),
    "price-range": {
        "min": Number.POSITIVE_INFINITY,
        "max": Number.NEGATIVE_INFINITY
    },
    "status": new Set(),
    "brand": new Set(),
    "type": new Set(),
    "material": new Set(),
    "warranty_years": new Set()
};

async function getFilters() {
    const items = JSON.parse(await fs.readFile('./items.json', 'utf8'));
    items.forEach(item => {
        filters.category.add(item.category);
        if (item.price < filters['price-range'].min) {
            filters['price-range'].min = item.price;
        }
        if (item.price > filters['price-range'].max) {
            filters['price-range'].max = item.price;
        }
        filters.status.add(item.status);
        filters.brand.add(item.brand);
        if (item.attributes?.type) {
            filters.type.add(item.attributes.type);
        }
        if (item.attributes?.material) {
            filters.material.add(item.attributes.material);
        }
        if (item.attributes?.warranty_years) {
            filters.warranty_years.add(item.attributes.warranty_years);
        }
    });
    filters.category = Array.from(filters.category);
    filters.status = Array.from(filters.status);
    filters.brand = Array.from(filters.brand);
    filters.type = Array.from(filters.type);
    filters.material = Array.from(filters.material);
    filters.warranty_years = Array.from(filters.warranty_years);
}

const app = express();

app.get('/filters', async (req, res) => {
    await getFilters();
    return res.json(filters);
})

app.listen(4000, async () => {
    console.log('listening at http://localhost:4000');
})