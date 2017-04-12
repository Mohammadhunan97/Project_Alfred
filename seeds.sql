INSERT INTO teams(teamname,teamemail,teampass,teamdescription,teamkey)
VALUES(
'WDI','mohammadhunan@gmail.com','password','WDI is an immersive 12 week program designed to teach modern web development','abc123'
);
INSERT INTO teams(teamname,teamemail,teampass,teamdescription,teamkey)
VALUES(
'UXDI','mohammadhunan@gmail.com','password','UXDI is an immersive 10 week program for individuals seeking to learn user experience, design, prototyping and research','def456'
);


INSERT INTO users(username,useremail,userpass,usertitle,userdescription,r_teamid)
VALUES(
'moe.mkr',
'mohammadhunan@gmail.com',
'password',
'Web Developer',
'Web dev in nyc',
1
);


INSERT INTO users(username,useremail,userpass,usertitle,userdescription,r_teamid)
VALUES(
'foo.bar',
'mohammadhunan@gmail.com',
'password',
'Software Developer',
'software dev in sf',
2
);

INSERT INTO posts(posttitle,postdescription,posttags,r_teamid,r_userid)
VALUES(
'How do I figure out node?',
'What is node, what is npm and how do they help me with my backend',
'javascript,nodeJS',
1,
2
);


