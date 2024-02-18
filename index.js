const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = require('./App');
console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection to MongoDB failed:", err));



