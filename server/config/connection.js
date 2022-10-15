const mongoose = require('mongoose');
// import .env for mongodb username password
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.0p0o2by.mongodb.net/googlebooks?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
