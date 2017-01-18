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

app.use(jsonParser);
app.use(express.static(process.env.CLIENT_PATH));

// Add API endpoints here

// get for logged in users database info
app.get('/users/:username', (req,res)=>{
    console.log("my log: ",req.params)
    User.findOne(req.params)
    .then(userObj => {
      console.log("my log 2: ",userObj)
        return res.status(200).json(userObj)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// post new user
// app.post('/users', (req, res) => {
//     Question.find({})
//         .then(words => {
//             const learn = words.map(item => {
//                 let word = {};
//                 word[item._id] = 1;
//                 return word
//             })
//             console.log(learn)
//             return learn
//         })
//         .then((learn) => {
//             let newUser = new User()
//             newUser.words = learn
//             newUser.score = 0
//             newUser.userName = req.body.userName
//             newUser.save((err, user) => {
//                 if(err) {
//                     res.send(err)
//                 }
//                 return res.status(200).json(newUser)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
//     })
// })
app.post('/users', jsonParser, (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({message: 'Must specify a username'})
  }
  User
  .create({
    username: req.body.username,
    score: 0,
    questions: [{ question: "Salamat", answer: "Thank you", idx: 1 , m: 3 },
    { question: "Kamusta", answer: "How are you",idx: 2 , m: 3},
    { question: "Oo", answer: "Yes",idx: 3 , m: 3 },
    { question: "Hindi", answer: "No or Not",idx: 4 , m: 3 },
    { question: "Ako", answer: "I or Me",idx: 5 , m: 3 },
    { question: "Ikaw", answer: "You",idx: 6 , m: 3 },
    { question: "Sarap", answer: "Delicious",idx: 7 , m: 3 },
    { question: "Paumanhin", answer: "Sorry, excuse me",idx: 8 , m: 3 },
    { question: "Paalam", answer: "Farewell",idx: 9 , m: 3 },
    { question: "Tubig", answer: "Water",idx: 10 , m: 3 }],
  })
  .then(
    res.status(201).json({message: 'User created'}))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'})
  });
});

// Save Users Progress, run algortihm to change the array
// put update the questions
app.put('/user', (req, res) =>{
  res.json({ test : 'Post progress called'})
})

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
