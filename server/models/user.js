import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	questions: {type: Array, required: true}
})

module.exports = mongoose.model('User', UserSchema)
