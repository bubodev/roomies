import mongoose from 'mongoose';

var Schema = mongoose.Schema;
var taskSchema = new Schema({
  name: String,
  date: Date
});

export taskSchema;