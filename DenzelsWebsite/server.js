#!/usr/bin/env nodejs


//------Dependencies------\\
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var http = require('http');
//var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/contact';

//------Connect Database------\\
var connection = mysql.createConnection({
    //properties

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userinfo'
});

// connection.connect(function (error) {
//     if (!!error) {
//         console.log('Error, did not connect');
//     } else {
//         console.log('Connected');
//     }
// });






//------Variables for main layout
var developerNameDefault = "Denzel";
var developerCountryDefault = "Ghana";




var app = express();



//------Create handldebars with default layout
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', 5000 || 80);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));








//------Rendering Pages

//Home
app.get('/', function (req,res, next) {
    res.render('home', {
        layout: 'main',
        developerName: developerNameDefault,
        countryName: developerCountryDefault
    });
});




// CRM
app.get('/crm', function (req, res, next) {
    res.render('crm', {
        layout: 'main',

    });

});


//Movie
app.get('/movie', function (req, res, next) {
    res.render('movie', {
        layout: 'main',

    });
});


//Chat
app.get('/chat', function (req, res, next) {
    res.render('chat', {
        layout: 'main',

    });
});




//ClientServer
app.get('/clientserver', function (req, res, next) {
    res.render('clientserver', {
        layout: 'main',

    });
});



//React Word Processor App
app.get('/reactapp', function (req, res, next) {
    res.render('reactapp', {
        layout: 'main',

    });
});

//Angular Soccer App
app.get('/angularsite', function (req, res, next) {
    res.render('angularsite', {
        layout: 'main',

    });
});








//------Contact (When user submits a message)------\\
app.post('/contact', function (req, res, next) {
  res.render('contact', {
      layout: 'main',

  });

//Mongo db connection
var item = {
  name: req.body.name,
  email: req.body.email,
  subject: req.body.subject,
  message: req.body.message
};

mongo.connect(url, function(err, db){
  //assert.equal(null, err);
  var dbo = db.db("contact");
if (err) {
  console.log("Error in connecting to Mongodb");
}else{
  console.log("MongoDB connection successfull !");
}


  dbo.collection("contactsubmit").insertOne(item, function(error, result) {
    //assert.equal(null, err);
    if (error) {
      console.log("Error while trying to insert item");
    }else{
    console.log("Item inserted into mongoDB");
     }

    db.close();
  });
});

    //console.log("\nNEW MESSAGE:"+ "\nName: "+req.body.name+"\nEmail: "+req.body.email+ "\nSubject: " + req.body.subject+ "\nMessage: "+ req.body.message+"\n");

    //connection.end();
});







//------Declare all errors http------\\

//404 not found
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});


//500 server error
app.use(function (err, req, res, next) {
    console.error(err.staack);
    res.status(500);
    res.render('500');
});






//App listen on port
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port'));
});
