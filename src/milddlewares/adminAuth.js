const adminAuth = (req, res, next) => {

// Example Auth Logic .........................

    const token = 'xyz';
    if (token != 'xyz') {
        res.status(401).send('Unauthorised Admin Error');
    } else {
        next();
    }
}

// EXPORTING ADMINAUTH ..................................
module.exports = { adminAuth };