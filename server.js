import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './src/controllers/routes.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

// Home page
// app.get("/", (req, res) => {
//     res.render("home");
// });

// // Inventory Page
// app.get("/inventory", async (req, res) => {
//     try {
//         const { category } = req.query;
//         let query = `
//             SELECT vehicles.*, 
//                 categories.name AS category_name,
//                 vehicle_images.image_url
//             FROM vehicles
//             LEFT JOIN categories ON vehicles.category_id = categories.id
//             LEFT JOIN vehicle_images
//                 ON vehicles.id = vehicle_images.vehicle_id
//                 AND vehicle_images.is_primary = true
//         `;
//         const params = [];

//         if (category) {
//             query += ` WHERE categories.name = $1`;
//             params.push(category);
//         }

//         query += ` ORDER BY vehicles.created_at DESC`;

//         const result = await pool.query(query, params);
//         const categoriesResult = await pool.query(`SELECT * FROM categories ORDER BY name`);

//         res.render("inventory", {
//             vehicles: result.rows,
//             categories: categoriesResult.rows,
//             selectedCategory: category || null
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error loading inventory");
//     }
// });

// // Financing Page
// app.get("/financing", (req, res) => {
//     res.render("financing");
// });

// // Trade In Page
// app.get("/tradein", (req, res) => {
//     res.render("tradein");
// });

// // About Page
// app.get("/about", (req, res) => {
//     res.render("about");
// });

// // Contact Page
// app.get("/contact", (req, res) => {
//     res.render("contact");
// });

// // Database Test Route
// app.get("/db-test", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM vehicles");
//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Database connection failed: " + err.message);
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});