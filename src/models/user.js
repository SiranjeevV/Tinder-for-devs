const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// schema is a structure of the db object 
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        //unique means duplicates not allowed the email should be unique
        unique: true,
        //required means the field or value must be filled or should be given
        required: true,
    },
    password: {
        type: String,
        //trim means it will remove unwanted spaces and gaps in the value
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("invalid PWD");
            }
        }
    },
    age: {
        type: Number,
        // minimum value should be 18 or more
        min: 18
    },
    gender: {
        type: String,
        
        //default value will be the value below
        default: "Male",
    },
    skills: {
        //[String] means array of string
        type: [String]
    },
    // {
    //     timestamps: true
    // }
}
    ,
    {
        timestamps: true
    });

// naming the above model as user inside the devtinder db


//schema methods

// token get jwt
userSchema.methods.getJwt = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id }, "key@2024");

    return token;
}

//password validation
userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = bcrypt.compare(password, passwordHash);

    return isPasswordValid;
}
const User = mongoose.model("User", userSchema);

module.exports = User;