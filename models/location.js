const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  name: { type: String, required: true },
  date_arrived : {type: String, required : false},
  date_left : {type : String, required : false}
});

module.exports = mongoose.model('Location', locationSchema);