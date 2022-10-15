const mongoose = require('mongoose');
// // import .env for mongodb username password
// require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/googlebooks`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
