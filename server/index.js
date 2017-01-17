import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';

const app = express();
const jsonParser = bodyparser.json();

// Add API endpoints here
app.use(jsonParser);
app.use(express.static(process.env.CLIENT_PATH));

//============== Fetch Next Question ============
app.get('/questions', (req, res) =>{
  res.json({ test : 'Get questions called'})
})

//============== Save Users Answers ============
app.post('/answers', (req, res) =>{
  res.json({ test : 'Post answers called'})
})

//============== Save Users Progress ============
app.post('/progress', (req, res) =>{
  res.json({ test : 'Post progress called'})
})


// var runServer = function(callback) {
//   var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://carloben:carloben@mongodb://<dbuser>:<dbpassword>@ds111549.mlab.com:11549/spaced-learning';
//   mongoose.connect(databaseUri)
//   .then(() => {
//     var port = process.env.PORT || 8080;
//     var server = app.listen(port, () => {
//         console.log('Listening on port ' + port);
//         if (callback) { callback(server) };
//       });
//   });
// };

// const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

function runServer() {
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

const questions = [
  {"Salamat" : "Thank you"},
  {"Kamusta?" : "How are you?"},
  {"Oo" : "Yes"},
  {"Hindi" : "No or Not"},
  {"Ako" : "I or Me"},
  {"Ikaw" : "You"},
  {"Sarap" :"Delicious"},
  {"Paumanhin" : "Sorry, excuse me"},
  {"Paalam" : "Farewell"},
  {"Tubig" : "Water"}
]
