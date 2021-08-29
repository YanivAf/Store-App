"use strict";
exports.__esModule = true;
exports.onlyAdmin = exports.onlyShopper = exports.isAdmin = exports.validatePassword = exports.encryptPassword = exports.doesUserExist = exports.isLoggedInAndAuthenticated = void 0;
var secret = require('../../secret/dist/secret').secret;
var _a = require("../../models/dist/usersModel"), User = _a.User, Users = _a.Users;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
function isLoggedInAndAuthenticated(req, res, next) {
    try {
        var currentUser = req.cookies.currentUser;
        if (currentUser) {
            jwt.verify(currentUser, secret, function (err, decoded) {
                if (err) {
                    res.status(401).send({ message: 'You are not authorized to see this page, mister hacker...' });
                    return;
                }
                req.currentUser = decoded;
                next();
            });
        }
        else
            res.status(401).send({ message: 'The session has expired. Please log in again.' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.isLoggedInAndAuthenticated = isLoggedInAndAuthenticated;
function doesUserExist(req, res, next) {
    try {
        var users = new Users();
        if (req.currentUser) {
            var currentUser = req.currentUser;
            var userUuid = currentUser.userUuid;
            var userIndex = users.findUserIndex(userUuid, null);
            if (userIndex !== undefined) {
                req.userUuid = userUuid;
                req.userIndex = userIndex;
                next();
            }
            else
                res.status(404).send({ message: "User wasn't found, mister hacker..." });
        }
        else {
            var _a = req.body, email = _a.email, adminRegisterForm = _a.adminRegisterForm, adminLoginForm = _a.adminLoginForm;
            var userIndex = users.findUserIndex(null, email);
            if (adminRegisterForm) { // admin registration attempt
                if (userIndex !== -1) { // email exists (shopper to admin registration)
                    req.encryptedPassword = users.users[userIndex].password;
                    req.userIndex = userIndex;
                    next();
                    return;
                }
                else { // admin doesn't exist
                    req.shopperToAdmin = false;
                    req.userIndex = userIndex;
                    req.role = 'admin';
                    next();
                    return;
                }
            }
            else if (adminLoginForm === undefined) { // shopper registration attempt
                if (userIndex === -1) { // shopper doesn't exist
                    req.shopperToAdmin = false;
                    req.userIndex = userIndex;
                    req.role = 'shopper';
                    next();
                    return;
                }
            }
            else { // login attempt
                if (userIndex === -1)
                    res.status(404).send({ message: "User doesn't exist. Please register to the system." });
                else {
                    req.userIndex = userIndex;
                    next();
                }
                return;
            }
            res.status(409).send({ message: "Email already registered. Please use a different one." });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.doesUserExist = doesUserExist;
function encryptPassword(req, res, next) {
    try {
        var password = req.body.password;
        var saltRounds = 10;
        bcrypt.hash(password, saltRounds, function (err, hash) {
            try {
                if (err)
                    throw new Error('Issues in the password encryption process!');
                req.body.password = hash;
                next();
            }
            catch (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            }
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.encryptPassword = encryptPassword;
function validatePassword(req, res, next) {
    try {
        var role = req.role; // registration attempt of new shopper or admin that wasn't already a shopper
        if (role) {
            next();
            return;
        }
        var password = req.body.password;
        var users_1 = new Users();
        var userIndex_1 = req.userIndex;
        var encryptedPassword = void 0;
        if (req.encryptedPassword)
            encryptedPassword = req.encryptedPassword; // registration attempt - existing shopper to admin
        else
            encryptedPassword = users_1.users[userIndex_1].password; // login attempt
        bcrypt.compare(password, encryptedPassword, function (err, result) {
            try {
                if (err)
                    throw res.status(409).send({ message: 'The password you entered is incorrect.' });
                else if (result) {
                    if (req.encryptedPassword) {
                        var username = req.body.username;
                        var shopperToAdminText = (users_1.users[userIndex_1].stores === 0) ? '\n\nShopper trying to become an admin? Please verify you credentials.' : '';
                        if ((users_1.users[userIndex_1].stores.length === 0) && // if exist as shopper + entered registered username & password
                            (users_1.users[userIndex_1].username === username)) {
                            req.shopperToAdmin = true;
                            req.role = 'admin';
                            next();
                            return;
                        }
                        res.status(409).send({ message: "Email already registered." + shopperToAdminText });
                        return;
                    }
                    req.shopperToAdmin = false;
                    req.role = (users_1.users[userIndex_1].stores.length === 0) ? 'shopper' : 'admin';
                    next();
                }
                else
                    res.status(409).send({ message: 'The password you entered is incorrect.' });
            }
            catch (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            }
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.validatePassword = validatePassword;
function isAdmin(req, res, next) {
    try {
        var users = new Users();
        var userIndex = req.userIndex;
        req.isAdmin = (users.users[userIndex].stores.length > 0) ? true : false;
        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.isAdmin = isAdmin;
function onlyShopper(req, res, next) {
    try {
        var isAdmin_1 = req.isAdmin;
        if (!isAdmin_1)
            next();
        else
            res.status(403).send({ message: 'This functionality is for shoppers only.' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.onlyShopper = onlyShopper;
function onlyAdmin(req, res, next) {
    try {
        var isAdmin_2 = req.isAdmin;
        if (isAdmin_2)
            next();
        else
            res.status(403).send({ message: 'This functionality is for admins only.' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.onlyAdmin = onlyAdmin;
