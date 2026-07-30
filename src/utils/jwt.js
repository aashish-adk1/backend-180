import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "15m",
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}