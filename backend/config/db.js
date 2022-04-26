const mongoose = require('mongoose')
const colors = require('colors')

const conntctDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB conntcted: ${conn.connection.host}`.black.underline.bgGreen);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bgYellow.bold)
    process.exit(1)
  }
}

module.exports = conntctDB 