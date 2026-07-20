import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../utils/hashPassword.js';

export const registerUserService = async ({ fullName, email, password, role }) => {
    const normalizedEmail = email.toLowerCase().trim();
    const existingEmailQueryText = 'SELECT 1 FROM users WHERE email = $1 LIMIT 1';
    const queryResult = await pool.query(existingEmailQueryText, [normalizedEmail]);
    if (queryResult.rows.length > 0) {
        const error = new Error("User with this email already exists");
        error.statusCode = 409;
        throw error;
    }
    
    const hashedPassword = await hashPassword(password);
    const insertUserQueryText = 'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id,full_name,email,role,created_at,updated_at';
    const newUser = await pool.query(insertUserQueryText, [fullName, normalizedEmail, hashedPassword, role]);

    return newUser.rows[0];

};