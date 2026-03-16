const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);

mongoose.connect("mongodb+srv://NISHCHALHS:Nishchalhs9844@cluster.mongodb.net/chatz")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});