import express from 'express';
import { showHome, showFinancing, showTradein, showAbout, showContact } from './pages.js';
import { showInventory } from './vehicles.js';
import { showSignupForm, handleSignup, showLoginForm, handleLogin, handleLogout } from './auth.js';

const router = express.Router();

router.get('/', showHome);
router.get('/inventory', showInventory);
router.get('/financing', showFinancing);
router.get('/tradein', showTradein);
router.get('/about', showAbout);
router.get('/contact', showContact);
router.get('/signup', showSignupForm);
router.post('signup', handleSignup);
router.get('/login', showLoginForm);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);

export default router;