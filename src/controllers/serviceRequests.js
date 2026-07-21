import { createServiceRequest, getServiceRequestsByUserId } from '../models/serviceRequests.js';
import { getVehicles } from '../models/vehicles.js';

export async function showServiceRequestForm(req, res, next) {
    try {
        const vehicles = await getVehicles();
        res.render('forms/service-requests', { vehicles, error: null });
    } catch (err) {
        next(err);
    }
}

export async function handleServiceRequest(req, res, next) {
    try {
        const { vehicleId, description } = req.body;
        const userId = req.session.user.id;

        if (!description || description.trim().length === 0) {
            const vehicles = await getVehicles();
            return res.render('forms/service-requests', {
                vehicles,
                error: 'Please describe the service you need.'
            });
        }

        await createServiceRequest({ userId, vehicleId: vehicleId || null, description: description.trim() });

        res.redirect('/dashboard/service-requests');
    } catch (err) {
        next(err);
    }
}

export async function showMyServiceRequests(req, res, next) {
    try {
        const userId = req.session.user.id;
        const requests = await getServiceRequestsByUserId(userId);

        res.render('dashboard/service-requests', { requests });
    } catch (err) {
        next(err);
    }
}