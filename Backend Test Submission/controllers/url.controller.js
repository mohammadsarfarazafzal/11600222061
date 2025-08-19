import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UrlShortener } from "../utils/UrlShortener.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import Log from "../../Logging Middleware/logger.js";

const shortUrl = AsyncHandler(async (req, res)=>{
    try {

        const { url, validity, shortcode } = req.body;

        const urlExist = Url.findOne({ shortUrl: shortcode });

        let exist = false;

        if(!urlExist){
            exist = true;
        }
        
        const shortUrl = exist? await new UrlShortener().generateShortCode() : shortcode;
    
        let expiresAt;
        if (validity) {
            expiresAt = new Date(validity);
        } else {
            expiresAt = new Date(Date.now() + (30 * 60 * 1000));        }

        const urlEntry = new Url({
        originalUrl: url,
        shortUrl,
        expiresAt
        });

        await urlEntry.save();
        exist? Log("backend", "info", "service", `Short URL already exists, new created: ${shortUrl}`):Log("backend", "info", "service", `Short URL created: ${shortUrl}`);
        
        if(exist) {
            return res.status(200).json(
                new ApiResponse(200, urlEntry, "Short URL already exists, returning new entry.")
            );    
        }
        
        return res.status(200).json(
            new ApiResponse(200, urlEntry, "Url shortening completed.")
        );
        
    } catch (error) {
        Log("backend", "error", "service", `Error creating short URL: ${error.message}`);
        console.error('Error creating short URL:', error);
    
        if (error.code === 11000) {
            Log("backend", "error", "service", `Error creating unique short URL: ${error.message}`)
            throw new ApiError(500, "Failed to generate unique short code. Please try again.");
        }
        
        Log("backend", "error", "service", `Internal server error: ${error.message}`);
        throw new ApiError(500, "Internal server error. Please try again later.");
    }
});

const redirect = AsyncHandler(async (req, res)=>{
    try {
        const { shortUrl } = req.params;
        
        if (!/^[a-zA-Z0-9]+$/.test(shortUrl)) {
            Log("backend", "error", "service", `Invalid short code format: ${shortUrl}`);
            throw new ApiError(404, "Invalid short code format");
        }

        const urlEntry = await Url.findOne({shortUrl});

        if (!urlEntry) {
            Log("backend", "error", "service", `URL not found for short code: ${shortUrl}`);
            throw new ApiError(404, "URL not found or expired");
        }

        Log("backend", "info", "service", `Redirecting to original URL: ${urlEntry.originalUrl} for short code: ${shortUrl}`);
        res.redirect(301, urlEntry.originalUrl);
        
    } catch (error) {
        Log("backend", "error", "service", `Error during redirection: ${error.message}`);
        console.error("Redirection failed", error);
        throw new ApiError(500, "Internal server error");
    }
});

export {shortUrl, redirect}