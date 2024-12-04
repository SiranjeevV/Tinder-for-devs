const validator = require("validator");
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("enter the full name");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("invalid Email");
    }
}

module.exports = { validateSignUpData };