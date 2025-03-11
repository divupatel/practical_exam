const AdminModel = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ManagerModel = require('../models/managerModel');


module.exports.adminRegister = async (req, res) => {
    try {

        console.log(req.body);
        let adminEmailExist = await AdminModel.findOne({ email: req.body.email });
        if (!adminEmailExist) {
            if (req.body.password == req.body.confirm_password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let AddAdmin = await AdminModel.create(req.body);
                if (AddAdmin) {
                    return res.status(200).json({ msg: "Admin Data added successfully", data: AddAdmin });
                }
                else {
                    return res.status(400).json({ msg: "password and confirm password are not same" });
                }
            }
            else {
                return res.status(400).json({ msg: "password and confirm password are not same" });
            }
        }
        else {
            return res.status(400).json({ msg: "Email already Exists" });
        }


    }
    catch (err) {
        return res.status(400).json({ msg: "Something is wrong", errors: err });
    }
}

module.exports.adminLogin = async (req, res) => {
    try {
        let checkAdmin = await AdminModel.findOne({ email: req.body.email });
        if (checkAdmin) {
            let checkPass = await bcrypt.compare(req.body.password, checkAdmin.password);
            if (checkPass) {
                let adminToken = await jwt.sign({ adminData: checkAdmin }, 'Divu', { expiresIn: '1d' });
                return res.status(200).json({ msg: "Logged in Successfully", Token: adminToken });
            }
            else {
                return res.status(400).json({ msg: "Invalid Password" });
            }
        }
        else {
            return res.status(400).json({ msg: "Invalid Email" });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something is wrong", errors: err });
    }
}

module.exports.registerManager = async (req, res) => {
    try {
        let checkMail = await ManagerModel.findOne({ email: req.body.email });
        if (!checkMail) {
            let AddManager = await ManagerModel.create(req.body);
            if (AddManager) {
                return res.status(200).json({ msg: "Manager Data added successfully", data: AddManager });
            }
            else {
                return res.status(400).json({ msg: "password and confirm password are not same" });
            }
        }
        else {
            return res.status(400).json({ msg: "Email already Exists" });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something is wrong", errors: err });
    }
}

module.exports.getManagerData = async (req, res) => {
    try {

        let ManagerData = await ManagerModel.find();
        if (ManagerData) {
            return res.status(200).json({
                msg: "Manager Data found successfully",
                data: ManagerData,
            });
        }
        else{
            return res.status(200).json({
                msg: "Manager Data not found ",
            });
        }


    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong", errors: err });
    }
};


module.exports.deleteManager = async (req, res) => {
    try {
        console.log(req.params.id);
        let deleteManager = await ManagerModel.findByIdAndDelete(req.params.id);
        if (deleteManager) {
            return res.status(400).json({ msg: "Manager Data deleted", data: deleteManager });
        }
        else {
            return res.status(400).json({ msg: "Manager not exist" });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something is wrong", errors: err });
    }
}

module.exports.updateManager = async (req, res) => {
    try {
        console.log(req.query.id);
        console.log(req.body);
        let updateManager = await ManagerModel.findByIdAndUpdate(req.query.id, req.body);
        if (updateManager) {
            let updatedData = await ManagerModel.findById(req.query.id);
            return res.status(400).json({ msg: "Manager Data updated Successfully", data: updatedData });
        }
        else {
            return res.status(400).json({ msg: "Manager not exist" });
        }

    }
    catch (err) {
        return res.status(400).json({ msg: "Something is wrong", errors: err });
    }
}
