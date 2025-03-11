const express = require('express');

const routes = express.Router();

const AdminCtl = require('../controllers/adminController');

const passport = require('passport');

routes.post('/adminRegister',AdminCtl.adminRegister);
routes.post('/adminLogin',AdminCtl.adminLogin);
routes.post('/registerManager',passport.authenticate('jwt',{failureRedirect : '/adminFailLogin'}),AdminCtl.registerManager);

routes.get('/adminFailLogin', async (req,res)=>{
    try{
        return res.status(401).json({
            msg : 'Invalid Token',
        })
    }
    catch(err){
        return res.status(400).json({msg:"Something is wrong",errors:err});
    }
});

routes.get('/getManagerData',passport.authenticate('jwt',{failureRedirect : '/adminFailLogin'}),AdminCtl.getManagerData);

routes.get('/deleteManager/:id',passport.authenticate('jwt',{failureRedirect : '/adminFailLogin'}),AdminCtl.deleteManager);
routes.put('/updateManager',passport.authenticate('jwt',{failureRedirect : '/adminFailLogin'}),AdminCtl.updateManager);

module.exports = routes;