require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
// all these consts are importing packages that are listed in package.json. they're installed, and above a variable is created, so the package can be used.
// no point in making variables for a package that hasn't been installed. if something is here that isn't listed in package.json, then you need to run (npm install --save [package.name])
// cross check between package.json and app.js to ensure all correct packages are installed.
// npm install takes all modules from package.json and puts then in node_modules folder.
// when an express app is ran, app.js is the file that runs.

// const Task = require('./models/Task');
// this line above will pull WHATEVER MODULE.EXPORT IS ON THE MODEL PAGE. whether its the model schema, or just a random statement at bottom of page.

// console.log('=-=-=-=-=-=-=-=-', Task)

const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// undefined error, shows that you're missing a const. errors are hints, look at hints as very helpful. cannot find module, npm install --save module name.

const User = require('../models/User');


require('/config/passport-stuff.js');
// after config folder, and passport information is placed in a passport file.
// this line brings in all the stuff from the passport.js file in the config folder.

mongoose
  .connect('mongodb://localhost/todo-list', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// ROUTES/AND ADDED ROUTES FILES GO HERE


app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));
// this block of code configures and activates a session in express

app.use(passport.initialize());
// this line 'turns on' the passport package
app.use(passport.session());
//this line connects passport to the session you created


app.locals.theUser = req.user;
// same as here app.use(function(req, res, next)=>{
//   res.locals.theUser = req.user;
//   next();
// });

// this above line code not from passport, we made this.
// we want to pass in the user to every single view in the entire app.
// however app.locals syntax - GET REST FROM GITHUB


const index = require('./routes/index');
app.use('/', index);

// this new require only works if module.exports is in the file.
const taskRoutes = require('./routes/task-routes');
app.use('/', taskRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/', userRoutes)

module.exports = app;