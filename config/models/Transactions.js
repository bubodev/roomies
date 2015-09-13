import mongoose from 'mongoose';
import User from './Users';

let Schema = mongoose.Schema;
let transactionSchema = new Schema({
  type: String,
  description: String,
  date: Date,
  amount: Number,
  spender: Schema.Types.ObjectId,
  borrower: Schema.Types.ObjectId
});

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;