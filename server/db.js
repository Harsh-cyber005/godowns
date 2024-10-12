const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const db = process.env.DB;
try{
    mongoose.connect(db);
    console.log('Connected to database');
} catch (error) {
    console.error('Error connecting to database:', error);
}

const godownSchema = new Schema({
    id: String,
    name: String,
    parent_godown: String
})

const itemSchema = new Schema({
    item_id: String,
    name: String,
    quantity: Number,
    category: String,
    price: Number,
    status: String,
    godown_id: String,
    brand: String,
    attributes: Object,
    image_url: String
})

const LocationSchema = new Schema({
    id: String,
    name: String,
    parent_godown: String,
    children: Array
})

const GodownStockSchema = new Schema({
    godown_id: String,
    items: [
        {
            item_id: String,
            name: String,
            quantity: Number,
            category: String,
            price: Number,
            status: String,
            godown_id: String,
            brand: String,
            attributes: Object,
            image_url: String
        }
    ]
})

const CombineSchema = new Schema({
    godown_id: String,
    godown_name: String,
    id: String,
    name: String,
    items: [
        {
            item_id: String,
            name: String,
            quantity: Number,
            category: String,
            price: Number,
            status: String,
            godown_id: String,
            brand: String,
            attributes: Object,
            image_url: String
        }
    ],
    children: Array,
    parent_godown: String
})

const UserSchema = new Schema({
    username: {unique: true ,type: String, required: true},
    password: {type: String, required: true},
    refreshToken: {type: String},
})

const Godown = mongoose.model('godowns', godownSchema);
const Item = mongoose.model('items', itemSchema);
const Location = mongoose.model('locations', LocationSchema);
const GodownStock = mongoose.model('godownstock', GodownStockSchema);
const User = mongoose.model('user', UserSchema);
const Combine = mongoose.model('combine', CombineSchema);

module.exports = { Godown, Item, Location, GodownStock, User, Combine };