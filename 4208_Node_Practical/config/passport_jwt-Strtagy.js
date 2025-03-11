const passport = require('passport');

const jwtStratagy = require('passport-jwt').Strategy;

const ExtractStratagy = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest : ExtractStratagy.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'Divu'
}

const AdminModel = require('../models/adminModel');

passport.use(new jwtStratagy (opts,async function (payload,done){
    let checkAdminData = await AdminModel.findOne({email : payload.adminData.email})
    if(checkAdminData){
        return done(null,checkAdminData)
    }
    else{
        return done(null,false)
    }
}))


passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser( async (id,done)=>{
    let adminData = await AdminModel.findById(id);
    if(adminData){
        return done (null,adminData)
    }
    else{
        return done(null,false)
    }
})

module.exports = passport;