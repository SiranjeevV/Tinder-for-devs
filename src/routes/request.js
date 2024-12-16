const express = require("express");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user");
const { userAuth } = require("../milddlewares/adminAuth");
const requestRouter = express.Router();

requestRouter.post('/request/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).send(" invalid status");
        }
        const toUser = await User.findById(toUserId);

        if (!toUser) {
            return res.status(400).send("to user not found");
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConnectionRequest) {
            return res.status(400).send("connection Request is already exist");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.send("request successfull")



    }
    catch (err) {
        res.status(400).send("ERR: " + err);
    }
})

module.exports = requestRouter;