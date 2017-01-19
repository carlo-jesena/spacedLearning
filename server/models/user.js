import mongoose from 'mongoose';
import questions from './question.js'

const userSchema = mongoose.Schema({
	// googleId: {type: String, required: true},
	username: {type: String, required: true},
	// email: {type: String, required: true},
	// accessToken: {type: String, require: true},
	score: Number,
	questions: Array
});

module.exports = mongoose.model('User', userSchema);
