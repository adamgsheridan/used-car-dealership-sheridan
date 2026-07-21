import express from 'express';
import { showHome, showFinancing, showTradein, showAbout, showContact } from './pages.js';
import { showInventory } from './vehicles.js';

const router = express.Router();

router.get('/', showHome);
router.get('/inventory', showInventory);
router.get('/financing', showFinancing);
router.get('/tradein', showTradein);
router.get('/about', showAbout);
router.get('/contact', showContact);

export default router;