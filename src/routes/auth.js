const express = require("express");
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt");
const User = require('../models/user');

const authRouter = express.Router();

//SignUp
authRouter.post('/signUp', async (req, res) => {
    try {
        //validating the details
        validateSignUpData(req);
        //Encrypt your password
        const { password, firstName, lastName, emailId, age, skills, gender } = req.body;
        // encrypting password
        const pwdHash = await bcrypt.hash(password, 10);

        //creating a demo data .............................................

        // const userObj = req.body;

        // converting y=use to userObj .................................................
        const user = new User({
            firstName,
            lastName,
            age,
            skills,
            emailId,
            gender,
            password: pwdHash
        });

        //saving the data to user collection .....................................
        await user.save();

        res.send("user saved successfully");
    }
    catch (err) {
        res.status(400).send("ERR: " + err);
    }
});

//login
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        // password comparing
        const isPasswordValid = await user.validatePassword(password);
        //
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials")
        } else {
            //to create new token with the key
            const token = await user.getJwt();
            // setting the cookie with key 
            res.cookie("token", token);

            res.send("Logged in Successfully")
        }
    }
    catch (err) {
        res.status(400).send("ERR: " + err.message);
    }
})

module.exports = authRouter;