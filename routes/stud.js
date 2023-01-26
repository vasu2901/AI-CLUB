const express = require('express');
const bcrypt = require('bcryptjs')
const fetchUser = require("../middleware/fetchUser");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
//Signup.
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
], async (req, res) => {

    let success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user already exists!" })
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: secpass
        })
        const data = {
            user: {
                id: user._id
            }
        }
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authtoken });
    }
    catch (err) {
        return res.status(400).json({ error: err, message: "User exists" });
    }
})

// Login
router.post('/loginuser', [
    body('email').exists(),
    body('password').exists()
], async (req, res) => {
    const success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: success, error: "Please enter your valid credentials" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(404).json({ success: success, error: "Please enter your valid credentials" });
        }
        const data = {
            user: {
                id: user._id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({ success: true, authtoken: authtoken });
    }
    catch (err) {

        console.log(err.message);
        return res.status(500).send("Internal Server Error");
    }
})

// For getting details of a particular club member. Can only be done by admin.
router.post('/getuser', fetchUser, async (req, res) => {

    try {
        let note = await User.findById(req.user.id);
        if (note.name === 'Admin') {
            const user = await User.findOne({ email: req.body.email })
            res.json(user);
        }
        else {
            res.json(note);
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Internal Server Error");
    }
})
// for updating club member's phone number. This will only be done by the club member.
router.post("/updateuser", fetchUser, async (req, res) => {
    const { phone } = req.body;
    //creating new note;
    const newnote = {}
    if (phone) { newnote.phone = phone };
    //Find the note to be updated and update it.
    let note = await User.findById(req.user.id);
    if (!note) {
        res.status(404).send("Not Found");
    }
    if (note.id.toString() !== req.user.id) {
        res.status(404).send("Not allowed");
    }
    note = await User.findByIdAndUpdate(req.user.id, { $set: newnote }, { new: true });
    res.json(note);

})

// for fetching all records
router.get("/getalluser", fetchUser, async (req, res) => {
    const { phone } = req.body;
    //creating new note;
    const newnote = {}
    if (phone) { newnote.phone = phone };
    //Find the note to be updated and update it.
    let note = await User.findById(req.user.id);
    if (!note) {
        res.status(404).send("Not Found");
    }
    if (note.id.toString() !== req.user.id && note.name !== 'admin') {
        res.status(404).send("Not allowed");
    }
    note = await User.find();
    res.json(note);

})
module.exports = router