let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Authentication services
require("dotenv").config();
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://msci342-95a21-default-rtdb.firebaseio.com" //Paste databaseURL from firebaseConfig here
});

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// comment from here
// var cors = require('cors');
// app.use(cors());

// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

// 	if ('OPTIONS' === req.method) {
// 		res.send(200);
// 	}
// 	else {
// 		next();
// 	}
// });

// upto this point

const auth = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	if (!token)
		return res.status(403).send({ auth: false, message: "No token provided." });
	await jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
		if (err)
			return res
				.status(500)
				.send({ auth: false, message: "Failed to authenticate token." });
		// if everything good, save to request for use in other routes
		req.userID = decoded.userID;
		next();
	});
};

app.post("/login", (req, res) => {
	const token = req.body.token;
	// idToken comes from the client app
	admin
		.auth()
		.verifyIdToken(token)
		.then(function (decodedToken) {
			let uid = decodedToken.uid;
			const token = jwt.sign({ userID: uid, sub: uid }, process.env.JWT_KEY, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).send({ auth: true, token: token });

		})
		.catch(function (error) {
			// error on verification
			console.log(error);
			res.status(404).send("No user found");
		});
});

app.post('/api/loadUserDetails', auth, (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT * FROM user WHERE uid = (?)`;
	let data = [userID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addNewUser', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.user;
	let email = req.body.email;

	let sql = `INSERT INTO user (email, UID) VALUES (?,?)`;
	let data = [email, userID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/updateUser', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let phone = req.body.phone;
	// console.log(firstName);

	let sql = `UPDATE user SET firstName = (?), lastName = (?), phone = (?) WHERE UID = (?)`;
	let data = [firstName, lastName, phone, userID];
	// console.log(sql);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/loadUserSettings', auth, (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	// console.log(userID);

	let sql = `SELECT mode FROM user WHERE userID = 1`;
	// console.log(sql);
	let data = [];
	//console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getOrigin', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM stations`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/getTimes', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM timings`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/search', (req, res) => {
	let connection = mysql.createConnection(config);

	let origin_id = req.body.origin;
	let destination_id = req.body.destination;
	let val = req.body.preference;
	let time_ID = req.body.time;
	let date = req.body.date;

	// console.log(val)

	let sql = `SELECT trip_id, origin, destination,departure_time,arrival_time, TIMEDIFF(arrival_time, departure_time) AS duration,
	DATE_FORMAT(d.trip_date, '%Y-%m-%d') as trip_date, price, seats
	From 
	(SELECT a.station_name as origin, price, b.station_name as destination, (select time from sareng.timings where id=c.depart) as departure_time,
	(select time from sareng.timings where id =c.arrive) as arrival_time, c.id FROM 
	(select station_name, id from sareng.stations where id = ?) as a,
	(select station_name, id from sareng.stations where id = ?) as b,
	sareng.fedbus as c
	where origin = a.id and destination=b.id `;

	if (val == '1') {
		sql = sql + `and c.depart >= (?)`;
	} else if (val == '2') {
		sql = sql + `and c.arrive < (?)`;
	}

	sql = sql + `) aa Inner Join (Select * from sareng.trips
		where trip_date = (?)) d on d.bus_id = aa.id;`

	let data = [origin_id, destination_id, time_ID, date];

	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		// console.log(sql);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
		// console.log(string);
		connection.end();
	});
});

// app.listen(8081, () => console.log(`Listening on port ${port}`)); //for the dev version

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
