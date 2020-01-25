const mysql = require('mysql');
const express = require('express');
// Import the library:
var cors = require('cors');
var app = express();
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));
app.use(cors());
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Am@r8106',
    database: 'startup',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DataBase connection is done.');
    else
        console.log('DB connection was  failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(1111, () => console.log('Express server is runnig at port no : 3000'));


//Get all employees
app.get('/startupcompanies', (req, res) => {
    mysqlConnection.query('SELECT * FROM startupcompanies', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/startupcompanies/idstartupcompanies:', (req, res) => {
    mysqlConnection.query('SELECT * FROM startupcompanies WHERE idstartupcompanies= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
//Insert an employees
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO startupcompanies (idstartupcompanies, Names,country)VALUES (emp.idstartupcompanies,emp.names,emp.country);";
    mysqlConnection.query(sql, [emp.idstartupcompanies, emp.Name, emp.country], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

