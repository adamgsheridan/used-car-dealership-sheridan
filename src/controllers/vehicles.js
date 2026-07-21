import { getVehicles, getAllCategories, getVehicleById, getImagesByVehicleId } from '../models/vehicles.js';
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