const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-sessions');
const c = console.log;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret:"any string",
saveUninitialized: true,
resave: true
}));
let db = pgp("postgres://minimoe@localhost:5432/scope_db");
app.get('/',function(req,res){
	c(req.cookies);
})
app.get('/posts',function(req,res){
	db.many("SELECT * FROM posts").then(function(data){
			res.send(data);
	})
})
app.get('/users',function(req,res){
	db.many("SELECT * FROM users").then(function(data){
			res.send(data);
	})

})

app.get('/forums',function(req,res){
	db.many("SELECT * FROM forums").then(function(data){
			res.send(data);
	})
})

app.get('/teams',function(req,res){
	db.many("SELECT * FROM teams").then(function(data){
			c(data);
			res.send(data);
	})
})

app.get('/create',function(req,res){
	res.render('createteam');
})
app.post('/create',function(req,res){
	let foo = req.body;
	 c(foo);
	db.one(`INSERT INTO teams(teamname,teamemail,teampass,teamkey)VALUES
		('${foo.teamname}','${foo.teamemail}','${foo.teampass}','${foo.teamkey}')`)
})
app.get('/login',function(req,res){
	res.render('loginuser');
})

app.post('/login',function(req,res){
	let foo = req.body;
	db.many("SELECT * FROM users").then(function(data){

		data.forEach(function(user){
			// c(user);
			user.userpass === foo.userpass && foo.username === user.username? c(user.username) : c('no matches');
		});
	})
})


app.listen(3000);