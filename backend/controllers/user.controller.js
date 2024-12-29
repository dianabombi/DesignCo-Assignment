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
        if (!name || !surname || !username || !email || !password || !password2) {
        return res.send ({message: "You have to fill in all information required", status: false});
        }

        let oldUser = await User.findOne({email});
        if (oldUser) {
            alert("User is already registered, please login or sign up with new email.");
        return res.status(400).send({message: "User is already registered, please login or sign up with new email."});
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
        
        await User.create({
            name,
            surname,
            username,
            email,
            password: hashedPassword,
        });
            return res.status(201).send({message: "Registered successfully", status: true});
        } catch (error) {  
            return res.status(500).send({message:"Internal server error", error, status: false})
    }
};

// _____ GET USER DETAILS (DASHBOARD) _____
const getMe = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return res.status(401).send({ message: "No token provided. Authorization denied." });
    }

    try {
        const decoded = jwt.verify(token, +process.env.SECRET_KEY); 
        const user = await User.findById(decoded.userId).select("-password"); // password excluded from User object with method "select"
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        return res.send({
            message: "User details fetched successfully.",
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).send({ message: "Server error.", error });
    }
};


module.exports = {login, register, getMe};