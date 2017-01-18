import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import User from './models/user.js';
import Question from './models/question.js';

mongoose.Promise = global.Promise;

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
const jsonParser = bodyparser.json();

// spaced repitition algorithm
const algorithm = (arr,answer)=>{
  const questions = arr.shift();
  if (questions.answer === "true") {
    questions.m += 3;
  } else {
    questions.m = 3;
  }
  arr.splice(questions.m, 0, questions);
  return arr;
}

app.use(jsonParser);
app.use(express.static(process.env.CLIENT_PATH));

// Add API endpoints here
// Post new user--- creates a user object with username, score and questions properties
app.post('/users', jsonParser, (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({message: 'Must specify a username'})
  }
  User
  .create({
    username: req.body.username,
    score: 0,
    questions: [
      { question: "Salamat", answer: "Thank you", idx: 1, m: 3 },
      { question: "Kamusta", answer: "How are you", idx: 2, m: 3},
      { question: "Oo", answer: "Yes", idx: 3, m: 3 },
      { question: "Hindi", answer: "No or Not", idx: 4, m: 3 },
      { question: "Ako", answer: "I or Me", idx: 5, m: 3 },
      { question: "Ikaw", answer: "You", idx: 6, m: 3 },
      { question: "Sarap", answer: "Delicious", idx: 7, m: 3 },
      { question: "Paumanhin", answer: "Sorry, excuse me", idx: 8, m: 3 },
      { question: "Paalam", answer: "Farewell", idx: 9, m: 3 },
      { question: "Tubig", answer: "Water", idx: 10, m: 3 }]
  })
  .then(
    res.status(201).json({message: 'User created'}))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'})
  })
});

// get for first question object and score of a user
app.get('/users/:username', (req,res)=>{
    console.log("my log: ",req.params)
    User.findOne(req.params)
    .then(userObj => {
      console.log("USEROBJ", userObj)
      // console.log("my log 1: ",userObj.questions[0])
      let initial = userObj;
      // console.log("my log 2: ",initial.score, initial.questions[0] )
      return res.status(200).json({score: initial.score, question: initial.questions[0]});
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// POST to http://localhost:8080/answer/1/true means question 1 answered correctly
// if user gets question right, score ++
// getting back either true or false from client side, update the m value based on that
// run algortihm to change the array
// send back next question
app.post('/users/:username', (req,res)=>{
  User.findOne(req.params)
  // console.log("my log: ", req.params)
  .then(userObj => {
      console.log("my log: ", userObj)
        let current = userObj;
        let score = current.score;
        console.log(req.body.answer)
        if (req.body.answer === "true") {
            score += 10;
        }
        console.log("current score: ", score)
        let newQuestions = algorithm(current.questions, req.body.answer);
        console.log("new questions array: ", newQuestions)
        User.findOneAndUpdate({__v: 0}, {$set:{score: score, questions: newQuestions}}, (user)=>{
          res.status(201).json({score: score, question: newQuestions[0]
          });
        });
      });
});



function runServer() {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://carloben:carloben@ds111549.mlab.com:11549/spaced-learning';
    mongoose.connect(databaseUri)
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}



if (require.main === module) {
    runServer();
}
