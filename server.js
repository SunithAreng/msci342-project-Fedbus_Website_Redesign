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


app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);
	let reviewTitle = req.body.title
	let reviewContent = req.body.content
	let reviewScore = req.body.rating
	let reviewName = req.body.name

	let sql = 'INSERT INTO reviews (user, content, title, score) VALUES (?,?,?,?)';
	// console.log(sql);
	let data = [reviewName, reviewContent, reviewTitle, reviewScore];
	// console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		// console.log(results)
		// let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});

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

app.post('/api/loadUserDetailsPayment', auth, (req, res) => {

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

app.post('/api/updateEmail', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	let email = req.body.newEmail;
	// console.log(firstName);

	let sql = `UPDATE user SET email = (?) WHERE UID = (?)`;
	let data = [email, userID];
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
app.post('/api/updateSeats', (req, res) => {

	let connection = mysql.createConnection(config);
	let trip_id = req.body.trip_id;
	let seats = req.body.seats;
	let trip_id2 = req.body.trip_id2;
	let seats2 = req.body.seats2;

	let sql, data;
	if (trip_id2 && seats2) {
		sql = `
		INSERT INTO trips(trip_id, seats)
			VALUES
				(?,?),
				(?,?)
			ON DUPLICATE KEY UPDATE
				seats = VALUES(seats);
		`;
		data = [trip_id, seats, trip_id2, seats2];
	} else {
		sql = `UPDATE trips SET seats = (?) WHERE trip_id = (?)`;
		data = [seats, trip_id];
	}

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});
app.post('/api/addToPastTrips', (req, res) => {

	let connection = mysql.createConnection(config);
	let newPastTrips = req.body.pastTrips;
	console.log(newPastTrips)
	let userID = req.body.userID;

	let sql2 = `UPDATE user SET pastTrips = (?) WHERE UID = (?)`;
	let data = [newPastTrips, userID];

	connection.query(sql2, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});
app.post('/api/updateUserBalance', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	let balance = req.body.balance;
	// console.log(firstName);

	let sql = `UPDATE user SET balance = (?) WHERE UID = (?)`;
	let data = [balance, userID];
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

app.post('/api/getReviews', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM reviews order by id desc`;
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

app.post('/api/getRoutes', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `select id, concat((select station_name from stations b where b.id = a.origin), " to ", 
	(select station_name from stations b where b.id = a.destination)) as route, seatsCap from routes a;`;
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
app.post('/api/getPastTrips', (req, res) => {
	let connection = mysql.createConnection(config);
	let pastTrips = req.body.pastTrips;
	let sql = `
		SELECT trip_id, origin, destination, DATE_FORMAT(d.trip_date, '%Y-%m-%d') AS trip_date,
		price
		FROM 
		(SELECT
		a.station_name AS origin,
		b.station_name AS destination,
		c.price, c.id
		FROM
		(SELECT station_name, id FROM sareng.stations) AS a,
		(SELECT station_name, id FROM sareng.stations) AS b,
		sareng.routes AS c
		WHERE origin = a.id AND destination = b.id) aa
		INNER JOIN
		(SELECT a.trip_id, a.trip_date, a.bus_id
		FROM sareng.trips a WHERE trip_id = (?)) d ON d.bus_id = aa.id;
	`;
	let data = [pastTrips];

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
	let pref = req.body.pref;
	let returnDate = req.body.returnDate;

	// console.log(val)

	let sql = `SELECT trip_id, origin, destination, departure_time, arrival_time, 
			TIMEDIFF(arrival_time, departure_time) AS duration, DATE_FORMAT(d.trip_date, '%Y-%m-%d') AS trip_date, price, seats
			FROM (SELECT a.station_name AS origin, b.station_name AS destination, c.price, c.id 
			FROM (SELECT station_name, id FROM sareng.stations WHERE id = ?) AS a, 
			(SELECT station_name, id FROM sareng.stations WHERE id = ?) AS b, sareng.routes AS c 
			WHERE origin = a.id AND destination = b.id) aa 
			INNER JOIN (SELECT a.trip_id, a.seats, a.trip_date, a.bus_id, 
			(SELECT time FROM sareng.timings WHERE id = a.depart_time) AS departure_time, 
			(SELECT time FROM sareng.timings WHERE id = a.arrival_time) AS arrival_time 
			FROM sareng.trips a WHERE trip_date = (?)`;


	if (val == '1') {
		sql = sql + `and depart_time >= (?)`;
	} else if (val == '2') {
		sql = sql + `and arrival_time <= (?)`;
	}

	sql = sql + `) d ON d.bus_id = aa.id;`

	let data = [origin_id, destination_id, date, time_ID];

	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		// console.log(sql);

		if (pref == 2 && date !== returnDate) {
			let Mysql = `SELECT trip_id, origin, destination, departure_time, arrival_time, 
				TIMEDIFF(arrival_time, departure_time) AS duration, DATE_FORMAT(d.trip_date, '%Y-%m-%d') AS trip_date, price, seats
				FROM (SELECT a.station_name AS origin, b.station_name AS destination, c.price, c.id 
				FROM (SELECT station_name, id FROM sareng.stations WHERE id = ?) AS a, 
				(SELECT station_name, id FROM sareng.stations WHERE id = ?) AS b, sareng.routes AS c 
				WHERE origin = a.id AND destination = b.id) aa 
				INNER JOIN (SELECT a.trip_id, a.seats, a.trip_date, a.bus_id, 
				(SELECT time FROM sareng.timings WHERE id = a.depart_time) AS departure_time, 
				(SELECT time FROM sareng.timings WHERE id = a.arrival_time) AS arrival_time 
				FROM sareng.trips a WHERE trip_date = (?)) d ON d.bus_id = aa.id;`;

			let data1 = [destination_id, origin_id, returnDate];

			console.log(data1);

			connection.query(Mysql, data1, (error, results1, fields) => {
				if (error) {
					return console.error(error.message);
				}
				results1.map((item) => {
					results.push(item);
				})

				let string = JSON.stringify(results);
				res.send({ express: string });
				// console.log(string);
				connection.end();
			});
		} else {
			let string = JSON.stringify(results);
			res.send({ express: string });
			// console.log(string);
			connection.end();
		}
	});
});

app.post('/api/newSchedule', (req, res) => {
	let connection = mysql.createConnection(config);

	let bus_id = req.body.routeID;
	let depart_time = req.body.origin;
	let arrival_time = req.body.destination;
	let seats = req.body.seats;
	let date = req.body.date;

	let sql = `INSERT INTO sareng.trips (bus_id, depart_time, arrival_time, trip_date, seats) 
				VALUES ((?), (?), (?), (?), (?));`;

	let data = [bus_id, depart_time, arrival_time, date, seats];

	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
		connection.end();
	});
});

app.post('/api/newStation', (req, res) => {
	let connection = mysql.createConnection(config);

	let station_name = req.body.name;

	let sql = `INSERT INTO sareng.stations (station_name) 
				VALUES ((?));`;

	let data = [station_name];

	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
		connection.end();
	});
});
app.post('/api/addQuestion', (req, res) => {
	let connection = mysql.createConnection(config);

	let name = req.body.name
	let email = req.body.email
	let questions = req.body.questions

	let sql = `INSERT INTO sareng.questions (name, email, questions) 
				VALUES ((?), (?), (?));`;

	let data = [name, email, questions];
	console.log(data);


	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
		connection.end();
	});
})
app.post('/api/newRoute', (req, res) => {
	let connection = mysql.createConnection(config);

	let origin = req.body.origin;
	let destination = req.body.destination;
	let price = req.body.price;
	let seat = req.body.seat;

	let sql = `INSERT INTO sareng.routes (origin, destination, price, seatsCap) 
				VALUES ((?), (?), (?), (?));`;

	let data = [origin, destination, price, seat];

	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
		connection.end();
	});
});

app.post('/api/getAnnoucements', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM annoucements`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/newAnnoucement', (req, res) => {
	let connection = mysql.createConnection(config);

	let title = req.body.title;
	let content = req.body.content;

	if (content === '') {
		content = null;
	}

	let sql = `INSERT INTO annoucements (title, content) VALUES ((?), (?))`;
	let data = [title, content];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/deleteAnnoucement', (req, res) => {
	let connection = mysql.createConnection(config);

	let id = req.body.id;

	let sql = `DELETE FROM annoucements WHERE id = (?)`;
	let data = [id];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();

});


// app.listen(8081, () => console.log(`Listening on port ${port}`)); //for the dev version

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
