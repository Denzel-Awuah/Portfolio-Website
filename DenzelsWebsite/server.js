#!/usr/bin/env nodejs


//------Dependencies------\\
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');



//------Connect Database------\\
var connection = mysql.createConnection({
    //properties

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userinfo'
});

connection.connect(function (error) {
    if (!!error) {
        console.log('Error, did not connect');
    } else {
        console.log('Connected');
    }
});






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



//C Sharp
app.get('/csharp', function (req, res, next) {
    res.render('csharp', {
        layout: 'main',

    });
});







//------Contact (When user submits a message)------\\
app.post('/contact', function (req, res, next) {
  res.render('contact', {
      layout: 'main',

  });



    console.log("NEW MESSAGE");
    console.log("Name: "+req.body.name);
    console.log("Email:"+req.body.email);
    console.log("Subject:" + req.body.subject);
    console.log("Message: "+ req.body.message);

    connection.end();
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
