import mongoose from "mongoose";
import Log from "../../Logging Middleware/logger.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected, host: ${connectionInstance.connection.host}`);
        Log("backend", "info", "db", `MongoDB connected, host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed to server.", error);
        Log("backend", "error", "db", `MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;