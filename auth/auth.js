const jwt = require("jsonwebtoken");

/*
   Middleware for protected routes
*/
function authenticateUser(req, res, next) {

    // Get token from header
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            error: "Access denied. No token provided."
        });
    }

    // Extract Bearer token
    const token = authHeader.split(" ")[1];

    try {

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user info to request
        req.user = {
            id: decoded.userId,
            role: decoded.role
        };

        next();

    } catch (err) {

        return res.status(403).json({
            error: "Invalid or expired token"
        });
    }
}

module.exports = authenticateUser;