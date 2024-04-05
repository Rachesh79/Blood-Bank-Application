const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to MongoDB ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch{
        console.log(`MongoDB error ${error}`.bgRed.white);
    }
}

module.exports = connectDB