import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let taskSchema = new Schema({
  taskName: String,
  startDate: Date,
  endDate: Date,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;