"use strict";
exports.__esModule = true;
exports.onlyAdmin = exports.isAdmin = exports.doesUserExist = exports.isLoggedIn = void 0;
var secret = require('../../secret/dist/secret').secret;
var jwt = require('jwt-simple');
var Users = require("../../models/dist/usersModel").Users;
function isLoggedIn(req, res, next) {
    try {
        var currentUser = req.cookies.currentUser;
        if (currentUser) {
            var decoded = jwt.decode(currentUser, secret);
            var decodedCurrentUser = JSON.parse(decoded);
            req.currentUser = decodedCurrentUser;
            next();
        }
        else
            res.status(401).send({ message: 'The session has expired. Please log in again.' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.isLoggedIn = isLoggedIn;
function doesUserExist(req, res, next) {
    try {
        var currentUser = req.currentUser;
        var userUuid = currentUser.userUuid;
        var users = new Users();
        var userIndex = users.findUserIndex(userUuid, null);
        if (userIndex !== undefined) {
            req.userIndex = userIndex;
            next();
        }
        else
            throw new Error("The user was not found.");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.doesUserExist = doesUserExist;
function isAdmin(req, res, next) {
    try {
        var users = new Users();
        var userIndex = req.userIndex;
        var isAdmin_1;
        req.isAdmin = (users.users[userIndex].storeUuid !== null) ? true : false;
        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.isAdmin = isAdmin;
function onlyAdmin(req, res, next) {
    try {
        var isAdmin_2 = req.isAdmin;
        if (isAdmin_2)
            next();
        else
            res.status(401).send({ message: 'You are not authorized to see this page.' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.onlyAdmin = onlyAdmin;
