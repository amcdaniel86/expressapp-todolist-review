// models are first step to creating new additions to a database.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// anytime to make a Schema, we have to use mongoose.Schema, to use mongoose, we have to use ('mongoose'); thus require('mongoose') at top.

// Schema is a feature of mongoose that allows us to make rules for the db, otherwise MongoDB is chaos. also gives extra features such as default, unique, required, maxlength, minlength
const taskSchema = new Schema({
      title: String,
      content: String,
      doneYet: {type: Boolean, default: false}

}, {
      timestamps: true
      // magically gives it a timestamp when its created.
})



// the schema ^ makes the rules.

const Task = mongoose.model('Task', taskSchema);
// ^ this line creates the model from mongoose, which determines what the collection in the db is called. also gives all the magical methods like .find, .findById, .find


module.exports = Task;
//  module.exports 
// = {thing: 'blah', message: 'haha you exported the wrong thing'}

// module.exports says 'const this entire file into a variable that can be used in another file.
// module.exports is totally useless without a require statement on the other end.
// without module.exports, const mongoose require('mongoose') means nothing.
// example: const Task = require('./models/Task) and when that is stated, in that file, const Task will equal whatever is equal to module.exports.
// whatever you module.export, this entire file is = to that random object, whether its the setup schema or one string.