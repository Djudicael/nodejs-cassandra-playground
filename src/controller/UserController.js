
const UserService = require('../service/UserService');
const {client}=require('../config/db/cassandra');

//const userService = new UserService();

exports.getUsers = async (req, res, next) => {

 const getAllUsers = 'SELECT * FROM shoutapp.users' ;

    /*const result =userService.findUser(id).catch(function (error) {
        console.error('Error saving document', error);
        return res.status(500).json(error);
    });*/

   /* client.execute(getAllUsers,[], function(err,result){
        if(err){
            return res.status(404).json({"error":"oups"});
        }
    });*/

    const result= await client.execute(getAllUsers,[] )
    .catch((error)=> {
        console.log(error);
        res.status(404).json({"error":"oups"})});
    console.log(result.rows);

    return res.status(200).json(result.rows);

};