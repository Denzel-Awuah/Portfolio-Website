'use strict';

var developerNameDefault = "Denzel";
var developerCountryDefault = "Ghana";

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Create handldebars with default layout
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); 

app.set('port', process.env.PORT || 80);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));






// Rendering Pages 

app.get('/', function (req,res, next) {
    res.render('home', {
        layout: 'main',
        developerName: developerNameDefault,
        countryName: developerCountryDefault
    });
});

app.get('/crm', function (req, res, next) {
    res.render('crm', {
        layout: 'main',
        
    });
});

app.get('/movie', function (req, res, next) {
    res.render('movie', {
        layout: 'main',
        
    });
});

app.get('/chat', function (req, res, next) {
    res.render('chat', {
        layout: 'main',
        
    });
});



app.post('/contact', function (req, res, next) {
    console.log(req.body); // print all request body to console log( you can save to da)
    res.render('contact');
});





//Need to declare all errors http

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


app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port'));
});
