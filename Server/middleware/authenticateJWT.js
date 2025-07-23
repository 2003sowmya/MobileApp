const jwt = require('jsonwebtoken');

// Secret for signing and verifying JWTs (from environment variables)
const jwtSecret = process.env.SECRET; // The secret is stored in the .env file

// Middleware function to authenticate JWT
function authenticateJWT(req, res, next) {
    // Get the token from the cookies
    const token = req.cookies.token;

    // If no token is provided in cookies, deny access
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    // Verify the token using the secret
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            // If there's an error in verifying the token, return a 403 status
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // If token is valid, attach user information to the request object
        req.user = user;

        // Call next middleware or route handler
        next();
    });
}

module.exports = authenticateJWT;
