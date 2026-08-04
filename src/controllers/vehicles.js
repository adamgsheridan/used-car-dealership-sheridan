import { getVehicles, getAllCategories, getVehicleById, getImagesByVehicleId, updateVehicle } from '../models/vehicles.js';
import { getReviewsByVehicleId } from '../models/reviews.js';

export async function showInventory(req, res, next) {
    try {
        const { category } = req.query;
        const vehicles = await getVehicles(category);
        const categories = await getAllCategories();

        res.render('inventory', {
            vehicles,
            categories,
            selectedCategory: category || null
        });
    } catch (err) {
        next(err);
    }
}

export async function showVehicleDetail(req, res, next) {
    try {
        const { id } = req.params;
        const vehicle = await getVehicleById(id);

        if (!vehicle) {
            return res.status(404).render('errors/404');
        }

        const images = await getImagesByVehicleId(id);
        const reviews = await getReviewsByVehicleId(id);

        res.render('vehicle-details', { vehicle, images, reviews });
    } catch (err) {
        next(err);
    }
}

export async function showManageVehicles(req, res, next) {
    try {
        const vehicles = await getVehicles();
        res.render('dashboard/vehicles', { vehicles });
    } catch (err) {
        next(err);
    }
}

export async function showEditVehicleForm(req, res, next) {
    try {
        const { id } = req.params;
        const vehicle = await getVehicleById(id);
        const categories = await getAllCategories();

        if (!vehicle) {
            return res.status(404).render('errors/404');
        }

        res.render('dashboard/edit-vehicle', { vehicle, categories, error: null });
    } catch (err) {
        next(err);
    }
}

export async function handleEditVehicle(req, res, next) {
    try {
        const { id } = req.params;
        const { make, model, year, price, mileage, description, categoryId } = req.body;

        if (!make || !model || !year || !price) {
            const vehicle = await getVehicleById(id);
            const categories = await getAllCategories();
            return res.render('dashboard/edit-vehicle', {
                vehicle,
                categories,
                error: 'Make, model, year, and price are required.'
            });
        }

        await updateVehicle(id, { make, model, year, price, mileage, description, categoryId });

        res.redirect('/dashboard/vehicles');
    } catch (err) {
        next(err);
    }
}