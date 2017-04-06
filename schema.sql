--createdb alfred_teams
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS subforums CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE teams(
team_id SERIAL,
team_name VARCHAR(20) PRIMARY KEY NOT NULL,
team_password VARCHAR(255)
);

CREATE TABLE users(
usr_id SERIAL PRIMARY KEY,
user_name VARCHAR(20) NOT NULL,
user_password VARCHAR(255) NOT NULL,
user_description TEXT,
profile_image TEXT,
ref_team_name_users VARCHAR(20), FOREIGN KEY(ref_team_name_users) references teams(team_name)
);

CREATE TABLE subforums(
subforum_id SERIAL,
subforum_name VARCHAR(20) PRIMARY KEY NOT NULL,
subforum_description TEXT,
subforum_password VARCHAR(255),
ref_team_id_subforums VARCHAR(20), FOREIGN KEY(ref_team_id_subforums) references teams(team_name)
);

CREATE TABLE posts(
post_id SERIAL PRIMARY KEY,
title VARCHAR(20),
post_description TEXT,
tags TEXT, --this is an stringed array which we are using to later retrieve the post from an archive
ref_team_id_posts VARCHAR(20), FOREIGN KEY(ref_team_id_posts) references teams(team_name),
ref_subforum_name VARCHAR(20), FOREIGN KEY(ref_subforum_name) references subforums(subforum_name)
);