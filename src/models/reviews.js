import pool from './db.js';

export async function getReviewsByVehicleId(vehicleId) {
    const result = await pool.query(`
        SELECT reviews.*, users.first_name, users.last_name
        FROM reviews
        JOIN users ON reviews.user_id = users.id
        WHERE reviews.vehicle_id = $1
        ORDER BY reviews.created_at DESC
    `, [vehicleId]);

    return result.rows;
}

export async function createReview({userId, vehicleId, rating, comment }) {
    const result = await pool.query(`
        INSERT INTO reviews (user_id, vehicle_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [userId, vehicleId, rating, comment]);

        return result.rows[0];
}

export async function getReviewById(id) {
    const result = await pool.query(`
        SELECT * FROM reviews WHERE id = $1
    `, [id]);

    return result.rows[0];
}

export async function deleteReview(id) {
    await pool.query(`DELETE FROM reviews WHERE id = $1`, [id]);
}