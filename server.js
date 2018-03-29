var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require('mysql');
var bodyParser = require('body-parser');


var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
     extended: false 
    })
);

// Tells app to use handlebars to create the layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Import and use router from controller.js file
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  