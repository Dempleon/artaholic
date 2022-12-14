const mongoose = require('mongoose');

// deploying 12/13/22 10:44pm
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/artaholics',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
