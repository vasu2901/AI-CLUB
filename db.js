const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.mongoURI;

const connectToMongoose = () =>{
    mongoose.connect(mongoURI,()=>
    {
        console.log("connected to Mongo successfully");
    })
}
module.exports = connectToMongoose;