const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");


// SIGNUP
router.post("/signup", async (req, res) => {
try {

const { username, email, password } = req.body;

if(!username || !email || !password){
return res.json({message:"All fields are required"});
}

const existingUser = await User.findOne({ email });

if(existingUser){
return res.json({message:"User already exists"});
}

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
username,
email,
password: hashedPassword
});

await newUser.save();

res.json({message:"Signup successful"});

} catch (err) {

console.log(err);
res.status(500).json({message:"Server error"});

}
});


// LOGIN
router.post("/login", async (req, res) => {

try {

const { email, password } = req.body;

if(!email || !password){
return res.json({message:"All fields are required"});
}

const user = await User.findOne({ email });

if(!user){
return res.json({message:"Invalid email or password"});
}

const match = await bcrypt.compare(password, user.password);

if(!match){
return res.json({message:"Invalid email or password"});
}

res.json({
message:"Login successful",
username: user.username
});

} catch (err) {

console.log(err);
res.status(500).json({message:"Server error"});

}
});

module.exports = router;