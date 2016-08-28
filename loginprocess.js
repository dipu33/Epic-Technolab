/**
 * Created by prashant on 8/4/2016.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('./node_modules/nodemailer-smtp-transport');

var con=require('./routes/connection');
var http=require('http');
var fs=require('fs');
var express=require('express');
var mail=require('./node_modules/nodemailer');
var ser=express();
  var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var server=ser.listen(8081,function () {
    ser.use(express.static(__dirname + ''));

    console.log("server is listing");
});


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
                       // console.log(data);
                        ///var d=JSON.parse(data)
                        //res.parseJSON(d);
                    }
                });
        }
    });

});




var portfolio_id;


ser.get('/portfoliodetails',function (req,res) {
    res.sendFile(__dirname + "/portfoliodetails.html");
    portfolio_id=req.query.id;
   // console.log(portfolio_id);
});

ser.get('/portfolioid',function (req,res) {
    mongoclient.connect(url, function (err, db) {
        if (err)
            console.log(err)
        else {
            var collection = db.collection('portfolio');
                console.log(portfolio_id);

            collection.find({}).toArray(function (err,data) {
            if (err)
                    console.log(err);
                else
                    var i=0;
                    while(data[i].PId!=portfolio_id)
                    {
                        i++;
                    }
                        res.send(data[i]);
                        Item_Type=data[i].Ptype;
               // console.log(data[i].Ptype);
                console.log(Item_Type);
                });
        }
    });
});

ser.get('/portfolioworks',function (req,res) {
    mongoclient.connect(url, function (err, db) {
        if (err)
            console.log(err)
        else {
            var collection = db.collection('portfolio');
            var querye = {};
            console.log(Item_Type);
            var Ptype="Ptype";
            console.log("pppp"+req.query.Item_Type);
            querye[Ptype] =req.query.Item_Type;
           // console.log(querye);
            collection.find(querye).toArray(function (err,data) {
                if(err)
                    console.log(err);
                else{
                 //   console.log(data);
                    res.send(data);

                }

            });
            }

        });
});

ser.get('/index',function (req,res) {
    res.sendFile(__dirname + "/index.html");

});


ser.get('/mobileapps',function (req,res) {
    res.sendFile(__dirname + "/mobileapps.html");

});


ser.get('/ecommerce-development',function (req,res) {
    res.sendFile(__dirname + "/ecommerce-development.html");

});


ser.get('/web-graphics-design',function (req,res) {
    res.sendFile(__dirname + "/web-graphics-design.html");

});


ser.get('/web-development',function (req,res) {
    res.sendFile(__dirname + "/web-development.html");

});


ser.get('/software-Development',function (req,res) {
    res.sendFile(__dirname + "/Software-Development.html");

});


ser.get('/digital-marketing',function (req,res) {
    res.sendFile(__dirname + "/digital-marketing.html");

});

ser.get('/portfolio',function (req,res) {

    res.sendFile(__dirname + "/portfolio.html");

});


ser.get('/services',function (req,res) {
    res.sendFile(__dirname + "/services.html");

});

ser.get('/contactus',function (req,res) {
    res.sendFile(__dirname + "/contactus.html");

});

ser.get('/blog',function (req,res) {
    res.sendFile(__dirname + "/blog.html");

});

ser.get('/aboutus2',function (req,res) {
    res.sendFile(__dirname+"/aboutus2.html");
});
ser.get('/subscribe',function (req,res) {
    var mongoclient=mongodb.MongoClient;
    console.log("yes");
    var email=req.query.email;
    console.log(email);
    var url="mongodb://localhost:27017/epictechnolab";
    mongoclient.connect(url, function (err, db) {
        if (err)
            console.log(err)
        else {
                var val1=0;
            console.log("dipak makvana")
            var collection = db.collection('subscribeduser');
          //  console.log(email);
            collection.find({"email":email}).toArray(function (err,dt) {
                console.log("in");
                if (err) {
                    console.log(err);
                }
                else {
                    //console.log(dt.length);
                    //console.log(dt);
                    if (dt.length >= 1) {
                        val1 =1;
                        console.log("already user");
                    }
                    else {

// create reusable transporter object using the default SMTP transport
                     //   var transporter = nodemailer.createTransport('smtps://epictechnolab@gmail.com:AsJpD33@#$');
                        var transporter = nodemailer.createTransport(smtpTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            auth: {
                                user: 'epictechnolab@gmail.com',
                                pass: 'AsJpD33@#$'
                            }
                        }));
                        console.log("emailid="+email)
                        console.log(email);
// setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: '"epictechnolab@gmail.com"', // sender address
                            to: email, // list of receivers
                            subject: 'Subscribe link', // Subject line

                            text: "http://localhost:8081/subscribed?id="+email, // plaintext body
                        };

// send mail with defined transport object
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                        });



                        console.log("new user");

                        val1=0;
                    }
                }

                var tru=[{"val3":val1}]

                res.status(200);
                res.send(tru);
            });

          //  res.redirect("/index");
        }

    });

    });
    ser.get('/subscribed',function (req,res) {
        var email11 = req.param('id');
        console.log(req.param('id'));
        console.log("emailid=" + email11);
        var url = "mongodb://localhost:27017/epictechnolab";
        mongoclient.connect(url, function (err, db) {
            if (err)
                console.log(err)
            else {
                    var collection = db.collection('subscribeduser');

                collection.find({"email": email11}).toArray(function (err, dt) {
                    console.log("in");
                    if (err) {

                    }
                    else {
                        if (dt.length >= 1) {
                            val1 = 1;
                            console.log("already user");
                        }
                        else {
                            var val1 = 0;
                            console.log("dipak makvana")
                            collection.insertOne({
                                email: email11
                            });
                        }
                        res.redirect('/index');
                        //window.location('/index')
                    }

                });

            }
        });

    });

ser.get('/sendemail',function (req,res) {
    var mongoclient=mongodb.MongoClient;
    var email1 = req.param('name');
    var message=req.param('message');
    console.log(email1);
    console.log(message);
    var url="mongodb://localhost:27017/epictechnolab";
    mongoclient.connect(url, function (err, db) {
            if(err)
                res.send(404);
                else{
                    console.log(email1);
                var transporter = nodemailer.createTransport(smtpTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    auth: {
                        user: 'epictechnolab@gmail.com',
                        pass: 'AsJpD33@#$'
                    }
                }));
// setup e-mail data with unicode symbols
                var activation_str="<a>http://localhost/subscribed?id="+email1;
                var mailOptions = {
                    from:'email1', // sender address
                    to: '"dmakvana33@gmail.com"', // list of receivers
                    subject: 'New Message', // Subject line
                    text:'message' // plaintext body
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });

                res.redirect('back');
            }
    });
    });