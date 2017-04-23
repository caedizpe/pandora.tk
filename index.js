var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

//DB connect string
var connect = "postgres://cedp:temporal@localhost/pandora.tk";

//Assign dust engine to .dust files
app.engine('dust', cons.dust)

//Set default extension .dust
app.set('view engine', 'dust');
app.set('views',__dirname + '/views');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
	//Postgres connection
	pg.connect(connect, function(err, client, done){
		if (err){
			return console.error('Error fetching client from pool', err);
		}
		client.query('SELECT * FROM "SERVICES"', function(err, result){
			if(err){
				return console.error('Error running query', err);
			}
			res.render('index', {SERVICES: result.rows});
			done();
		});
	});
});

//Server
app.listen(3000,function(){
	console.log('Server started on port 3000');
});     			
