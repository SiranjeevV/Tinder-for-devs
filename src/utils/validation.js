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

const validateLoginFields = (req) => {
    const allowedFields = [
        firstName,
        lastName,
        emailId,
        gender,
        age,
        skills
    ];

    const allowValidateFields = Object.keys(req.body).every((field) => {
        allowedFields.includes(field);
    })

    return allowValidateFields;

}

module.exports = { validateSignUpData, validateLoginFields };