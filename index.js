const express = require('express');
const app = express();
const dotenv = require('dotenv');
var bodyParser = require("body-parser");
dotenv.config();

const con = require('./data/db');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.redirect("index.html")
})

app.post("/create", (req, res) => {

    const ToDo_Name = req.body.ToDo_Name;
    const Description = req.body.Description;

    try {

        con.query("INSERT INTO `todolist` (ToDo_Name,Description)  VALUES(?,?)", [ToDo_Name, Description], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/data')
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});

app.get("/data", (req, res) => {
    con.query("select * from `todolist`", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("read.ejs", { rows });
        }
    })
})

app.get("/delete-data", (req, res) => {
    con.query("DELETE FROM `todolist` WHERE id=?", [req.query.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/data")
        }
    })
})



app.listen(3000);