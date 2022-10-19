const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:RPNtxpXOmseKJPwL@cluster0.0p0o2by.mongodb.net/googlebooks?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
