import { Router } from "express";
import { validateUrl } from "../middlewares/validate.middlewares.js";
import { shortUrl, redirect } from "../controllers/url.controller.js";

const router = Router();

router.route("/shorturls").post(validateUrl, shortUrl);
router.route("/:shortUrl").get(redirect);

export default router;