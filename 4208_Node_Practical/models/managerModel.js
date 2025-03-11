const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        default : true
    }
},
    {
        timestamps : true
    }
);

const Manager = mongoose.model('Manager',ManagerSchema);
module.exports = Manager;