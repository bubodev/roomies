import mongoose from 'mongoose';
import Tasks    from './Tasks.js';
import Users    from './Users.js';

let Schema = mongoose.Schema;
let homeSchema = new Schema({
  name: String,
  description: String,
  tasks: [ Tasks.schema ],
  users: [ Users.schema ],
});

const Home = mongoose.model('Home', homeSchema); 

module.exports = Home;