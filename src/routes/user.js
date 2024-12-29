const express = require('express');
const { userAuth } = require('../milddlewares/adminAuth')
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user");

userRouter.get('/users/request/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser,
            status: "interested",
        }).populate("fromUserId", "firstName");
        res.json({
            message: "User Requests",
            data: connectionRequest
        });
    } catch (err) {
        res.status(400).send("ERR: " + err);
    }
})

userRouter.get('/users/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const connections = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser, status: "accepted" },
            { toUserId: loggedInUser, status: "accepted" }]
        }).populate("fromUserId", "firstName")
            .populate("toUserId", "firstName");

        const datas = connections.map((data) => {
            if (data.fromUserId._id.toString() === loggedInUser.toString()) {
                return data.toUserId;
            }
            return data.fromUserId
        })
        res.json({
            message: "Connected Users",
            data: datas
        })
    }
    catch (err) {
        res.status(400).send("ERR: " + err);
    }
})
userRouter.get('/feed', userAuth, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const loggedInUser = req.user;
        const interactedUsers = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id },
            { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");
        const hiddenUsers = new Set();
        interactedUsers.forEach(element => {
            hiddenUsers.add(element.fromUserId);
            hiddenUsers.add(element.toUserId);
        });

        const feedUsers = await User.find({
            $and: [{
                _id: { $nin: Array.from(hiddenUsers) }
            },
            {
                _id: { $ne: loggedInUser._id }
            }]
        }).skip(skip).limit(limit).select('firstName lastName age gender skills')
        res.json(feedUsers);
    }
    catch (err) {
        res.status(400).send("ERR: " + err);
    }
})

module.exports = userRouter