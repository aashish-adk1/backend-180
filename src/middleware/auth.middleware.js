import { verifyToken } from "../utils/jwt.js";

const unauthorized = (res) => {
    return res.status(401).json({
        success: false,
        message: "Unauthorized",
    });
}

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return unauthorized(res);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;

        next();
    } catch (err) {
        return unauthorized(res);
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return unauthorized(res);
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        next();
    };
};

