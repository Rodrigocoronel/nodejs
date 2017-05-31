/*



*/
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var methodOverride = require("method-override");
var app = express();
var sqlModel = require('./models/people.js');
var peopleControlador = require ('./controllers/people.js');
var methodOverride = require("method-override");
// Middlewares
	app.use(bodyParser.urlencoded({ extended: false })); 
	app.use(bodyParser.json()); 
	app.use(methodOverride());
	var router = express.Router();
	// Index
	router.get('/', function(req, res) { 
		res.send("Bienvenido a mi api REST, nodejs&Mysql");
	});
	
	require('./controllers/people')(app);//llama rutas de archivo people.js de cotrollers

	app.listen(3000, function() {
 		console.log("Node server running on http://localhost:3000");
	});
