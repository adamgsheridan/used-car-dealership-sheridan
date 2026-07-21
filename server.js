import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './src/models/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Home page
app.get("/", (req, res) => {
    res.render("home");
});

// Inventory Page
app.get("/inventory", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT vehicles.*, 
            categories.name AS category_name,
            vehicle_images.image_url
            FROM vehicles
            LEFT JOIN categories ON vehicles.category_id = categories.id
            LEFT JOIN vehicle_images
                ON vehicles.id = vehicle_images.vehicle_id
                AND vehicle_images.is_primary = true
            ORDER BY vehicles.created_at DESC
            `);
        res.render("inventory", {vehicles: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading inventory");
    }
});

// Financing Page
app.get("/financing", (req, res) => {
    res.render("financing");
});

// Trade In Page
app.get("/tradein", (req, res) => {
    res.render("tradein");
});

// About Page
app.get("/about", (req, res) => {
    res.render("about");
});

// Contact Page
app.get("/contact", (req, res) => {
    res.render("contact");
});

// Database Test Route
app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM vehicles");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Database connection failed: " + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});