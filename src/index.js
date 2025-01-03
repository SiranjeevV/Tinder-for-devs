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

const profileRouter = require("./routes/profile");
const authRouter = require("./routes/auth")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
//getting user feed
// app.get('/feed', userAuth, async (req, res) => {
//     // converting y=use to userObj .................................................
//     // const user = new User();
//     //finding the data (all the users) from user collection .....................................
//     const listedUser = await User.find({});
//     res.send(listedUser);
// })

// db should connect before app starts ...................
// so we listening to 7777 inside connect db happy section ..................

connectDB().then(() => {
    console.log('DB connected');
    // listening to the port number (7777) ....................................
    app.listen(7777, () => {
        console.log("Server starts on port 7777");
    });
}).catch((err) => {
    console.log('DB not connected: '+err);
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
