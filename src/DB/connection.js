import mongoose from "mongoose";



const connectDB = async () => {
    return await mongoose.connect(process.env.MONGO_URL).then(result => {
        console.log("Database Connected ...........");

    }).catch(err => {
        console.log(err)
    })
}

export default connectDB