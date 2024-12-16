//finding users by their datas
const { userAuth } = require('../milddlewares/adminAuth')
const express = require("express");
const profileRouter = express.Router();
const validateLoginFields = require("../utils/validation")

profileRouter.get('/profile/view', userAuth, async (req, res) => {
    // converting y=use to userObj .................................................
    // const user = new User();
    //finding the data (all the users) from user collection .....................................
    try {
        const user = req.user;
         res.send(user);
    }
    catch (err) {
        res.send("ERR: " + err);
    }
})

// patch api

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {

    try {
        if (!validateLoginFields) {
            res.status(401).send('update not allowed for one of the selected keys');
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.send("user updated successfully");
    } catch (err) {
        res.send("ERR: " + err);
    }
})
module.exports = profileRouter;