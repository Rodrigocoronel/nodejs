//modelos
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'rodrigo',
  password : 'Y0XpaeNsgSM5Ixn7',
  database : 'chat'

});
//module.exports = connection;

var userModel = {};

//buscar en la base de datos el usuario para sacar los amigos
userModel.getUsers = function(id,callback){
	var sql = 'SELECT * FROM amigo where usuario = '+connection.escape(id);
		connection.query(sql, function(error, rows) {
		if(error){
			throw error;
		}
		else{
			callback(null, rows);
	 	}
	});
	
}
//registar un usuario
userModel.registro = function(userData,callback){
	var sql="SELECT * from usuario where email="+connection.escape(userData.email);
	connection.query( sql, function(error1,rows2){
		var  resultado =rows2;
		if(rows2==""){
			connection.query("INSERT INTO usuario  SET ?", userData, function(error, rows) {
			if(error){
				
				throw error;
			}
			else{
				//devolvemos la última id insertada
				callback(null,{"insertId" : rows.insertId});
				//console.log(rows.insertId);
				//console.log(rows);
			}
		});
		
	}
	else{
		
		callback(null, resultado );
		//console.log(resultado.email);
	}

		//console.log(resultado);

	});
}
//verificar si existe el usuario
userModel.login = function(userData,callback){
		var sql = `SELECT email from usuario where email like '${userData.email}' and password = '${userData.password}'`;

		connection.query(sql, function(error, rows) {
		if(error){
			throw error;
		}
		else{
			callback(null,rows);
	 	}
	});

	
	
}
module.exports = userModel;