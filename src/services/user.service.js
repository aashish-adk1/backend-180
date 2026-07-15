import { pool } from '../config/db.js';
export const registerUserService = async ({ full_name, email, password, role }) => {
    const queryText = 'SELECT 1 FROM users WHERE email = $1 LIMIT 1';
    const queryResult = await pool.query(queryText, [email.toLowerCase().trim()]);
    if (queryResult.rows.length > 0) {
        const error = new Error("User with this email already exists");
        error.statusCode = 409;
        throw error;
    }
};