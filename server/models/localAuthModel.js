// The AdminAuth model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminAuthSchema = new Schema({
  adminLogin: String,
  adminPass: String
}, { 
  collection : 'adminAuth'
});

module.exports = mongoose.model('AdminAuth', adminAuthSchema);