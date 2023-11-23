require('dotenv').config();
const User = require('../models/user.model');
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (validator.validate(email)) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.json({ error: "Please check your credentials" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ name, email, password: hashedPassword });
                await newUser.save();
                return res.json({ success: "You have been registered successfully! Now Login!" });
            }
        } else {
            return res.json({ error: "Please check your credentials" });
        }
    } catch (error) {
        return res.json({ error: "Internal server error occured!" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (validator.validate(email)) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                const checkPassword = await bcrypt.compare(password, userExists.password);
                if (checkPassword) {
                    const token = jwt.sign({ userID: userExists._id }, process.env.TOKEN_KEY);
                    res.json({ userToken: token });
                } else {
                    return res.json({ error: "Please check your credentials" });
                }
            } else {
                return res.json({ error: "Please check your credentials" });
            }
        } else {
            return res.json({ error: "Please check your credentials" });
        }
    } catch (error) {
        return res.json({ error: "Internal server error occured!" });
    }
}

module.exports = { registerUser, loginUser };