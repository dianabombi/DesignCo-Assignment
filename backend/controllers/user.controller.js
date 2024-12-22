const User = require ("../models/user");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

// _____ LOGIN _____

const login = async (req, res) => {
    try {
        let {email, password} = req.body;
        if (!email || !password) {
        return res.send ({message: "For login, please insert e-mail and password."});
        }

        let doesUserExist = await User.findOne({email});
        if (!doesUserExist) {
            return res.send ({message: "User with this e-mail address, is not registered."});
        }
        let isPasswordValid = await bcrypt.compare (password, doesUserExist.password);
        if (!isPasswordValid) {
            return res.send ({message: "Password is not valid."});
        }

        let payload = {
            userId: doesUserExist._id,
            email: doesUserExist.email,
        }

        let token = await jwt.sign(payload, process.env.SECRET_KEY);
        return res.send({msg: "Login was successfull.", token});
    } catch (error) {
        return res.status(500).send({msg:"Internal server error", error});
    }
};


module.exports = {login};