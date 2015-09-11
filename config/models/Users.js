import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let userSchema = new Schema({
  googleId: String,
  name: String,
  hasHome: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;