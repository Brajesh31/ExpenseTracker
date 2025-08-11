const mongoose = require("mongoose");
require('dotenv').config();

async function main(){
    await mongoose.connect(process.env.DB_URL);
    console.log("Db connected sucessfully !");
}


module.exports = main ;