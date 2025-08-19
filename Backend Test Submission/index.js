import connectDB from "./db/server.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
});

const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at port: ${port}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed in index.js", error);
});