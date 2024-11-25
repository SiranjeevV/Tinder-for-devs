const express = require("express");

const app = express();

app.post("/", (req, res) => {
    res.send("hello from server");
});

//LOCALHOST:7777/app/101

app.get("/app/:userId", (req, res) => {
    console.log(req.params);  // {userId:101}
    res.send("hello from app");
});

//LOCALHOST:7777/app?id=101

// app.get("/app", (req, res) => {
//     console.log(req.query); // {id:101}
//     res.send("hello from app");
// });

//B IS OPTIONAL
// app.use("/ab?c", (req, res) => {
//     res.send("hello from test");
// });

//CAN ADD MULTIPLE B
// app.use("/ab+c", (req, res) => {
//     res.send("hello from test");
// });

//ANYTHING BETWEEN B AND C
// app.use("/ab*cd", (req, res) => {
//     res.send("hello from test");
// });


//ANY PATHS AFTER A => A/AB/AB IS WORKS
app.use("/a/", (req, res) => {
    res.send("hello from test");
});

app.listen(7777, () => {
    console.log("Server starts on port 7777");
});
