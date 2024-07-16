const express = require('express');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req, res, next) => {
  try {
    const { email, name, password, confirmPassword } = req.body;
    if (!name || !email || !confirmPassword || !password) {
      return res.status(400).send("Please fill all the fields");
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).send("User already exist");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("Password  does not match");
    }

    const hashPassword = ((await bcrypt.hash(password, 10)) && (await bcrypt.hash(confirmPassword, 10)));

    const newUser = new User({
      name, email, password: hashPassword, confirmPassword: hashPassword
    });
    await newUser.save();
    res.status(200).send("User registered successfully");
  }
  catch (error) {
    next(error)
  }

};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email,password,req.body);

    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
     
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.bcrypt.comparePasswords(password, user.password))) {
      return res.status(400).send("Invalid Email or Password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.Secret_Key, {
      expiresIn: "240h",
    });

    res.status(200).json({
      message: 'success',
      token,
      userId:user._id,
      name:user.name,
      email:user.email,
    });
  }
  catch (error) {
    next(error)
  }
};

module.exports= { register, login};

