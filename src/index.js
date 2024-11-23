const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("hello from server");
});
app.get("/app", (req, res) => {
    res.send("hello from app");
});

app.get("/test", (req, res) => {
    res.send("hello from test");
});

app.listen(7777, () => {
    console.log("Server starts on port 7777");
});
