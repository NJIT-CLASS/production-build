'use strict';

exports.get = function (req, res) {
    if (req.App.user === undefined) {
        return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));
    }
    res.render('assignment-status-table', {
        scripts: ['/static/react_apps.js'],
        userId: req.App.user.userId
    });
};