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

app.use(jsonParser);
app.use(express.static(process.env.CLIENT_PATH));

// Add API endpoints here

// get for logged in users database info
app.get('/users/:username', (req,res)=>{
    console.log(req.params)
    User.findOne(req.params)
    .then(userObj => {
      console.log(userObj)
        return res.status(200).json(userObj)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// post new user with array of questions
app.post('/users', function(req, res) {
    User.create({
        username: carlo,
        score: 0,
        questions: [{ question: "Salamat", answer: "Thank you", m: 3 },
          { question: "Kamusta", answer: "How are you", m: 3},
          { question: "Oo", answer: "Yes", m: 3 },
          { question: "Hindi", answer: "No or Not", m: 3 },
          { question: "Ako", answer: "I or Me", m: 3 },
          { question: "Ikaw", answer: "You", m: 3 },
          { question: "Sarap", answer: "Delicious", m: 3 },
          { question: "Paumanhin", answer: "Sorry, excuse me", m: 3 },
          { question: "Paalam", answer: "Farewell", m: 3 },
          { question: "Tubig", answer: "Water", m: 3 }]
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(user);
    });
});

//============== Save Users Progress, run algortihm to change the array ============
// put update the question
app.put('/user', (req, res) =>{
  res.json({ test : 'Post progress called'})
})

// get score
// get dictionary

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
