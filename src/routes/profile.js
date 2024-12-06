//finding users by their datas
const { userAuth } = require('../milddlewares/adminAuth')
const express = require("express");
const profileRouter = express.Router();

profileRouter.get('/profile/view', userAuth, async (req, res) => {
    // converting y=use to userObj .................................................
    // const user = new User();
    //finding the data (all the users) from user collection .....................................
    const user = req.user;
    res.send(user);
})

// patch api

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
 
    try {
        const allowedUpdates = ["userId", "firstName", "lastName", "skills", "password"];
        const isUpdateAllowed = Object.keys(data).every((k) => allowedUpdates.includes(k))

        if (!isUpdateAllowed) {
            res.status(401).send('update not allowed for one of the selected keys');
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
            returnDocument: "before"
        });

        res.send("user updated successfully");
    } catch (err) {
        res.send("ERR: " + err);
    }
})
module.exports = profileRouter;