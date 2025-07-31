const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.registerValidator = [
  check('name')
    .notEmpty()
    .withMessage('User Required')
    .isLength({ min: 3 })
    .withMessage('Too short name'),
  check('email')
    .notEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email is already used'));
        }
      })
    ),
  check('password')
    .notEmpty()
    .withMessage('please enter your password')
    .isLength({ min: 6 })
    .withMessage('Password is too short'),
  // .custom((password, { req }) => {
  //   if (password !== req.body.passwordConfirm) {
  //     throw new Error('Password Confirmation is incorrect');
  //   }
  //   return true;
  // }),
  validatorMiddleware,
];

exports.loginValidation = [
  check('email')
    .isEmail()
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Please enter your email'),

  check('password').notEmpty().withMessage('Please enter your password'),

  validatorMiddleware,
];

exports.getUserValidation = [
  check('id').isMongoId().withMessage('Invalid user id'),
  validatorMiddleware,
]
