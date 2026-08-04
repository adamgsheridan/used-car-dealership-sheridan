export function showDashboardHome(req, res) {
    res.render('dashboard/home', { user: req.session.user });
}