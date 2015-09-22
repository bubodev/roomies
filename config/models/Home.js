import mongoose from 'mongoose';
import Task    from './Task.js';
import User    from './User.js';

let Schema = mongoose.Schema;
let homeSchema = new Schema({
  name: String,
  description: String,
  users: [ User.schema ],
});

const Home = mongoose.model('Home', homeSchema); 

module.exports = Home;