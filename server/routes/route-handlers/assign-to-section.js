'use strict';

exports.get = function (req, res) {
    if (req.App.user === undefined) {
        return res.redirect('/?url=' + encodeURIComponent(req.originalUrl));
    }
    res.render('./assign-to-section', {
        scripts: ['/static/react_apps.js'],
        assignmentId: req.params.assignmentId,
        courseId: req.query.courseId,
        userId: req.App.user.userId
    });
};