var express = require('express');
var router = express.Router();

//connect to db
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contact_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema;

let contactModelSchema = new Schema({
	name: String, 
	phone: String, 
	email: String
});

//declare contacModel
let contactModel = mongoose.model('contactModel', contactModelSchema);

//create field types
let contact = new Schema({
	name:{ 
		type: String
	}, 
	phone:{
		type: String
	}, 
	email:{
		type: String
	},
	updated:{ 
		type: Date, default: Date.now
	}
});

// creating a contact
router.post('/', function(req, res, next) {
	let addContact= new contactModel({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email
	});
	
	addContact.save(function (err, result) {
		if (err) return handleError(err);
		res.status(200).send(result);
	})


});

// Seeing all contacts in the db
router.get('/', function(req, res, next) {
	contactModel.find(( function(err,result){
		if (err) throw err; 
		// console.log(result);
  		res.send(result);
	}));

    });

// Seeing a contact
router.get('/:id', function(req, res, next) {
	let id = req.params.id;
	contactModel.findById(id,( function(err,result){
		if (err) throw err; 
		// console.log(result);
  		res.send(result);
	}));


});

// Editing a contact
router.put('/:id', function(req, res, next) {
	let myquery = req.params.id ;
	contactModel.findOneAndUpdate({_id:myquery},req.body,{new:true}, function(err,result){
		if(err)
			res.send(err);
		res.send('Update Successful');
	});
});

// Deleting a contact
router.delete('/', function(req, res, next) {
	contactModel.remove({_id:req.body.id}, function(err,result){
		if(err)
			res.send(err);
		res.send('Post deleted successfully!');
	});
});



module.exports = router;
