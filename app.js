const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const c = console.log;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'shoebill';

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
		db.any("SELECT * FROM users WHERE username ='"+req.session.user+"'").then(function(data){
			db.any("SELECT * FROM teams WHERE teamid ='"+data.r_teamid+"'").then(function(wut){
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
	// db.none("DELETE FROM posts WHERE postid = '" + postid + "'");
	c("DELETE FROM posts WHERE postid = $1;",[postid]);
	db.none("DELETE FROM posts WHERE postid = $1;",[postid]);
})




// ****************LOGIN *********
app.post('/new1',function(req,res){
	let foo = req.body;
	c(foo);
	db.many("SELECT * FROM users").then(function(data){
		 data.forEach(function(user){
		 	c(bcrypt.compareSync(foo.login_password, user.userpass));

		 	if((user.username === foo.login_user_or_team_or_email)&&(bcrypt.compareSync(foo.login_password,user.userpass))){
		 			c('user true');
		 			c(bcrypt.compareSync(foo.login_password, user.userpass));
		 		//c(bcrypt.compareSync(foo.login_password, user.userpass));


		 		req.session.user = foo.login_user_or_team_or_email;
		 		c(req.session.user);

		 		register(req.session.user);
		 		res.redirect("/dash");
		 			setTimeout(function(){
		 				//res.redirect("/users");
		 			},1000);


		 			 app.get('/user/:id',function(req,res){
						 let id = req.params.id;
						
						 let obj = {
						 	name: id
						 }

						 res.render('profile/profile',obj);
						 })
		 			 	app.post("/update",function(req,res){
						// c(req.body);
						 res.redirect("/user/"+req.body.name);
						 c(req.session.user);
						 c(req.body.name);
						 db.none(`UPDATE users SET username = $1 WHERE username = '${req.session.user}'`,[req.body.name]);
						  c(req.session.user);
						 c(req.body.name);
						// })
		 			 });

		 			 // setTimeout(function(){
		 			 // 	c('foh baz');
		 			 // 	app.get("/",function(req,res){
		 			 // 		res.render('dashboard/dashboard');
		 			 // 	})
		 			 // },1000);
		 		}
		 }) //end of data.foreach
	}) //end of db.many
}) // end of app.post
//update user:
function register(a){
	c(a); c('data data data');
	app.get("/dash",function(req,res){
		db.any(`SELECT * FROM users WHERE username = '${a}'`).then(function(data){
			// c(data);
			db.any(`SELECT * FROM teams WHERE teamid = ${data[0].r_teamid}`).then(function(team){
				let nums = {
				username: data[0].username,
				teamid: data[0].r_teamid, 
				 teamname: team[0].teamname
			}
			res.render('dashboard/dashboard',nums)
			})
		
			
		})
	})
}




// ****************LOGIN ^^^ ********* //
app.post('/new2',function(req,res){
	let foo2 = req.body;
	c(foo2);
bcrypt.hash(foo2.create_teampass, saltRounds, function(err, hash) {
  db.none('INSERT INTO teams (teamname,teamemail,teampass,teamkey) VALUES ($1,$2,$3,$4)',[foo2.create_teamname_team,foo2.create_teamname,hash,foo2.teamkey]);
});




			// ${foo2.create_teamname_team}','${foo2.create_teamname}','${foo2.create_teampass}','${foo2.teamkey}')`);

})
app.post('/new3',function(req,res){
	let foo3 = req.body;
	c(foo3 );
	c('foo3');
// bcrypt.hash(foo2.create_teampass, saltRounds, function(err, hash) {
//   db.none('INSERT INTO teams (teamname,teamemail,teampass,teamkey) VALUES ($1,$2,$3,$4)',[foo2.create_teamname_team,foo2.create_teamname,hash,foo2.teamkey]);
// });

bcrypt.hash(foo3.user_pass,saltRounds, function(err, hash) {
	db.any(`SELECT teamid FROM teams WHERE teamname = $1`,[foo3.create_teamname_user]).then(function(result){
		c('test');
		c(result);
		var team = result[0].teamid;
	
		c(team);

		 // db.one(`INSERT INTO users(username,useremail,userpass,r_teamid)VALUES('${foo3.create_username}','${foo3.user_email}','${foo3.user_pass}',${team})`);
		  db.none("INSERT INTO users(username,useremail,userpass,r_teamid) VALUES ($1,$2,$3,$4)",[foo3.create_username,foo3.user_email,hash,result[0].teamid]);
	})
});
	
})

//inside dashboard:: \/
app.post('/dashboard',function(req,res){
	let foo4 = req.body;
	db.any("INSERT INTO posts(posttitle,postdescription,r_teamid)VALUES($1,$2,$3);",[foo4.new_post,foo4.descrip,foo4.team]).then(function(){
		 res.redirect('/dashboard');
	})

})

app.listen(4000);