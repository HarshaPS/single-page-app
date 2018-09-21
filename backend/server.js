var express = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
const config = require('./config/config');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
app.use('/api', router);
app.listen(4000);