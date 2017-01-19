import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true},
  idx: {type: Number, required: true},
  m: {type: Number, required: true}
});

module.exports = mongoose.model('Question', questionSchema)

// const questions = [
//   { "question": "Salamat", "answer": "Thank you", "idx": "1" , "m": "3" },
//   { "question": "Kamusta", "answer": "How are you", "idx": "2" , "m": "3"},
//   { "question": "Oo", "answer": "Yes", "idx": "3" , "m": "3" },
//   { "question": "Hindi", "answer": "No or Not", "idx": "4" , "m": "3" },
//   { "question": "Ako", "answer": "I or Me", "idx": "5" , "m": "3" },
//   { "question": "Ikaw", "answer": "You", "idx": "6" , "m": "3" },
//   { "question": "Sarap", "answer": "Delicious", "idx": "7" , "m": "3" },
//   { "question": "Paumanhin", "answer": "Sorry, excuse me", "idx": "8" , "m": "3" },
//   { "question": "Paalam", "answer": "Farewell", "idx": "9" , "m": "3" },
//   { "question": "Tubig", "answer": "Water", "idx": "10" , "m": "3" }
// ]
