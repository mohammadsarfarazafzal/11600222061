import { ApiError } from "../utils/ApiError.js";
import Log from "../../Logging Middleware/logger.js";

const validateUrl = (req, res, next) => {
  const { url, customExpiry } = req.body;
  
  if (!url) {
    Log("backend", "error", "middleware", "URL validation failed: URL is required");
    throw new ApiError(400, "URL is required");
  }

  
  const urlPattern = /^https?:\/\/.+\..+/;
  if (!urlPattern.test(url)) {
    Log("backend", "error", "middleware", `URL validation failed: Invalid URL format - ${url}`);
    throw new ApiError(400, "Please enter a valid URL starting with http:// or https://");
  }

  
  if (customExpiry) {
    const expiryDate = new Date(customExpiry);
    if (isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {
      Log("backend", "error", "middleware", `URL validation failed: Invalid expiry date - ${customExpiry}`);
      throw new ApiError(400, "Expiry date must be in the future");
    }
  }

  next();
};

export {validateUrl};