const router = require('express').Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const nodemailer = require('nodemailer');
const templates = require('../templates/template');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model');
const Session = require('../models/Session.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/session', (req, res) => {
  // we dont want to throw an error, and just maintain the user as null
  if (!req.headers.authorization) {
    return res.json(null);
  }
  // accessToken is being sent on every request in the headers
  const accessToken = req.headers.authorization;

  Session.findById(accessToken)
    .populate('user')
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: 'Session does not exist' });
      }
      return res.status(200).json(session);
    });
});

router.post('/signup', isLoggedOut, (req, res) => {
  // const { firstName, lastName, email, password, isTutor } = req.body;
  const {
    firstName,
    lastName,
    email,
    password,
    isTutor,
    countryOfOrigin,
    teachingExperience,
  } = req.body;

  if (!email) {
    return res.status(400).json({ errorMessage: 'Please provide your email.' });
  }
  // Search the database for a user with the email submitted in the form
  User.findOne({ email }).then((found) => {
    // If the user is found, send the message email is taken
    if (found) {
      return res.status(400).json({
        errorMessage: 'Email already taken. Use different email address.',
      });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword
        });
      })
      .then((user) => {
        Session.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          console.log({ session: session });
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .then(() => {
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.NODEMAILER_ACC,
            pass: process.env.NODEMAILER_PASS,
          },
        });

        transporter
          .sendMail({
            from: `Acaddemy Hacks <${process.env.NODEMAILER_ACC}>`,
            to: email,
            subject: 'Congrats, you are registered on Academy Hacks',
            text: 'Academy Hacks',
            html: templates.templateExample(`${firstName} ${lastName}`),
          })
          .then((info) => {
            console.log('Info from nodeamailer', info);
          })
          .catch((error) =>
            console.log(
              `Something went wrong during sending the email to the user: ${error}`
            )
          );
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              'Email need to be unique. The email you chose is already in use.',
          });
        }
        return res.json({ errorMessage: error.message });
      });
  });
});

router.post('/login', isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ errorMessage: 'Please provide your email.' });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).json({ errorMessage: 'Wrong credentials.' });
      }

      // If user is found based on the email, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: 'Wrong credentials.' });
        }
        Session.create({ user: user._id, createdAt: Date.now() }).then(
          (session) => {
            return res.json({ user, accessToken: session._id });
          }
        );
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.delete('/logout', (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: 'User was logged out' });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
