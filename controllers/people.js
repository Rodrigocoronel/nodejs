//Controladores

var userModel = require('../models/people.js');

module.exports = function(app) {
	// GET Obtener lista de amigos
	app.get("/listaAmigos/:id", function(req,res){

		var id = req.params.id;
		if(!isNaN(id)){	
			userModel.getUsers(id,function(error, data , fiels){
			console.log(data);
			res.status(200).jsonp(data);
			
			});

	}
	});
//post registro
	app.post("/registro", function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var userData = {
			nombre : req.body.nombre,
			email : req.body.email,
			password : req.body.password
		};
		userModel.registro(userData,function(error, data){
			//si el usuario se ha insertado correctamente mostramos su info
			if(data && data.insertId )
			{
				//console.log('se ingreso correctamente');
				//res.redirect("/users/" + data.insertId);
				res.status(200).json({"msg":"Se inserto correctamente"});
				//res.json(200,{"msg":"Se inserto correctamente"});
			}
			else
			{
				res.status(200).json({"msg":"Error el Correo electronico ya se encuentra registrado"});
				//res.json(500,);
			}
		});
	});
//post login
	app.post("/login", function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var userData = {
			email : req.body.email,
			password : req.body.password
		};
		userModel.login(userData,function(error, data){
			//si el usuario se ha insertado correctamente mostramos su info
			if(data==""){
				
				//res.redirect("/chaton.php");
				//res.json(500,);
				res.status(200).jsonp({"msg":"Email o Contraseña erroneos"}); 
				
			}
			else	{
				
				res.status(200).jsonp({"msg" : "ha ingresado correctamente "}); 
			}
		});
	});
};


