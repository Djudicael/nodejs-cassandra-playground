# nodejs-cassandra-playground

This project is a test for implementing cassandra and nodejs.

The purpuse is to use it like a poc to future projects.

this application should 

Show all users

Show  who the user follow

show the followers

show all shouts

show shout of a specific user

# Create tables

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



DELETE FROM shouts  WHERE  shout_id =  8b17f380-e0d5-11ea-aa71-6bc4ce4ed59e;



BEGIN BATCH  INSERT INTO shouts(shout_id , username , body ) VALUES ( now(),'attack','An other test') INSERT INTO usershouts(username, shoout_id ,body) VALUES ('attack',now(),'this is a test')   INSERT INTO shoutwall(username, shout_id, posted_by, body) VALUES ( 'attack', now(),'jogo','this is a test') APPLY BATCH ;

SELECT dateOf(shoout_id) , body FROM usershouts WHERE username = 'attack' AND shoout_id > minTimeuuid('2020-08-11') ORDER BY shoout_id DESC;

UPDATE users SET EMAIL='toto1@email' WHERE username ='toto1';

 UPDATE users SET name='malix' WHERE username ='toto1';

 ALTER TABLE users ADD age int;
 ALTER TABLE users DROP age ;

 cassandra@cqlsh:shoutapp> SELECT * FROM users WHERE password='password1';
InvalidRequest: Error from server: code=2200 [Invalid query] message="Cannot execute this query as it might involve data filtering and thus may have unpredictable performance. If you want to execute this query despite the performance unpredictability, use ALLOW FILTERING"
cassandra@cqlsh:shoutapp> CREATE INDEX ON users(password) ;
cassandra@cqlsh:shoutapp> SELECT * FROM users WHERE password='password1';

 username | email        | name | password
----------+--------------+------+-----------
     jogo | jo@email.com | dodo | password1