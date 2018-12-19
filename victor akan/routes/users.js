var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
require('express-session');

 const saltRounds = 10;
 const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contact_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

 let Schema = mongoose.Schema;

let modelSchema = new Schema({
	name: String, 
	email: String, 
	phone: String,
	password: String
});

//create model
let userModel = mongoose.model('userModel', modelSchema);



router.post('/signup', function(req, res, next) {
	let password =req.body.password;
	var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
		let createUsers = new userModel({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		password: hash
		 });
	createUsers.save(function (err,result) {
		if (err) return handleError(err);
  		res.status(200).send(result);
  	});
});





router.post('/login', function(req, res, next) {
  //res.send('respond with a resource');
  let email = req.body.email;
  userModel.find({email:email},( function(err,result){
  	 let password =req.body.password;
		if(result == false){
			res.send('User does not exist!');	
		}else{
			password = bcrypt.compareSync(req.body.password, result[0].password);
			//console.log(password);
			if(password){
				res.send(result);
			}else{
					res.send('Password does not match!');
			}
			
		}
	}));
});







router.delete('/', function(req, res, next) {
	userModel.remove({_id:req.body.id}, function(err,result){
		if(err)
			res.send(err);
		res.send('Post deleted successfully!');
	});
});

// For authorization
/*router.get('/welcome', function(req, res, next) {
		if (!!req.session.user)  {
          return res.status(401).send();
		}

		// console.log(result);
  		return.res.send(result);
	
    });*/

module.exports = router;
