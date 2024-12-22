const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String},
    surname: {type: String},
    username: {type: String},
    email: {type: String},
    password: {type: String},
    password2: {type: String}
  });

  const User = mongoose.model('User', userSchema); 
 
  module.exports = User;