const mongoose = require('mongoose');

// deploying 12/13/22
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artaholics_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
