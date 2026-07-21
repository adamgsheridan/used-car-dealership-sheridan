import { getVehicles, getAllCategories, getVehicleById, getImagesByVehicleId } from '../models/vehicles.js';

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

        res.render('vehicle-details', { vehicle, images });
    } catch (err) {
        next(err);
    }
}