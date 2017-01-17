import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import Users from './models/users.js'

mongoose.Promise = global.Promise;

const app = express();
const jsonParser = bodyparser.json();

app.use(jsonParser);
app.use(express.static(process.env.CLIENT_PATH));

// Add API endpoints here

//============== Get user ============
app.get('/users', (req, res) => {
  Users.find({}, (err, data) => {
        console.log('data', data);
        if (err){
            console.log("error was made:", err);
            res.send(err);
        }
        res.status(200).json(data);
    })
})

//============ Create new user ==========

//============== Create user with questions ============
app.post('/users', (req, res) => {
  Users.create({
    username: "carloben",
    questions : [
      { question: "Salamat", answer: "Thank you", idx: 1 },
      { question: "Kamusta", answer: "How are you", idx: 2},
      { question: "Oo", answer: "Yes", idx: 3 },
      { question: "Hindi", answer: "No or Not", idx: 4 },
      { question: "Ako", answer: "I or Me", idx: 5 },
      { question: "Ikaw", answer: "You", idx: 6 },
      { question: "Sarap", answer: "Delicious", idx: 7 },
      { question: "Paumanhin", answer: "Sorry, excuse me", idx: 8 },
      { question: "Paalam", answer: "Farewell", idx: 9 },
      { question: "Tubig", answer: "Water", idx: 10 },
    ]
  })
  .then((err, user) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(user)
  });
})

//============== Save Users Progress, run algortihm to change the array ============
// put update the question
app.put('/cards', (req, res) =>{
  res.json({ test : 'Post progress called'})
})

// get score
// get dictionary



const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

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
// const questions = [
//   { question: "Salamat", answer: "Thank you", idx: 1 },
//   { question: "Kamusta", answer: "How are you", idx: 2},
//   { question: "Oo", answer: "Yes", idx: 3 },
//   { question: "Hindi", answer: "No or Not", idx: 4 },
//   { question: "Ako", answer: "I or Me", idx: 5 },
//   { question: "Ikaw", answer: "You", idx: 6 },
//   { question: "Sarap", answer: "Delicious", idx: 7 },
//   { question: "Paumanhin", answer: "Sorry, excuse me", idx: 8 },
//   { question: "Paalam", answer: "Farewell", idx: 9 },
//   { question: "Tubig", answer: "Water", idx: 10 },
// ]
