import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let taskSchema = new Schema({
  taskName: String,
  startDate: Date,
  endDate: Date,
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;