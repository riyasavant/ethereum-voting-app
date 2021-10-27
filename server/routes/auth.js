const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
const User = require('../models/user');

router.get('/verifyAuth', verifyToken, (req, res) => {
  res.json({ isLoggedIn: true });
});

router.post('/login', async (req, res) => {
  const user = req.body;

  User.findOne({ aadhar: user.aadhar })
  .then(dbUser => {

    // User not found case
    if(!dbUser) {
      res.status(401).json({ message: "Invalid Aadhar or Password" })
    } 
    
    // User with given username exists
    else {
      bcrypt.compare(user.password, dbUser.password)
      .then(isMatching => {

        // When the details are correct, we create a token and send it back
        if(isMatching) {
          const payload = {
            id: dbUser._id,
            aadhar: dbUser.aadhar,
            voted: dbUser.voted
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 86400},
            (error, token) => {
              if(error) return res.json({message: error})
              return res.status(200).json({
                message: "Logged in successfully",
                token: "Bearer " + token
              })
            }
          ) 
        } 
        
        // The password does not match
        else {
          res.status(401).json({ message: "Invalid Password"});
        }
      })
    }
  })
});

router.post('/register', async (req, res) => {
  const user = req.body;

  // Check if username already exists
  const oldUser = await User.findOne({ aadhar: user.aadhar });

  if(oldUser) {
    res.status(401).json({message: "Aadhar already registered"});
  } else {

    // 10 Salt rounds
    user.password = await bcrypt.hash(req.body.password, 10);

    // passwoord + salt -> Hash + salt -> Hash

    const newUser = new User({
      aadhar: user.aadhar,
      password: user.password,
      isVerified: true,
      voted: false
    });

    newUser.save();
    res.status(200).json({message: "Registered successfully"});
  }
});

module.exports = router;