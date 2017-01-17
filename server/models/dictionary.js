import mongoose from 'mongoose';

const dictionarySchema = mongoose.Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true},
  idx: {type: Integer, required: true}
})

module.exports = mongoose.model('Dictionary', dictionarySchema)
