const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "ip_form",
  password: "1234567890",
  database: "ip_form",
});

db.connect((err) => {
  if (err) {
    console.log(`Error happen in connection ${err}`);
    return;
  }
  console.log(`Database Successfuly connect`);
});

app.get("/", (req, res) => {
  res.send("Wellcome to this form");
});

app.get("/create-table", (req, res) => {
  const form = `CREATE TABLE IF NOT EXISTS Form (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Gender VARCHAR(255) NOT NULL,
        Age INT(11) NOT NULL,
        Email VARCHAR(255) NOT NULL
    )`;

  db.query(form, (error, results, fields) => {
    if (error) {
      console.log(`Error happen in create table ${error}`);
      return;
    }
  });

  res.send("Table Created Successfully");
});

app.post("/insert-info", (req, res) => {
  const { name, gender, age, email } = req.body;
  // console.log(req.body)

  const insertInfo = `INSERT INTO Form (Name, Gender, Age, Email) VALUES (?, ?, ?, ?)`;

  db.query(insertInfo, [name, gender, age, email], (error, results, fields) => {
    if (error) {
      console.log(`Error happen in inserting table ${error}`);
      return;
    }
  });

  res.send("Data Successefully Submited!");
  console.log("Data Successefully Submited!");
});

app.get("/user-info", (req, res) => {
    const select = `SELECT * FROM Form`;

    db.query(select, (error, results, fields) => {
        if(error) {
            console.log(`Error happen in selecion ${error}`);
            return;
        }

        res.send(results);
    })
})

app.listen(1811, () => {
  console.log(`Running on post http://localhost:1811`);
});
