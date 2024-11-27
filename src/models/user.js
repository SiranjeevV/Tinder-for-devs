const mongoose = require("mongoose");

// schema is a structure of the db object 

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: Number
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

// naming the above model as user inside the devtinder db

const User = mongoose.model("user", userSchema);

module.exports = User;