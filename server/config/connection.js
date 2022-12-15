const mongoose = require('mongoose');

// deploying 12/15/22 10:40
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://demp:artaholics123@cluster1.qxttopw.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
