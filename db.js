const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const MONGODB_URL = process.env.MONGODB_URL

const db = async () => {
    try{
        mongoose.connect('mongodb://localhost:27017/FileUpload')
        console.log(`mongodb connected : ${con.connection.host}`)
    } catch (error){
        console.error(error)
    }
    }


