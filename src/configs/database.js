const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {
    //returns promise mongoose connect..........................
    await mongoose.connect(process.env.DB_PASS);
  
}

module.exports = connectDB;