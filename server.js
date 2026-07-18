import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

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
app.get("/inventory", (req, res) => {
    res.render("inventory");
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

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
