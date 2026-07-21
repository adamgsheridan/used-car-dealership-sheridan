import pool from './db.js';

export async function createServiceRequest({ userId, vehicleId, description }) {
    const result = await pool.query(`
        INSERT INTO service_requests (user_id, vehicle_id, description, status)
        VALUES ($1, $2, $3, 'pending')
        RETURNING *
    `, [userId, vehicleId || null, description]);
    
    return result.rows[0];
}

export async function getServiceRequestsByUserId(userId) {
    const result = await pool.query(`
        SELECT service_requests.*, vehicles.make, vehicles.model, vehicles.year
        FROM service_requests
        LEFT JOIN vehicles ON service_requests.vehicle_id = vehicles.id
        WHERE service_requests.user_id = $1
        ORDER BY service_requests.requested_at DESC
    `, [userId]);
    
    return result.rows;
}