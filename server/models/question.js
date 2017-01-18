import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true},
  m: {type: Number, required: true}
});

module.exports = mongoose.model('Question', questionSchema)

const questions = [
  { question: "Salamat", answer: "Thank you", m: 3 },
  { question: "Kamusta", answer: "How are you", m: 3},
  { question: "Oo", answer: "Yes", m: 3 },
  { question: "Hindi", answer: "No or Not", m: 3 },
  { question: "Ako", answer: "I or Me", m: 3 },
  { question: "Ikaw", answer: "You", m: 3 },
  { question: "Sarap", answer: "Delicious", m: 3 },
  { question: "Paumanhin", answer: "Sorry, excuse me", m: 3 },
  { question: "Paalam", answer: "Farewell", m: 3 },
  { question: "Tubig", answer: "Water", m: 3 }
]
