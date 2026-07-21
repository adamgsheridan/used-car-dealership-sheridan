import { createContactMessage } from '../models/contact.js';

export function showContactForm(req, res) {
    res.render('contact', {error: null, success: false });
}

export async function handleContactForm(req, res, next) {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message || message.trim().length === 0) {
            return res.render('contact', {error: 'All fields are required.', success: false });
        }

        await createContactMessage({ name, email, message: message.trim() });

        res.render('contact', { error: null, success: true });
    } catch (err) {
        next(err);
    }
}