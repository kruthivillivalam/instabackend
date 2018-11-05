var express = require('express');

console.log("Hereeee")
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
let db;
const url ="mongodb://kruthi:Hope1993@ds255930.mlab.com:55930/userslist";
   MongoClient.connect(url, function(err,client){
        if(err){
            console.log("Error connecting to DB"+err)
        }
        else{
            db = client.db("userslist");
        }
    })
router.get('/',function(req,res){
    console.log("DB"+db)
});

module.exports = router;