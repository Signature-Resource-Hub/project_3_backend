require("dotenv").config();
var userUpdateRoutes=require('./routes/user-update');
var propertyRoutes=require('./routes/properties')
var jobRoutes = require('./routes/job')
var userRoutes=require('./routes/user');
var categoryRoutes=require('./routes/category');
var subCategoryRoutes=require('./routes/subCategory');
var serviceRoute=require('./routes/services');
 
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
app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api',userUpdateRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',subCategoryRoutes);
app.use('/api',serviceRoute);

app.use('/api',propertyRoutes);
app.use('/api',jobRoutes);
//PORT
const port = process.env.PORT || 8000;
//Starting a server
app.listen(port, () => {
console.log(`app is running at ${port}`);
});