import { pool } from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateAccessToken } from '../utils/jwt.js';

const normalizeEmail=(email)=>{
    return email.toLowerCase().trim();
}

export const registerUserService = async ({ fullName, email, password, role }) => {
    const normalizedEmail = normalizeEmail(email);
    const existingEmailQueryText = 'SELECT 1 FROM users WHERE email = $1 LIMIT 1';
    const queryResult = await pool.query(existingEmailQueryText, [normalizedEmail]);
    if (queryResult.rows.length > 0) {
        const error = new Error("User with this email already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await hashPassword(password);
    const insertUserQueryText = 'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id,full_name AS fullName,email,role,created_at AS createdAt,updated_at AS updatedAt';
    const newUser = await pool.query(insertUserQueryText, [fullName, normalizedEmail, hashedPassword, role]);
    const createdUser = newUser.rows[0];
    const token = generateAccessToken({
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role
    })
    return {
        user: createdUser,
        token: token
    };

};
export const loginUserService = async ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const queryText = ' SELECT id,full_name AS "fullName",email,password,role,created_at AS "createdAt",updated_at AS "updatedAt" FROM users WHERE email = $1';
    const queryResult = await pool.query(queryText, [normalizedEmail]);
    if (queryResult.rows.length === 0) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    const user = queryResult.rows[0];

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

     const { password: _, ...safeUser } = user;

    const token = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role
    })
    return {
        user: safeUser,
        token: token
    };

};