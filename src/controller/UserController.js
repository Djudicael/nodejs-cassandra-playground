
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


exports.getUser = async (req, res, next) => {

    const username = req.params.username;

    const getByUsername = 'SELECT * FROM users WHERE username = ?';

    const result = await client.execute(getByUsername, [username])
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });
    console.log(result.rows[0]);

    const user = {
        username: result.rows[0].username,
        email: result.rows[0].email,
        name: result.rows[0].name
    }

    return res.status(200).json(user);

};



exports.addUser = async (req, res, next) => {
    const user = req.body;

    //const username = req.params.username;

    const insertUser = 'INSERT INTO users(username , password, email, name) VALUES(?,?,?,?)';

    const result = await client.execute(insertUser, [user.username, user.password, user.email, user.name])
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });
    console.log(result);

 

    return res.status(200).json("user added");

};


exports.editUser = async (req, res, next) => {
    const user = req.body;

    //const username = req.params.username;

    const insertUser = 'INSERT INTO users(username , password, email, name) VALUES(?,?,?,?)';

    const result = await client.execute(insertUser, [user.username, user.password, user.email, user.name])
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });
    console.log(result);
    return res.status(200).json("user added");
};

exports.deleteUser = async (req, res, next) => {
    const username = req.params.username;

    const insertUser = 'DELETE FROM users WHERE username =?';

    const result = await client.execute(insertUser, [username])
        .catch((error) => {
            console.log(error);
            res.status(404).json({ "error": "oups" })
        });
    console.log(result);
    return res.status(200).json(`user ${username} was deleted`);
};