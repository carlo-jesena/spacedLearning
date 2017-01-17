import mongoose from 'mongoose';

var QuestionsSchema = mongoose.Schema({

  word = String

})

var Questions = mongoose.model('Questions, questionsSchema');

module.exports = Questions;
