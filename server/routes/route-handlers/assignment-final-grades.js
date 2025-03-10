'use strict';

exports.get = function (req, res) {
    if (req.App.user === undefined) {
        res.redirect('/');
        return;
    }

    return res.render('taskGrade', {
        scripts: ['/static/react_apps.js'],
        userId: req.App.user.userId,
        assignmentId: req.params.assignmentId
    });
};