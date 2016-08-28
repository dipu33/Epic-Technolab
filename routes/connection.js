/**
 * Created by prashant on 8/13/2016.
 */
var mongodb=require('mongodb');

function connector(){
    var mongoclient=mongodb.MongoClient;
    var url="mongodb://localhost:27017/epictechnolab";

    mongoclient.connect(url, function (err, db) {
        if (err)
            console.log(err)
        else

            console.log("connect successfull");
            return db;
    });
}

module.exports.connector=connector;