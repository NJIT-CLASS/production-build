'use strict';

// exports.get = (req, res) => {
//     res.render('password_reset');
// };
exports.get = function (req, res) {
    res.render('forgot_password', {
        scripts: ['/static/react_apps.js']
    });
};

exports.post = function (req, res) {
    var email = req.body.email;
    if (email == null || email === '') {
        return res.render('password_reset', {
            blankField: true
        });
    }
    req.App.api.post('/password/reset', { email: email, token: req.session.token }, function (err, statusCode, body) {
        if (statusCode === 200) {
            return res.render('home', {
                passwordReset: true
            });
        } else {
            return res.render('password_reset', {
                error: true
            });
        }
    });
};