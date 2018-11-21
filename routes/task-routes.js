const express = require('express');
// just like mongoose and schema, require('express') is needed because its used to maake a router.

const router = express.Router();
// creates an object that has a bunch of specific features that the developer chooses. with this object, you get methods like .get, .post, .put, .patch, .delete and they tell your app to wait for a request that matches. They then run whatever code is written inside them, ONLY WHEN CODE MATCHES.

const Task = require('../models/Task.js');
// by requiring in the Task model, I now have access to Task.find, Task.Create, Task.findById, etc. important to allow certain methods to be used across the app.


// router.get takes two arguments, first arg is the url that we're going to sit and wait for.
// 2nd arg is the function that will RUN when THE FIRST ARG (URL) is ran. this function gets three arbitrary arguments by default. these three give us methods like res.render and res.json and res.redirect and req.params. can change their names as long as they match the .render, .json, .params that is used in the functions.
router.get('/tasks', (req, res, next)=>{
    Task.find()
      .then((allTheTasks)=>{
        // argument put inside the .then (allTheTasks) is basically the same thing as saying const allTheTasks = the result of Task.find. const allTheTasks = ...
        res.render('task-list', {})
        // 1st arg is the file to show in the browser, 2nd arg is obect we pass in giving access to the variable inside the 
        // res.render takes a relative path to an hbs file so express knows, when someone goes to localhost:3000, it'll know which file to show them.
        // because of line 48, if res.render is used.. look at line 48 first, if it matches, then go perform action.
        // relative path starts in the view folder.
      })
      .catch((err)=>{
          next(err);
          // feature of express router that looks at next block of app.js, and runs it. this case, there is none after routes file, so in this case, it'll send it to bin/www, where is where our error and not found routes are.
          // next looks at app.js bottom file routes, and if target route isn't found, then next goes to bin/www for the error and not found path messages.
      })


})

// anything to change, edit, delete, add anything in the database, you must use a post route, but a post route is useless unless it receives information.

router.post('/newtask', (req, res, next)=>{
  // if we hard code all the values for a new task, same task will get created from this route.
  // everytime someone makes a request to this route, all code will execute.
  // however, avg person cannot make request to this route, because most people don't have postman.
  // post route is not accessible through the browser, thus there must be a way for users to make post requests easily, without risking giving them unlimited access. that way is to provide a form for the user with very specific criteria so they can send only what we want them to send.
  // furthermore, in the form, system we have devised, to allow users to submit post request using a form, gives us the ability to save the info the user types into the form.
  // due to this, we don't need to hard code in values like blah and wow, instead we can take those values from the form and use them inside the .create method.
    // Task.create({
    //   title: 'blah', 
    //   content: 'wow',
      // no doneYet because it has default: false on it.
      // name for that thing that gives us access to the info the user entered in the form is called req.body, and its an OBJECT.
      Task.create({
        title:req.body.title,
        content: req.body.content
      })
    })
    .then(()=>{
      res.redirect('/tasks')
      // we ALWAYS REDIRECT when we're finished doing what is asked in teh post request.
      // resason is because if we res.render on the page, then the user can refresh the page and send the same .post request again, for example if somoene can charge their credit card more than once or maybe even hack the site.
    })
    .catch((err)=>{
        next(err);
    })

});

router.post('/addnewtaks', (req, res, next)=>{
  res.render('new-task-view')
})


module.exports = router;

// to add login and logout, must add a User model in models file.