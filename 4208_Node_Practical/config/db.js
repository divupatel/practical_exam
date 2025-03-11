const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/PracticalNode');

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("Something wrong to connect db");
        return false;
    }
    console.log("Db is connected")

})

module.exports = db;