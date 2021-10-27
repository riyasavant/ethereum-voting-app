const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get('/getData', verifyToken, (req, res) => {
    res.json({ isLoggedIn: true, voted: req.user.voted, aadhar: req.user.aadhar });
});

module.exports = router;