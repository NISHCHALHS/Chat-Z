const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/chatsz")
.then(()=>console.log("Database connected"))
.catch(err=>console.log(err));

app.post("/signup", async (req,res)=>{

try{

const {username,email,password} = req.body;

const newUser = new User({
username,
email,
password
});

await newUser.save();

res.json({message:"Signup successful"});

}catch(err){

res.json({message:"User already exists"});

}

});

app.post("/login", async (req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email,password});

if(user){
res.json({message:"Login successful"});
}else{
res.json({message:"Invalid email or password"});
}

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});