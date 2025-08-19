import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + (30 * 60 * 1000))
    }
},{timestamps:true});

export const Url = mongoose.model("Url", urlSchema);