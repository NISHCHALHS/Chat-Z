const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);

mongoose.connect(" mongodb+srv://NISHCHALHS:<Nishchalhs9844>@cluster0.rv4syvw.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(3000, () => {
console.log("Server running on port 3000");
});
