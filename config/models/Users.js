import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let userSchema = new Schema({
  googleId: String,
  name: String,
  token: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;