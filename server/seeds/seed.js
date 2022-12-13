const db = require('../config/connection');
const { Art, Category } = require('../models');
const artSeeds = require('./seed.json');
const categorySeeds = require('./categorySeeds.json');

db.once('open', async() => {
    await Art.deleteMany({});
    await Art.create(artSeeds);
    await Category.deleteMany({});
    await Category.create(categorySeeds);
    console.log('this is my seed')
    process.exit(0);
})