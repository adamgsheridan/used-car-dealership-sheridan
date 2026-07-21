import pool from './db.js'

export async function getVehicles(category) {
    let query = `
    SELECT vehicles.*,
        categories.name AS category_name,
        vehicle_images.image_url
    FROM vehicles
    LEFT JOIN categories ON vehicles.category_id = categories.id
    LEFT JOIN vehicle_images
        ON vehicles.id = vehicle_images.vehicle_id
        AND vehicle_images.is_primary = true
    `;
    const params = [];

    if (category) {
        query += ' WHERE categories.name = $1 ';
        params.push(category);
    }

    query += 'ORDER BY vehicles.created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
}

export async function getAllCategories() {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
}

export async function getVehicleById(id) {
    const result = await pool.query(`
        SELECT vehicles.*, categories.name AS category_name
        FROM vehicles
        LEFT JOIN categories ON vehicles.category_id = categories.id
        WHERE vehicles.id = $1
    `, [id]);
    return result.rows[0];
}

export async function getImagesByVehicleId(id) {
    const result = await pool.query(`
        SELECT * FROM vehicle_images WHERE vehicle_id = $1
    `, [id]);

    return result.rows;
}