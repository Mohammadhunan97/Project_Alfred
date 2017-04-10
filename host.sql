-- pwd are text to allow for increased security
--createdb scope_db
-- r_columnname refers to a reference column to another
-- pr_columnname refers to a pseudo reference to a column in another table that is not really checked on the sql side, but checked on the javascript side for authentification when creating accounts (users need a teamkey when creating accounts associated with private teams)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE teams(
teamid SERIAL PRIMARY KEY,
teamname VARCHAR(20) NOT NULL,
teamemail VARCHAR(25) NOT NULL,
teampass TEXT NOT NULL,
teamdescription TEXT,
teamkey TEXT 
);

CREATE TABLE users(
userid SERIAL PRIMARY KEY,
username VARCHAR(20) NOT NULL,
useremail VARCHAR(25) NOT NULL,
userpass TEXT NOT NULL,
usertitle VARCHAR(25),
userdescription TEXT,
userimage TEXT,
r_teamid INTEGER, FOREIGN KEY (r_teamid) references teams(teamid)  
);

CREATE TABLE posts(
postid SERIAL PRIMARY KEY,
posttitle VARCHAR(50),
postdescription TEXT,
posttags TEXT,
comments TEXT,
r_teamid INTEGER, FOREIGN KEY (r_teamid) references teams(teamid),
r_userid INTEGER, FOREIGN KEY (r_userid) references users(userid)
);
