import { createReview, getReviewById, deleteReview, getAllReviews } from '../models/reviews.js';

export async function submitReview(req, res, next) {
    try {
        const { id: vehicleId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.session.user.id;

        if (!rating || !comment || comment.trim().length === 0) {
            return res.redirect(`/vehicle/${vehicleId}?error=Review+cannot+be+empty`);
        }

        await createReview({ userId, vehicleId, rating, comment: comment.trim() });

        res.redirect(`/vehicle/${vehicleId}`);
    } catch (err) {
        next(err);
    }
}

export async function removeReview(req, res, next) {
    try {
        const { reviewId, id: vahicleId } = req.params;
        const review = await getReviewById(reviewId);

        if (!review) {
            return res.status(404).render('errors/404');
        }

        if (review.user_id !== req.session.user.id &&
            req.session.user.role != 'admin'
        ) {
            return res.status(403).send('Forbidden');
        }

        await deleteReview(reviewId);

        res.redirect(`/vehicle/${vehicleId}`);
    } catch (err) {
        next(err);
    }
}

export async function showModerateReviews(req, res, next) {
    try {
        const reviews = await getAllReviews();
        res.render('dashboard/reviews', { reviews});

    } catch (err) {
        next(err);
    }
}

export async function moderateDeleteReview(req, res, next) {
    try {
        const { reviewId } = req.params;
        await deleteReview(reviewId);
        res.redirect('/dashboard/reviews');
    } catch (err) {
        next(err);
    }
}