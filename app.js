const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const c = console.log;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db = pgp("postgres://minimoe@localhost:5432/alfred");


app.get('/fun',function(req,res){
	db.many(" SELECT * FROM events JOIN users ON user_id = id WHERE name = 'George Washington'").then(function(data){
		res.render('index',{
			name: data[0].name,
			title: data[0].title,
			time: data[0].time,
			description: data[0].description
			});
	});

});

app.get('/fun/:name',function(req,res){
	let name = req.params.name; 
	if(name === 'george'){
		name = 'George Washington';
	}
	if(name){
		db.many(" SELECT * FROM events JOIN users ON user_id = id WHERE name ='"+name+"'").then(function(data){
		res.render('index',{
			name: data[0].name,
			title: data[0].title,
			time: data[0].time,
			description: data[0].description
			});

	});
	}

})

app.get('/eventupdate',function(req,res){
	res.render('newevent');
})
app.post('/eventupdate',function(req,res){
		c(req.body);
		let post_data = {
			title: "'"+req.body.title.toString() + "'",
			description: "'"+req.body.description.toString()+ "'",
			time: "'"+req.body.time+ "'"
		}

		db.one('INSERT INTO events(title, description, time, user_id)'+"VALUES"+'('+post_data.title+','+post_data.description+','+post_data.time+','+1+')');
});


app.get('/create',function(req,res){
	res.render('create');
})
app.post('/create',function(req,res){
		c(req.body);
		let post_data = {
			name: "'"+req.body.name + "'",
			password: "'"+req.body.password+ "'",
			email: "'"+req.body.email+ "'"
		}

		db.one('INSERT INTO users(name, password, email)'+"VALUES"+'('+post_data.name+','+post_data.password+','+post_data.email+')');
});






app.listen(3000);


