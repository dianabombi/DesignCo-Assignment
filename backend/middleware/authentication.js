const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({
                msg: "Unauthorized: Token not found.",
            });
        }

        const clientToken = authHeader.split(" ")[1];
        if (!clientToken) {
            return res.status(401).send({
                msg: "Unauthorized: Malformed token.",
            });
        }

        const decoded = jwt.verify(clientToken, process.env.SECRET_KEY);

        req.user = decoded;
        next();

    } catch (error) {
        console.error("Token verification error:", error);

        const errorMessage =
            error.name === "TokenExpiredError"
                ? "Unauthorized: Token has expired."
                : "Unauthorized: Invalid token.";

        return res.status(401).send({
            msg: errorMessage,
            error: error.message,
        });
    }
}

module.exports = verifyToken;