import mongoose from 'mongoose';
import Tasks    from '/Tasks.js';

let Schema = mongoose.Schema;
let homeSchema = new Schema({
  name: String,
  tasks: [Tasks]
});

const Home = mongoose.model('Home', homeSchema); 

module.exports = Home;