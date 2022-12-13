const db = require('../config/connection');
const { Art } = require('../models');
const artSeeds = require('./seed.json');

db.once('open', async() => {
    await Art.deleteMany({});
    await Art.create(artSeeds);
    console.log('this is my seed')
    process.exit(0);
})