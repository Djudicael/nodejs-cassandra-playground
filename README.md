# nodejs-cassandra-playground

This project is a test for implementing cassandra and nodejs.

The purpuse is to use it like a poc to future projects.

this application should 

Show all users

Show  who the user follow

show the followers

show all shouts

show shout of a specific user

# Créate tables

 CREATE KEYSPACE shoutapp WITH replication = {'class': 'SimpleStrategy', 'replication_factor':3};

 DESCRIBE KEYSPACES;

 DESCRIBE KEYSPACE shoutapp;

 USE shoutapp ;

 CREATE TABLE users(username text PRIMARY KEY , password text);


 CREATE TABLE users(username text PRIMARY KEY , password text, email text, name text);

 DESCRIBE TABLE users


 CREATE TABLE following(username text PRIMARY KEY , followed text);

  CREATE TABLE followers(username text PRIMARY KEY , following text);

   CREATE TABLE shouts(shout_id uuid PRIMARY KEY , username text ,body text );

   CREATE TABLE usershouts(username text, shoout_id timeuuid ,body text, PRIMARY KEY(username , shoout_id)) ;

   CREATE TABLE shoutwall(username text, shout_id timeuuid ,posted_by text, body text, PRIMARY KEY(username , shout_id ));

   DESCRIBE TABLES;

# INSERT datas

INSERT INTO users(username, password ) VALUES ( 'toto1','tata1');

 SELECT * FROM users;



 > BEGIN BATCH
            ... INSERT INTO users(username , email , name , password ) VALUES ( 'jogo','jo@email.com', 'dodo','password1')
            ... INSERT INTO users(username , email , name , password ) VALUES ( 'attack','panic@email.com', 'panic','password2')
            ... INSERT INTO users(username , email , name , password ) VALUES ( 'apoay','moic@email.com', 'moi','password3')
            ... APPLY BATCH ;

INSERT INTO following(username , followed ) VALUES ( 'jogo','toto1');
SELECT followed FROM following  WHERE username= 'jogo';
INSERT INTO followers(username , following ) VALUES ( 'attack','apoay') ;
SELECT * FROM followers WHERE username = 'attack';

INSERT INTO shouts(shout_id , username , body ) VALUES ( now(),'jogo','coucou its me');