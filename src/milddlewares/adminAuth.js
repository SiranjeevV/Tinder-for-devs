const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    // Example Auth Logic .........................
    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        res.status(404).send('Token not Found');
    }
    const decodedToken = jwt.verify(token, "key@2024")
    const { _id } = decodedToken;
    const user = await User.findById(_id);

    if (!user) {
        throw new Error("no users found")
    }
    // storing user to with the api req
    req.user = user;
    next();

}

// EXPORTING ADMINAUTH ..................................
module.exports = { userAuth };  