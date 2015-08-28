import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let taskSchema = new Schema({
  name: String,
  date: Date,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;