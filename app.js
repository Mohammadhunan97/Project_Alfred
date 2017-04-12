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
		db.one("SELECT * FROM users WHERE username ='"+req.session.user+"'").then(function(data){
			db.one("SELECT * FROM teams WHERE teamid ='"+data.r_teamid+"'").then(function(wut){
				let dashresults = {
				user: data,
				teamname: wut.teamname,
				teamid: data.r_teamid
				}
			 res.render('dashboard/dashboard',dashresults)
			})
		})
	}else{
	 	res.render('create/create');
	}
})

//Delete posts:
app.post('/del',function(req,res){
	c(req.body);
	let postid = Number(req.body.postid);
	c(postid);
	db.none("DELETE FROM posts WHERE postid = '" + postid + "'");
})




// ****************LOGIN *********
app.post('/new1',function(req,res){
	let foo = req.body;
	db.many("SELECT * FROM users").then(function(data){
		 data.forEach(function(user){
		 	if((user.username === foo.login_user_or_team_or_email)&&(user.userpass === foo.login_password)){
		 		req.session.user = foo.login_user_or_team_or_email;
		 			app.get('/user/:id',function(req,res){
						let id = req.params.id;
						c(req.session.user);
						let obj = {
							name: id
						}

						res.render('profile/profile',obj);
						})
		 				app.post("/update",function(req,res){
						c(req.body);
						db.one(`UPDATE users SET username = '${req.body.name}' WHERE username = '${req.session.user}'`);
						})
		 			setTimeout(function(){
		 				res.redirect('/');
		 			},1000);
		 		}
		 }) //end of data.foreach
	}) //end of db.many
}) // end of app.post
//update user:







// ****************LOGIN ^^^ ********* //
app.post('/new2',function(req,res){
	let foo2 = req.body;
	c(foo2);
	db.one(`INSERT INTO TEAMS(teamname,teamemail,teampass,teamkey)VALUES('${foo2.create_teamname_team}','${foo2.create_teamname}','${foo2.create_teampass}','${foo2.teamkey}')`);

})
app.post('/new3',function(req,res){
	let foo3 = req.body;
	c(foo3 );
	c('foo3');
	db.any(`SELECT teamid FROM teams WHERE teamname = '${foo3.create_teamname_user}'`).then(function(result){
		var team = result[0].teamid;
		c(team);
		 db.one(`INSERT INTO users(username,useremail,userpass,r_teamid)VALUES('${foo3.create_username}','${foo3.user_email}','${foo3.user_pass}',${team})`);
	})

	
})

//inside dashboard:: \/
app.post('/dashboard',function(req,res){
	let foo4 = req.body;
	// db.one("INSERT INTO posts(posttitle,r_teamid)VALUES($1,$3)",[foo4.new_post][foo4.team]);
	db.one(`INSERT INTO posts(posttitle,postdescription,r_teamid)VALUES('${foo4.new_post}','${foo4.descrip}',${foo4.team})`);
})

app.listen(4000);