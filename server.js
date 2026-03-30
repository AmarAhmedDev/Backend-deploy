const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "student_form",
    password: "12345678",
    database: "student_form"
});

connection.connect((error) => {
    if(error) {
        console.log(`Error Happen In Connection ${error.message}`);
        return;
    }

    const createTable = `CREATE TABLE IF NOT EXISTS Form (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255),
        Email VARCHAR(255),
        Student_ID VARCHAR(255),
        Phone INT(10),
        Age INT(10),
        Department VARCHAR(255)
    )`;

    connection.query(createTable, (error, results, fields) => {
        if(error) {
            console.log(`Error Happen in Create Table ${error.message}`);
            return;
        }
        console.log(`Table Created Successfuly`)
    });
});

app.get("/", (req, res) => {
    res.send("Welcome To Student Form API");
});

app.post("/insert-student", (req, res) => {
    const { name, email, ids, phone, age, department } = req.body;

    const insertStudent = `INSERT INTO Form (Name, Email, Student_ID, Phone, Age, Department) VALUES(?, ?, ?, ?, ?, ?)`;

    connection.query(insertStudent, [ name, email, ids, phone, age, department ], (error, results, fields) => {
        if(error) {
            console.log(`Error Happen In Inserting Info ${error}`);
            return;
        }
        console.log(`Data Inserted Successfully`);
    });
});

app.listen(2930, () => console.log(`Up Running On http://localhost:2930/`))