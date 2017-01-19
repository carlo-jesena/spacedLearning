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

// passport.use(new GoogleStrategy({
//     clientID: '706655097490-k63cp7hbpara5l4oemn5517qh83scil5.apps.googleusercontent.com',
//     clientSecret: 'hd6jsrk9VfVbZmbJuggsLG1_',
//     callbackURL: "http://localhost:8080/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log('accessToken: ', accessToken);
//     console.log('profile: ', profile);
//     return done(null, profile);
//
//     // let myQues = Ques.find({})
// // retrieve emails
//     User.findOneAndUpdate({ googleId: profile.id },
//             { $set: {
//               username: profile.name,
//               email:profile.emails[0].value,
//               accessToken: accessToken,
//               questions: getArrayOfQuestions()
//               }
//             },
//             { upsert: true, 'new': true })
//             .then((user) => {
//                 done(null, user);
//             }).catch((err) => {
//                 console.log('catch error', err)
//             });
//       function getArrayOfQuestions() {
//         return ["array of questions"]
//       }
//
//     // User.findOne({ googleId: profile.id }, function (err, user) {
//     //   if (!user) {
//     //     User.create(
//     //        { googleId: profile.id, accessToken: accessToken }
//     //     )
//     //   }
//     //   return cb(err, user);
//     // });
//
// }));
//
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

// passport.use(new BearerStrategy((accessToken, done) =>
//     User.findOne({ accessToken: accessToken }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       return done(null, user, { scope: 'all' });
//     });
//   }
// ));
