import { getVehicles, getAllCategories } from '../models/vehicles.js';

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