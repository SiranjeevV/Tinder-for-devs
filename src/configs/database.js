const mongoose = require("mongoose");

const connectDB = async () => {
    //returns promise mongoose connect..........................

    await mongoose.connect("mongodb+srv://siranjeevv:IdRhrEvJ7t5zne8b@namastenode.wo0gw.mongodb.net/devTinder");

}

module.exports = connectDB;