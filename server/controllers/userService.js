const User = require('../models/userModel');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');
const asyncHandler = require('express-async-handler');


// @desc     Sign up a user
// @route   GET /api/users/signup
// @access  Public
exports.signup = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = createToken(user._id);

  res.status(201).json({
    status: 'success',
    data: user,
    token,
  });
});

// @desc     Login a user
// @route   GET /api/users/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Email or password is incorrect', 401));
  }

  const token = createToken(user._id);

    const userData = {
    _id: user._id,
    name: user.name,       // Ensure this exists in your schema
    email: user.email,
    // add other fields if needed
  };


  res.status(200).json({
    status: 'success',
    data: userData,
    token,
  });
});

exports.getUser = asyncHandler(async(req,res)=>{

  const user = await User.findById(req.params.id)

  if(!user){
    return next(new ApiError('User not found',404))
  }

  res.status(200).json({
    status: 'success',
    data: user,
  })

})


exports.getAllUsers = asyncHandler(async(req,res)=>{
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    count: users.length,
    data: users,
  })
})