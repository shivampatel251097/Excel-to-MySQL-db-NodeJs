const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

let stream = fs.createReadStream("2015_16_Districtwise.csv");
let myData = [];
let csvStream = csv
    .parse()
    .on("data", function (data) {
        myData.push(data);
    })
    .on("end", function () {
		myData.shift();
		
		// create a new connection to the database
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'admin',
			password: '123456789',
			database: 'YourDBName'
		});

        // open the connection
		connection.connect((error) => {
			if (error) {
				console.error(error);
			} else {
				let monthyear='Jan 2020';
				let query = 'INSERT INTO table_name (brand, product_area,month_year=monthyear, business_field,vib,forecast) VALUES ?';
				connection.query(query, [myData], (error, response) => {
					console.log(error || response);
				});
			}
		});
   	});

stream.pipe(csvStream);