import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import User from './models/user.js';
// import GoogleStrategy from 'passport-google-oauth20';
// import passport from 'passport';
// import BearerStrategy from 'passport-http-bearer';

mongoose.Promise = global.Promise;

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
const jsonParser = bodyparser.json();

// google strategy
// passport.use(new GoogleStrategy({
//     clientID: '706655097490-k63cp7hbpara5l4oemn5517qh83scil5.apps.googleusercontent.com',
//     clientSecret: 'hd6jsrk9VfVbZmbJuggsLG1_',
//     callbackURL: "http://localhost:8080/auth/google/callback"
//   }, function(accessToken, refreshToken, profile, done) {
//
//     User.findOneAndUpdate({ googleId: profile.id },
//             {
//               $set: {
//                 username: profile.name,
//                 email: profile.emails[0].value,
//                 accessToken: accessToken,
//                 questions: getArrayQuestions()
//                }
//             },
//             { upsert: true, 'new': true })
//             .then((user) => {
//                 done(null, user);
//             }).catch((err) => {
//                 console.log('catch error', err)
//             });
//         function getArrayQuestions() {
//           return [
//             { question: "Salamat", answer: "Thank you", idx: 1, m: 1 },
//             { question: "Kamusta", answer: "How are you", idx: 2, m: 1},
//             { question: "Oo", answer: "Yes", idx: 3, m: 1 },
//             { question: "Hindi", answer: "No or Not", idx: 4, m: 1 },
//             { question: "Ako", answer: "I or Me", idx: 5, m: 1 },
//             { question: "Ikaw", answer: "You", idx: 6, m: 1 },
//             { question: "Sarap", answer: "Delicious", idx: 7, m: 1 },
//             { question: "Paumanhin", answer: "Sorry, excuse me", idx: 8, m: 1 },
//             { question: "Paalam", answer: "Farewell", idx: 9, m: 1 },
//             { question: "Tubig", answer: "Water", idx: 10, m: 1 }
//           ]
//         }
// }));
//
// // google user login
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));
//
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/', session: false }),
//   function(req, res) {
//     res.cookie('accessToken', req.user.accessToken, { expires: 0, httpOnly: false});
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
//
// // bearer strategy
// passport.use(new BearerStrategy(
//   function(accessToken, done) {
//     console.log(accessToken)
//     User.findOne({
//       accessToken: accessToken,
//     }).then(user => {
//       done(null, user, {scope: 'read'});
//     }).catch(err => {
//       done(err,null);
//     })
//   }
// ));

// spaced repitition algorithm
const spacedRepAlgo = (arr, answer) => {
  const questions = arr.shift();
  if (answer) {
    questions.m *= 2;
  } else {
    questions.m = 1;
  }
  // console.log("checkthe m value: ", questions)
  arr.splice(questions.m, 0, questions);
  // console.log("this is the array: ", arr)
  return arr;
}


app.use(jsonParser);
app.use(express.static(process.env.CLIENT_PATH));

// Add API endpoints here
// POST new user--- creates a user object with username, score and questions properties
app.post('/users', jsonParser, (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({message: 'Must specify a username'})
  }
  User
  .create({
    username: req.body.username,
    score: 0,
    questions: [
      { question: "Salamat", answer: "Thank you", idx: 1, m: 1 },
      { question: "Kamusta", answer: "How are you", idx: 2, m: 1},
      { question: "Oo", answer: "Yes", idx: 3, m: 1 },
      { question: "Hindi", answer: "No or Not", idx: 4, m: 1 },
      { question: "Ako", answer: "I or Me", idx: 5, m: 1 },
      { question: "Ikaw", answer: "You", idx: 6, m: 1 },
      { question: "Sarap", answer: "Delicious", idx: 7, m: 1 },
      { question: "Paumanhin", answer: "Sorry, excuse me", idx: 8, m: 1 },
      { question: "Paalam", answer: "Farewell", idx: 9, m: 1 },
      { question: "Tubig", answer: "Water", idx: 10, m: 1 }]
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
    // console.log("my log: ",req.params)
    User.findOne(req.params)
    .then(userObj => {
      // console.log("USEROBJ", userObj)
      // console.log("my log 1: ",userObj.questions[0])
      let initial = userObj;
      // console.log("my log 2: ",initial.score, initial.questions[0] )
      return res.status(201).json({score: initial.score, question: initial.questions[0]});
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// POST to retrieve next question
// getting back either true or false from client side, update the m value based on that
// if user gets question right(answer=true), score ++
// run algortihm update the m value and change the array
// send back next question
app.post('/users/:username', (req,res)=>{
  User.findOne(req.params)
  // console.log("my log: ", req.params)
  .then(current => {
      // console.log("my log: ", userObj)
        let score = current.score;
        console.log("the score is: ", score)
        if (req.body.answer === "true") {
            score += 10;
        }
        console.log("the new score is: ", score)
        // console.log("current questions: ", current.questions, req.body.answer)
        let newQuestions = spacedRepAlgo(current.questions, req.body.answer);
        // console.log("next questions array: ", newQuestions)
        User.findOneAndUpdate(req.params, {$set:{score: score, questions: newQuestions}}, (user)=>{
          res.status(201).json({score: score, question: newQuestions[0]});
        });
      })
  .catch(err => {
    res.status(500).json(err)
  })
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
