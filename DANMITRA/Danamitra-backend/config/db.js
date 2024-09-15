const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL= 'mongodb+srv://amitver6969:46sY6BCtuKL2h07I@cluster0.i5shq.mongodb.net/'
    const conn = await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
