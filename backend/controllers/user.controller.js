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
        return res.send({message: "Login was successful.", token});
    } catch (error) {
        return res.status(500).send({message:"Internal server error", error});
    }
};

// _____ REGISTER _____
const register = async (req, res) => {
    try {
        let {name, surname, username, email, password, password2} = req.body;
        if (!name || !surname || !username || !email || !password || !password2)
        return res.send ({message: "You have to fill in all information required", status: false});

        let oldUser = await User.findOne({email});
        if (oldUser)
        return res.send({message: "User is already registered, please login or sign up with new email."});
        let hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
        await User.create({
            firstName,
            surname,
            username,
            email,
            password: hashedPassword,
            password2: hashedPassword
        });
            return res.send({message: "Registered successfully", status: true});
        } catch (error) {  
            return res.status(500).send({message:"Internal server error", error, status: false})
    }
};


module.exports = {login, register};