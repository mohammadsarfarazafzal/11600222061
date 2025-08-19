import connectDB from "./db/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import Log from "../Logging Middleware/logger.js";

dotenv.config({
    path:'./.env'
});

const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at port: ${port}`);
        Log("server", "info", "app", `Server is running at port: ${port}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed in index.js", error);
    Log("server", "error", "app", `MongoDB connection failed: ${error.message}`);
});