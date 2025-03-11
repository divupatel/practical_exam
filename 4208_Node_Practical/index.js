const express = require('express');
const port = 8000;

const app = express();
const db = require('./config/db');

const jwtStrategy = require('./config/passport_jwt-Strtagy');
const session = require('express-session');
const passport = require('passport');

app.use(express.urlencoded());

app.use(session({
    name : 'ApiRNW',
    secret : 'ExamRnw',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000 * 60 * 60
    },
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/',require('./routes/adminRoutes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server Error",err);
        return false;
    }
    console.log("Server is running on port : ",port);
})