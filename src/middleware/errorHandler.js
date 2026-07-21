export function notFoundHandler(req, res) {
    res.status(404).render('errors/404');
}

export function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).render('errors/500');
}