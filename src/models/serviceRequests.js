import pool from './db.js';

export async function createRequest({ userId, vehicleId, description }) {
    const result = await pool.query(`
        INSERT INTO service_requests (user_id, vehicle_id, description, status)
        VALUES ($1, $2, $3, 'pending')
        RETURNING *
    `, [userId, vehicleId || null, description]);
    
    return result.rows[0];
}

export async function getServiceRequestsByUserId(userId) {
    return result.rows;
}