const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://codewithvaibhav:Demo123@ac-3y2bipn-shard-00-00.0hreltm.mongodb.net:27017,ac-3y2bipn-shard-00-01.0hreltm.mongodb.net:27017,ac-3y2bipn-shard-00-02.0hreltm.mongodb.net:27017/?ssl=true&replicaSet=atlas-waj6ra-shard-0&authSource=admin&appName=News");

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

//