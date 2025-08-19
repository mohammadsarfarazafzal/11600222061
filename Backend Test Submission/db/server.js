import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected, host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed to server.", error);
        process.exit(1);
    }
}

export default connectDB;