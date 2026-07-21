import pool from './db.js';
import bcrypt from 'bcrypt';

export async function createUser({ firstName, lastName, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
        INSERT INTO users (first_name, last_name, email, password_hash, role)
        VALUES ($1, $2, $3, $4, 'customer')
        RETURNING id, first_name, last_name, email, role
    `, [firstName, lastName, email, hashedPassword]);

    return result.rows[0];
}

export async function findUserByEmail(email) {
    const result = await pool.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

    return result.rows[0];
}

export async function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}