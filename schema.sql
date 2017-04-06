-- createdb alfred
-- psql -d alfred -f schema.sql
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(20),
password VARCHAR(20),
email VARCHAR(40)
);

CREATE TABLE events(
event_id SERIAL PRIMARY KEY,
title VARCHAR(20),
description TEXT,
time VARCHAR(10),
user_id INT, FOREIGN KEY(user_id) references users(id)
);

--sample data
INSERT INTO users (name,password,email) VALUES ('George Washington','foobar','mohammad.chughtai@gmail.com');
INSERT INTO users (name,password,email) VALUES ('Tom Washington','foobar','mohammad.chughtai@gmail.com');
INSERT INTO events(title, description, time, user_id)VALUES('oobar','foobar','3:00pm',1);
INSERT INTO events (title, description, time, user_id) VALUES ('foo event 2', 'something more interesting foobar', '5:00pm', 2); 
