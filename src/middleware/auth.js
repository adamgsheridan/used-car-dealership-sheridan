export function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

export function isEmployee(req, res, next) {
    if (!req.session.user || !['employee', 'admin'].includes(req.session.user.role)) {
        return res.status(403).send('Forbidden');
    }
    next();
}

export function isAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send('Forbidden');
    }
    next();
}