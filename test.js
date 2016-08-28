/**
 * Created by prashant on 8/16/2016.
 */
var con=require('./routes/connection');
var http=require('http');
var fs=require('fs');
var express=require('express');

var ser=express();
var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;

var url="mongodb://localhost:27017/epictechnolab";
ser.get('/test',function (req,res) {
    console.log("dasda");
    mongoclient.connect(url, function (err, db) {
        if(err)
            res.send(404);
        else{

            var collectinon=db.collection('portfolio');
            collectinon.find({})
                .toArray(function (err,data) {
                    if(err)
                        res.json(err);
                    else {
                        res.send(data);
                        ///var d=JSON.parse(data)
                        //res.parseJSON(d);
                    }
                });
        }
    });

});
