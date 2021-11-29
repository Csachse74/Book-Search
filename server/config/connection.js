const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://csachse:20Simpson21@cluster0.4oepx.mongodb.net/googlebooks?retryWrites=true&w=majority', {
  useNewUrlParser: true
  , useUnifiedTopology: true
  , useCreateIndex: true
  , useFindAndModify: false
});
module.exports = mongoose.connection;
