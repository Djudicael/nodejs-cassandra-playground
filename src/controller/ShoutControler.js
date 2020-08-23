const { client } = require('../config/db/cassandra');
const cassandra = require('cassandra-driver');

exports.getShouts = async (req, res, next) => {


    // the key space "shoutapp" is already in cassandra config file
    const getAllShouts = 'SELECT * FROM shouts';

    //const getAllUsers = 'SELECT * FROM shoutapp.users' ;

    const result = await client.execute(getAllShouts, [])
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });
    console.log(result.rows);

    return res.status(200).json(result.rows);

};


exports.getUserShout = async (req, res, next) => {
    const username = req.params.username;


    // the key space "shoutapp" is already in cassandra config file
    const getUserShout = 'SELECT * FROM usershouts WHERE username = ?';

    //const getAllUsers = 'SELECT * FROM shoutapp.users' ;

    const result = await client.execute(getUserShout, [username])
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });

    console.log(result);

    return res.status(200).json(result);

};



exports.addShout = async (req, res, next) => {
    const shout = req.body;

    const id1 = cassandra.types.uuid();

    const TimeUuid = cassandra.types.TimeUuid;
    const id2 = TimeUuid.now();


    const queries = [
        {
            query: 'INSERT INTO shouts(shout_id ,username,body) VALUES(?,?,?)',
            params: [id1, shout.username, shout.body]
        },

        {
            query: 'INSERT INTO usershouts(username,shoout_id,body) VALUES(?,?,?)',
            params: [shout.username, id2, shout.body]
        },

    ];
    const queryOptions = {};


    // the key space "shoutapp" is already in cassandra config file
    const getUserShout = 'SELECT * FROM usershouts WHERE username = ?';

    //const getAllUsers = 'SELECT * FROM shoutapp.users' ;

    const result = await client.batch(queries, queryOptions)
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });



    return res.status(200).json("shout added");

};