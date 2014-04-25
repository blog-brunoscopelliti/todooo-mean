var http = require('http'),
	express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser');

var middleware = require('./middlewares'),
	note = require('./routes/note');

var app = express();


// configuration

app.set('view engine', 'jade');
app.set('views', './views');


// middleware

app.use(logger('tiny'));

app.use(express.static(__dirname + '/assets'));

app.use(bodyParser());

app.use(middleware.setHeaders([
	{ key: "Access-Control-Allow-Origin", value: "*"} 
]));


// routes

app.get('/', function(req, res) {
	res.render('index', { title: "Todooo on Node"});
});


// api

app.get('/note', note.findAll);
app.post('/note/new', note.createNew);
app.put('/note/update/:id', note.updateNote);
app.delete('/note/delete/:id', note.deleteNote);


// start the server

app.listen(3000);

console.info("Server is listening on port 3000");
