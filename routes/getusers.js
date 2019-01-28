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
router.post('/',function(req,res){
    console.log("Res"+req.headers.user)
    console.log("Res"+req.headers.pwd)
    const collection = db.collection('getusers')
    let p = new Promise((resolve,reject) => {
        collection.find({'username':req.headers.user}).toArray(function(err,docs){
            console.log("docs"+JSON.stringify(docs))
            if(docs.length === 0){
                console.log("No user exists")
                resolve(
                    [{
                        res: "Hello",
                        user:req.headers.user,
                        pwd:req.headers.pwd
                    }]
                ) 
            }
            else{
                console.log("User already exists")
                reject("User already exists")
            }
            
        })
    })
    p.then(response => {
       console.log("Docs===="+response)
       res.send(response)

    },err => {
        console.log("Error===="+err)
    })
    
   
    //console.log("DB"+db)
});

module.exports = router;