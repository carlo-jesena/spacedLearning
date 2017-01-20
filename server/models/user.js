import mongoose from 'mongoose';
import questions from './question.js'

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	score: Number,
	questions: Array
});

module.exports = mongoose.model('User', userSchema);
