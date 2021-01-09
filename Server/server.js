const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

// const corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200
// }

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware + config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log('ERROR CONNECTING TO DB', err));

const users = [];

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.get('/user', (req, res) => {
    res.json(users);
})

// app.post('/user', (req, res) => {
//     const user = {name: req.body.name, password: req.body.password}
//
//     // check if user in db
//
//     // if user not in db - add it
//     users.push(user);
//
//     console.log("users!!!", users);
//     res.status(200).send('user Created')
// })

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});
