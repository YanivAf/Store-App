"use strict";
exports.__esModule = true;
exports.isAdmin = void 0;
function isAdmin(req, res, next) {
    try {
        var userRole = req.cookies.userRole;
        if (userRole) {
            var role = userRole.role;
            if (role === 'admin')
                next();
            else
                res.status(401).send({ message: 'You are not authorized to see this page.' });
        }
        else {
            res.status(401).send({ message: 'The session has expired. Please log in again.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.isAdmin = isAdmin;
