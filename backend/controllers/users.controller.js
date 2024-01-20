const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
    User.find().select('-passwdHash')
        .then((usersList) => {
            res.status(200).json({
                Success: true,
                usersList
            });
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                Error: err
            })
        })
}

const getUser = (req, res) => {
    var id = req.params.id;

    User.findById(id).select('-passwordHash')
        .then((user) => {
            if (user) {
                res.status(200).json({
                    Success: true,
                    user
                });
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: 'User not found'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                Error: err
            })
        })
}

const getUsersCount = (req, res) => {
    User.countDocuments()
        .then((userCount) => {
            if (userCount) {
                res.status(200).json({
                    userCount
                });
            }
            else {
                res.status(404).json({
                    userCount
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                Error: err,
                Success: false
            })
        })
}

const postUser = async (req, res) => {
    var { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    var user = new User({
        name,
        email,
        passwordHash,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country
    })

    user.save()
        .then((newUser) => {
            res.status(201).json({
                Success: true,
                message: `User created`,
                newUser
            });
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                Error: err
            });
        })
}

const updateUser = async (req, res) => {

    var id = req.params.id;
    let { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;
    let passwordHash;
    const userExist = User.findById(id);

    if (!userExist) {
        return res.status(404).json({
            Success: false,
            message: "User not found"
        })
    }
    if (password) {
        passwordHash = await bcrypt.hash(password, 10);
    }
    else {
        passwordHash = userExist.passwordHash;
    }

    var user = {
        name,
        email,
        passwordHash,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country
    }

    User.findByIdAndUpdate(id, user, { new: true })
        .then((newUser) => {
            res.status(201).json({
                Success: true,
                message: `User is updated`,
                newUser
            });
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                Error: err
            });
        })
}

const deleteUser = (req, res) => {
    var id = req.params.id;

    User.findByIdAndRemove(id)
        .then((deletedUser) => {
            if (deletedUser) {
                res.status(200).json({
                    Success: true,
                    message: `The user ${deletedUser.name} is deleted`,
                })
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: `The user is not found`
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                Success: false,
                Error: err
            })
        })
}

const postSignUp = async (req, res) => {

    var { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;

    password = toString(password)
    const passwordHash = await bcrypt.hash(password, 10);

    var user = new User({
        name,
        email,
        passwordHash,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country
    })

    user.save()
        .then((newUser) => {
            res.status(201).json({
                Success: true,
                message: `New user with email ${newUser.email} is created`,
                newUser
            });
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                Error: err
            });
        })
}

const postLogIn = async (req, res) => {

    var { email, password } = req.body;

    let user = {};

    try {
        user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                Success: false,
                message: 'User is not registered'
            })
        }
    } catch (error) {
        return res.status(500).json({
            Success: false,
            Error: error
        })
    }
    password = toString(password)
    if (user && bcrypt.compareSync(password, user.passwordHash)) {

        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        let data = {
            userId: user.id,
            isAdmin: user.isAdmin
        };
        let expiresIn = {
            expiresIn: "12h"
        };

        const token = jwt.sign(data, jwtSecretKey, expiresIn);

        res.status(200).json({
            Success: true,
            message: "Log in Successful",
            token
        })
    }
    else {
        res.status(401).json({
            Success: false,
            message: "Invalid username or password"
        })
    }

}

module.exports = { getUsers, getUser, getUsersCount, postUser, updateUser, deleteUser, postSignUp, postLogIn }