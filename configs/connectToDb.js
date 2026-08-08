import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return true
        } else {
            await mongoose.connect("mongodb://localhost:27017/next-auth")
            console.log("Connected To Database Successfully!")
        }
    } catch (err) {
        console.log(err)
    }
}

export default connectToDB