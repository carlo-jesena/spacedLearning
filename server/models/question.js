import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true},
  idx: {type: Number, required: true},
  m: {type: Number, required: true}
});

module.exports = mongoose.model('Question', questionSchema)
