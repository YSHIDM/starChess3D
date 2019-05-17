const MongoDB = require('@brickyang/easy-mongodb').default;
const config = {
  host: '127.0.0.1',
  port: '27017',
  name: 'test'
};

  const mongo = new MongoDB(config);
  mongo.on('connect', () => {
    console.log('connect');
  });
  mongo.connect();
  module.exports = mongo;
