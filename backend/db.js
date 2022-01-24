const url = require('url');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;

let cache = null;

async function connect(uri){
    if(cache){
        return cache;
    }
    const client = await mongodb.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db(url.parse(uri).pathname.substr(1))
    cache = db;
    return db;
}

module.exports = async (cols=['users']) => {
    const db = await connect(process.env.MONGO_URL || 'mongodb://localhost:27017/FavouritePokemon')
    const res = await Promise.all(cols.map(col => db.collection(col)));
    const o = Object.fromEntries(cols.map((col, idx)=>[col, res[idx]]));
    o.id = mongodb.ObjectID
    return o;
}