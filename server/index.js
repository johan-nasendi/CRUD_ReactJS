const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM mahasiswa";
    db.query(sqlSelect, (err, tampilkan) => {
        res.send(tampilkan);
    });
});

app.post("/api/insert", (req, res) => {
    const fist_name = req.body.fist_name;
    const last_name = req.body.last_name;
    const subject = req.body.subject;
    const sqlInsert = " INSERT INTO mahasiswa (fist_name, last_name, subject) VALUES (?,?,?)";
    db.query(sqlInsert, [fist_name, last_name, subject], (err, resulf) => {
        console.log(err);
    });
});

app.delete("/api/delete/:fist_name", (req, res) => {
    const name = req.params.fist_name;
    const sqlDelete = " DELETE FROM  mahasiswa WHERE fist_name = ?";

    db.query(sqlDelete, name, (err, resulf) => {
        if (err) console.log(err);
    });
});

app.put("/api/update", (req, res) => {
    const name = req.body.fist_name;
    const last = req.body.last_name;
    const des = req.body.subject;
    const sqlUpdate = "UPDATE SET mahasiswa subject = ?, last_name = ?, WHERE fist_name = ?";

    db.query(sqlUpdate, [name, last, des], (err, resulf) => {
        if (err) console.log(err);
    });
});




app.listen(3001, () => {
    console.log("running on port 3001")
});