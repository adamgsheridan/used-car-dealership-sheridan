import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import routes from './src/controllers/routes.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: true,
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
})

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});