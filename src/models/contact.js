import pool from './db.js';

export async function createContactMessage({ name, email, message }) {
    const result = await pool.query(`
        INSERT INTO contact_messages (name, email, message)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [name, email, message]);

    return result.rows[0];
}