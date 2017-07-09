// The Squares model

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var squaresSchema = new Schema({
  savedBoard: Object,
  name: String,
  structure: String
}, { 
  collection : 'squares'
});

module.exports = mongoose.model('Squares', squaresSchema);