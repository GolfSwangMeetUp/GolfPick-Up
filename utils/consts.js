// module.exports = MONGO_URI;

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/pickUpGame-Project';

module.exports = MONGO_URI;
