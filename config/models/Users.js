import mongoose from 'mongoose';
import Tasks    from '/Tasks.js';

let Schema = mongoose.Schema;
let userSchema = new Schema({
  googleId: String,
  name: String,
  hasHome: Boolean,
  tasks: [Tasks]
});

const User = mongoose.model('User', userSchema);

module.exports = User;