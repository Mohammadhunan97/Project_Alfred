const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const c = console.log;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let db = pgp("postgres://minimoe@localhost:5432/scope_db");

app.use(session({
 secret: 'ninja_turtles',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: false }
}))



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
app.get('/teams',function(req,res){
	db.many("SELECT * FROM teams").then(function(data){
		res.send(data);
	})
})
app.get('/',function(req,res){
    
	if(req.session.user){
		c('dash');
		db.one("SELECT * FROM users WHERE username ='"+req.session.user+"'").then(function(data){
			db.one("SELECT * FROM teams WHERE teamid ='"+data.r_teamid+"'").then(function(wut){
				let dashresults = {
				user: data,
				teamname: wut.teamname
				}
		 res.render('dashboard/dashboard',dashresults)
			})
			
	

		})

	}else{
		c('login');
	 res.render('create/create');
	}
})
app.post('/new1',function(req,res){
	let foo = req.body;
	db.many("SELECT * FROM users").then(function(data){
		data.forEach(function(user){
			if((user.username === foo.login_user_or_team_or_email)&&(user.userpass === foo.login_password)){
				c('authentified');
				req.session.user = foo.login_user_or_team_or_email;
					setTimeout(function(){
						res.redirect('/');
					},1000);
			}
		})
			setTimeout(function(){
				c(req.session.user + 'line 54');
			},3000);
	})

	c(req.session.user);
	


})

app.post('/new2',function(req,res){
	let foo2 = req.body;
	c(foo2);
})
app.post('/new3',function(req,res){
	let foo3 = req.body;
	c(foo3);
	//db.one("INSERT INTO users(username)VALUES($1)",[x.foobar]);
})
app.post('/dashboard',function(req,res){
	let foo4 = req.body;
	c(foo4);
	db.one("INSERT INTO posts(posttitle)VALUES($1)",[foo4.new_post]);
})

app.get('/dashboard',function(req,res){
	db.many("SELECT * FROM posts").then(function(data){
		let results = {
			title: data
		}
		res.render('dashboard/dashboard',results);
	})
})



app.listen(3000);