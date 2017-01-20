import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import User from './models/user.js';

mongoose.Promise = global.Promise;

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
const jsonParser = bodyparser.json();

// spaced repitition algorithm
const spacedRepAlgo = (arr, answer) => {
  const questions = arr.shift();
  if (answer === true) {
    questions.m *= 2;
  } else {
    questions.m = 1;
  }
  arr.splice(questions.m, 0, questions);
  return arr;
}


app.use(jsonParser);
app.use(express.static(process.env.CLIENT_PATH));

// Add API endpoints here

// POST new user--- creates a user object with username, score and questions properties
app.post('/users/:newUser', jsonParser, (req, res) => {
  if (!req.params.newUser) {
    return res.status(400).json({message: 'Must specify a username'})
  }
  User.create({
    username: req.params.newUser,
    score: 0,
    questions: [
      { question: "Salamat", answer: "Thank you", idx: 1, m: 1 },
      // { question: "Kamusta", answer: "How are you", idx: 2, m: 1},
      // { question: "Oo", answer: "Yes", idx: 3, m: 1 },
      // { question: "Hindi", answer: "No or Not", idx: 4, m: 1 },
      // { question: "Ako", answer: "I or Me", idx: 5, m: 1 },
      // { question: "Ikaw", answer: "You", idx: 6, m: 1 },
      // { question: "Sarap", answer: "Delicious", idx: 7, m: 1 },
      // { question: "Paumanhin", answer: "Sorry, excuse me", idx: 8, m: 1 },
      // { question: "Paalam", answer: "Farewell", idx: 9, m: 1 },
      // { question: "Tubig", answer: "Water", idx: 10, m: 1 }
    ]
  })
  .then(
    res.status(201).json({message: 'User created'}))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'})
  })
});

// GET first question object and score of a logged in user
app.get('/users/:username', (req,res)=>{
    User.findOne(req.params)
    .then(userObj => {
      let initial = userObj;
      return res.status(201).json({score: initial.score, question: initial.questions[0]});
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// GET userlist
app.get('/userlist', (req, res) => {
  User.find()
  .then(users => {
    let userlist = users.map(item => item.username);
  res.status(200).json(userlist)
  })
  .catch(err => res.status(500).json(err));
});

// POST to retrieve next question
app.post('/answer/:username', (req,res) => {
  User.findOne(req.params)
  .then(userObj => {
        let score = userObj.score;
        if (req.body.answer === true) {
            score += 10;
        }
        let newQuestions = spacedRepAlgo(userObj.questions, req.body.answer);
          User.findOneAndUpdate(req.params, {$set:{score: score, questions: newQuestions}}, (user)=>{
          res.status(201).json({score: score, question: newQuestions[0]});
        });
      })
  .catch(err => {
    res.status(500).json(err)
    })
});

app.post('/question/:username', (req, res) => {
  console.log(req.body);

  const newQuestion = {
    question: req.body.question.question,
    answer: req.body.question.answer,
    m: 1
  };
  console.log(newQuestion);

  User.findOneAndUpdate(
    req.params,
    { $push: { questions: newQuestion }},
    (user) => {
      res.sendStatus(201);
    }
  );

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
