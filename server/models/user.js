import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

	username: {type: String, required: true},
	score: Number,
	questions: Array

})

module.exports = mongoose.model('User', userSchema)
