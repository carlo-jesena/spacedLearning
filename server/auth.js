// import GoogleStrategy from 'passport-google-oauth20';
// import passport from 'passport';
// import BearerStrategy from 'passport-http-bearer';
//
//
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
//
//     User.findOneAndUpdate({ googleId: profile.id },
//             { $set: { username: profile.name, accessToken: accessToken } },
//             { upsert: true, 'new': true })
//             .then((user) => {
//                 done(null, user);
//             }).catch((err) => {
//                 console.log('catch error', err)
//             });
//
// }));
//
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));
//
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/', session: false }),
//   function(req, res) {
//     res.cookie('accessToken', req.user.accessToken, { expires: 0, httpOnly: false});
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
//
//
//
// passport.use(new BearerStrategy((accessToken, done) =>
//     User.findOne({ accessToken: accessToken }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       return done(null, user, { scope: 'all' });
//     });
//   }
// ));
