require("dotenv").config();
var userUpdateRoutes=require('./routes/user-update');
var userRoutes=require('./routes/user');
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//DB Connection
mongoose
.connect(process.env.DATABASE, {})
.then(() => {
console.log("DB CONNECTED");
});
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api',userUpdateRoutes);
app.use('/api',userRoutes);
//PORT
const port = process.env.PORT || 8000;
//Starting a server
app.listen(port, () => {
console.log(`app is running at ${port}`);
});