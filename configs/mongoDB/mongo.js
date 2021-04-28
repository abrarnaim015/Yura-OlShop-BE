const {MongoClient, ObjectID} = require('mongodb');
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, {useUnifiedTopology: true});

const connect = async () => await client.connect();
connect();

let db;

if (process.env.NODE_ENV === 'test') {
  db = client.db('Yura-OlShops-testing');
} else {
  db = client.db('Yura-OlShops');
}


module.exports = {
  db,
  ObjectID,
};
