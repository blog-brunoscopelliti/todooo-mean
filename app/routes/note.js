var mongoose = require('mongoose'),
	noteSchema = require('../schemas/note-schema');

var Schema = mongoose.Schema;

var noteschema = new Schema(noteSchema);
var Note = mongoose.model('Note', noteschema);


mongoose.connect('mongodb://localhost/todooo');
mongoose.connection.on('error', function() {
	console.log('moongoose connection error.');
});


exports.findAll = function(req, res) {

	Note.find({}, function(err, data) {

		var result = [];

		if (err) {
			console.log("An error occured", err);
		}
		else {
			result = data;
		}

		res.send(data);

	});

};

exports.createNew = function(req, res) {

	var newNote = new Note({ note: req.body.note, isChecked: false, signedDate: new Date(), completedDate: null });
	
	newNote.save(function (err, data) {
		
		var result = {};

		if (err) {
			console.log("An error occured", err);
			result.status = false;
		}
		else {
			result = { "status": true, "id": data.id };
		}

		var json = JSON.stringify(result);

		res.send(json);

	});

};

exports.updateNote = function(req, res) {

	var isChecked = req.body.isChecked;
	var newDate = isChecked ? new Date() : null;

	var result = {};

	Note.findOneAndUpdate({_id: req.params.id}, { $set: { isChecked: isChecked, completedDate: newDate } }, function(err, data) {

		if (err) {
			console.log("An error occured", err);
			result.status = false;
		}
		else {
			result.status = true;
		}

		var json = JSON.stringify(result);

		res.send(json);

	});

};

exports.deleteNote = function(req, res) {

	Note.remove({_id: req.params.id}, function(err, data){

		var result = {};

		if (err) {
			console.log("An error occured", err);
			result.status = false;
		}
		else {
			result.status = true;
		}
		
		res.send(result);

	});

};