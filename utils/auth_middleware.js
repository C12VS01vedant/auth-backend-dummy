const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const bearer = token.split(" ");
        if (bearer.length !== 2 || bearer[0] !== "Bearer") {
            return res.status(400).json({ message: "Invalid token format" });
        }

        const verified = jwt.verify(bearer[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token" });
    }
};
