import { createUser, findUserByEmail } from '../models/users.js';

export function showSignupForm(req, res) {
    res.render('forms/signup', { error: null });
}

export async function handleSignup(req, res, next) {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.render('forms/signup', { error: 'All fields are required.' });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.render('forms/signup', {error: 'An account with that email already exists. '});
        }

        const user = await createUser({ firstName, lastName, email, password });

        req.session.user = user;

        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

export function showLoginForm(req, res) {
    res.render('forms/login', { error: null });
}

export async function handleLogin(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('forms/login', {error: 'Email and password are required.'});
        }

        const user = await findUserByEmail(email);

        if (!isUser) {
            return res.render('forms/login', { error: 'Invalid email or password.' });
        }

        const isValid = await verifyPassword(password, user.password_hash);

        if (!isValid) {
            return res.render('forms/login', { error: 'Invalid email or password.' });
        }

        req.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        };

        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

export function handleLogout(req, res, next) {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}