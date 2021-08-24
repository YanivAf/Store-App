"use strict";
exports.__esModule = true;
exports.isAdmin = void 0;
var Users = require("../../models/dist/usersModel").Users;
function isAdmin(req, res, next) {
    try {
        var currentUser = req.cookies.currentUser;
        if (currentUser) {
            var userUuid = currentUser.userUuid;
            var users = new Users();
            var userIndex = users.findUserIndex(userUuid, null);
            if (!userIndex)
                throw new Error("The user was not found.");
            else if (users.users[userIndex].storeUuid !== null)
                next();
            else
                res.status(401).send({ message: 'You are not authorized to see this page.' });
        }
        else {
            res.status(401).send({ message: 'The session has expired. Please log in again.' });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.isAdmin = isAdmin;
