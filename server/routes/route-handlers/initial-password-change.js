'use strict';

exports.get = function (req, res) {

    //make call to check if user is actually Pending
    if (req.App.user === undefined) {
        return res.redirect('/');
    }
    req.App.api.get('/user/pendingStatus/' + req.App.user.userId, { token: req.session.token }, function (err, statusCode, body) {
        console.log(err, statusCode, body);
        if (statusCode === 403) {
            return res.status(404).end();
        } else {
            return res.render('initial-password-change');
        }
    });
};

exports.post = function (req, res) {
    var _req$body = req.body,
        currentpassword = _req$body.currentpassword,
        newpassword = _req$body.newpassword,
        confirmpassword = _req$body.confirmpassword;


    req.App.api.get('/user/pendingStatus/' + req.App.user.userId, { token: req.session.token }, function (err, statusCode, body) {
        if (statusCode === 403) {
            return res.status(404).end();
        }

        if (currentpassword === '' || newpassword === '' || confirmpassword === '') {
            return res.render('initial-password-change', {
                fieldsMissing: true
            });
        } else if (newpassword !== confirmpassword) {
            return res.render('initial-password-change', {
                mismatchPassword: true
            });
        } else if (newpassword.length < 6) {
            return res.render('initial-password-change', {
                shortPassword: true
            });
        }

        req.App.api.post('/update/password', {
            userId: req.App.user.userId,
            oldPasswd: currentpassword,
            newPasswd: newpassword
        }, function (err, statusCode, body) {
            console.log(body);
            console.log(statusCode);
            if (err || statusCode === 401) {
                return res.render('initial-password-change', {
                    serverError: true
                });
            } else if (body.error != false) {
                return res.render('initial-password-change', {
                    error: true,
                    errorMessage: body.error
                });
            } else {
                return res.redirect('/');
            }
        });
    });
};