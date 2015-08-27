import mongoose from 'mongoose';
import Tasks    from '/Tasks.js';

var Schema = mongoose.Schema;

var homeSchema = new Schema({
  name: String,
  tasks: [Tasks]
});

mongoose.model('User', homeSchema);