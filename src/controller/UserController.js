
const UserService = require('../service/UserService');
const { client } = require('../config/db/cassandra');

//const userService = new UserService();

exports.getUsers = async (req, res, next) => {


    // the key space "shoutapp" is already in cassandra config file
    const getAllUsers = 'SELECT * FROM users';

    //const getAllUsers = 'SELECT * FROM shoutapp.users' ;

    const result = await client.execute(getAllUsers, [])
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });
    console.log(result.rows);

    return res.status(200).json(result.rows);

};