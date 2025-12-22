import { asyncHandler } from "../Utilities/asyncHandler.js";
import { errorHandler } from "../Utilities/errorHandler.js";
import jwt from "jsonwebtoken"


export const isAuthenticated = asyncHandler(async (req, res, next) => {
     
    console.log("Auth middleware triggered for:", req.originalUrl);

    console.log("Cookies received:", req.cookies);
    
    const token = req.cookies?.token

    if (!token) return next(new errorHandler("Unauthorized: Token missing", 401));

    try {
        const tokenData = jwt.verify(token, process.env.SECRET_KEY);
        req.user = tokenData;
        next();
    } catch (err) {
        return next(new errorHandler("Invalid or expired token", 401));
    }
});