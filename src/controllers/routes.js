import express from 'express';
import { showHome, showFinancing, showTradein, showAbout } from './pages.js';
import { showInventory, showVehicleDetail, showManageVehicles, showEditVehicleForm, handleEditVehicle } from './vehicles.js';
import { showSignupForm, handleSignup, showLoginForm, handleLogin, handleLogout } from './auth.js';
import { submitReview, removeReview } from './reviews.js';
import { isLoggedIn, isEmployee } from '../middleware/auth.js';
import { showServiceRequestForm, handleServiceRequest, showMyServiceRequests } from './serviceRequests.js';
import { showContactForm, handleContactForm } from './contact.js';
import { showDashboardHome } from './dashboard.js';
import { showModerateReviews, moderateDeleteReview } from './reviews.js';

const router = express.Router();

router.get('/', showHome);
router.get('/inventory', showInventory);
router.get('/financing', showFinancing);
router.get('/tradein', showTradein);
router.get('/about', showAbout);
router.get('/signup', showSignupForm);
router.post('/signup', handleSignup);
router.get('/login', showLoginForm);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.get('/vehicle/:id', showVehicleDetail);
router.post('/vehicle/:id/reviews', isLoggedIn, submitReview);
router.post('/vehicle/:id/reviews/:reviewId/delete', isLoggedIn, removeReview);
router.get('/service-requests', isLoggedIn, showServiceRequestForm);
router.post('/service-requests', isLoggedIn, handleServiceRequest);
router.get('/dashboard/service-requests', isLoggedIn, showMyServiceRequests);
router.get('/contact', showContactForm);
router.post('/contact', handleContactForm);
router.get('/dashboard', isEmployee, showDashboardHome);
router.get('/dashboard/vehicles', isEmployee, showManageVehicles);
router.get('/dashboard/vehicles/:id/edit', isEmployee, showEditVehicleForm);
router.post('/dashboard/vehicles/:id/edit', isEmployee, handleEditVehicle);
router.get('/dashboard/reviews', isEmployee, showModerateReviews);
router.post('/dashboard/reviews/:reviewId/delete', isEmployee, moderateDeleteReview);

export default router;