'use strict';

var _react_constants = require('../../utils/react_constants');

var handler = require('../route-handlers/account');


module.exports = {
    route: '/account',
    title: 'My Profile',
    routeHandler: handler,
    access: {
        admins: true,
        instructors: true,
        students: true,
        role: _react_constants.ROLES.GUEST,
        loggedOut: false
    },
    icon: 'user-circle',
    sidebar: true
};