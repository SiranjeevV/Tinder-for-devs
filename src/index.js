const express = require("express");

// requiring connect db func that is connected to mongoose ......................

const connectDB = require("./configs/database")

//install bcrpt and import
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");

// requiring model schema that we have created ......................................

const User = require('./models/user');

const { userAuth } = require('./milddlewares/adminAuth')
const { validateSignUpData } = require("./utils/validation")
const app = express();

// using a middle ware to convert json into
app.use(express.json());

//to read cookies from the request
app.use(cookieParser());
//posting a userobj to the mongo db ...................................

app.post('/signUp', async (req, res) => {

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

        //saving the data to user collection ..... ................................
        await user.save();

        res.send("user saved successfully");
    }
    catch (err) {
        res.status(400).send("ERR" + err);
    }
});
//login
app.post("/login", async (req, res) => {
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
        res.status(400).send("ERR" + err.message);
    }
})

//finding users by their datas
app.get('/getUser', async (req, res) => {

    // converting y=use to userObj .................................................
    // const user = new User();

    //finding the data (all the users) from user collection .....................................
    const userByFirstName = await User.find({ firstName: "Siranjeev" });

    res.send(userByFirstName);
})
//getting user feed

app.get('/feed', userAuth, async (req, res) => {

    // converting y=use to userObj .................................................
    // const user = new User();
    //finding the data (all the users) from user collection .....................................
    const listedUser = await User.find({});

    res.send(listedUser);
})

// patch api

app.patch('/setUser', userAuth, async (req, res) => {
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
        res.send("ERR" + err);
    }
})
// db should connect before app starts ...................
// so we listening to 7777 inside connect db happy section ..................

connectDB().then(() => {
    console.log('DB connected');
    // listening to the port number (7777) ....................................
    app.listen(7777, () => {
        console.log("Server starts on port 7777");
    });
}).catch(() => {
    console.log('DB not connected');
});

// Import the requires from Middleware .............................

// const { adminAuth } = require('./milddlewares/adminAuth');

// Post .................

// app.post("/", (req, res) => {
//     res.send("hello from server");
// });

//LOCALHOST:7777/app/101 ...................................... paramsss

// app.get("/app/:userId", (req, res) => {
//     console.log(req.params);  // {userId:101}
//     res.send("hello from app");
// });

//LOCALHOST:7777/app?id=101 ....................................... queryyyyyy

// app.get("/app", (req, res) => {
//     console.log(req.query); // {id:101}
//     res.send("hello from app");
// });

//REGEX ..............................

//B IS OPTIONAL ..............................................

// app.use("/ab?c", (req, res) => {
//     res.send("hello from test");
// });

//CAN ADD MULTIPLE B ........................................

// app.use("/ab+c", (req, res) => {
//     res.send("hello from test");
// });

//ANYTHING BETWEEN B AND C ...................................

// app.use("/ab*cd", (req, res) => {
//     res.send("hello from test");
// });


//ANY PATHS AFTER A => A/AB/AB IT WORKS .............................

// app.use("/a/", (req, res) => {
//     res.send("hello from test");
// });

//ERROR HANDLERS AND STATUS CODES ...................................

// app.get("/admin/getAllData", (req, res) => {
//     const token = 'xyz';
//     if (token === 'xyz') {
//         res.send('Data fetched from /admin/getAllData');
//     } else {
//         res.status(401).send('Unauthorised Admin Error');
//     }
// })

//ERROR HANDLERS WITH IF CONDITION  (((Not Recommended))) ..............................
//ERROR HANDLERS WITH try catch  (((Recommended))) .................................

// app.get('/admin/getAllData', (err, req, res) => {
//     if (err) {
//         res.status(401).send('Unauthorised Admin Error');
//     }
//     res.send("User Data sent");
// })

//MIDDLEWARES ................................................

//adminAuth imported from middleware folder .........................

//adminAuth contains logic of authentication ........................

// app.use("/admin", adminAuth);

// app.get('/admin/getAllData', (req, res) => {
//     res.send("Data Admin Sent !!!!!");
// })


