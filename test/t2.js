const MongoDB = require('@brickyang/easy-mongodb').default;
const config = {
  host: '127.0.0.1',
  port: '27017',
  name: 'test'
};
const mongo = new MongoDB(config);

// connection
mongo
  .connect()
  .then(client => {
    // `client` is instance of connected MongoClient
  })
  .catch(error => {
    // handle error
  });

// or

mongo.on('connect', () => {
  console.log('connect');
  // do something
});

mongo.on('error', error => {
  // handle error
});
let doc = {name:'tom'}
let options = null
// insert one doc
const args = { doc, options };
mongo.insertOne('collection', args);
