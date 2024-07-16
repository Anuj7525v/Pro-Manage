const bcrypt = require('bcryptjs');
const User = require('../model/user');
//const AppError = require('../utils/AppError');
//const catchAsync = require('../utils/catchAsync');

const filterObject = (obj, arr) => {
  const updatedObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      updatedObj[key] = obj[key];
    }
  });

  return updatedObj;
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(400).send("User not Found");
    }

    res.status(200).json({
      status: 'success',
      data: { info: { name: user.name, email: user.email, _id: user._id } },
    });
  }
  catch (err) {
    next(err);
  }
};


const updateUser = async (req, res, next) => {
  try {
    const { name, email, newPassword, oldPassword } = req.body;
    let hashPassword;

    if (newPassword) {
      if (!oldPassword) {
        res.status(400).send('You must provide your current password to update your password.');
      }

      const user = await User.findById(req.user._id).select('+password');

      if (!(await user.comparePasswords(oldPassword, user.password))) {
        res.status(400).send('Your Old password is incorrect');
      }

      hashPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedObj = filterObject({ name, email, password: hashPassword }, ['password', 'name', 'email']);

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedObj, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser },
    });
  }
  catch (err) {
    next(err);
  }

};

module.exports = {getUser,updateUser};