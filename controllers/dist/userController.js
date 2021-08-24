"use strict";
exports.__esModule = true;
exports.login = exports.register = exports.showProducts = exports.showStores = exports.welcome = void 0;
var _a = require("../../models/dist/usersModel"), Users = _a.Users, User = _a.User;
function welcome(req, res) {
    try {
        res.send({ h1Text: "Shop Shop Shop", message: "We wish you happy Shopping 🛒" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.welcome = welcome;
exports.showStores = function (req, res) {
    try {
        // req.body should have userUuid
        // send stores + username + cart + purchased
        res.send({ showStores: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.showProducts = function (req, res) {
    try {
        // req.body should have storeUuid + userUuid
        // req.isAdmin to know if shopper or admin
        // for shopper - send also cart + purchased
        // send isAdmin + storeName + store products + username
        res.send({ showProducts: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
function register(req, res) {
    try {
        var _a = req.body, email = _a.email, username = _a.username, password = _a.password, isAdmin = _a.isAdmin;
        var role = (isAdmin) ? 'admin' : 'shopper';
        var shopperToAdminText = (isAdmin) ? '\n\nShopper trying to become an admin? Please verify you credentials.' : '';
        var users = new Users();
        var userUuid = users.addUser(email, username, password, isAdmin);
        if (userUuid) {
            res.cookie('currentUser', { userUuid: userUuid }, { maxAge: 900000, httpOnly: true });
            res.send({ title: "Cheers, " + username + "!", text: "You are our newest " + role + "!", isRegistered: true });
        }
        else
            res.send({ title: 'Email already registered', text: "Please use a different email address." + shopperToAdminText, isRegistered: false });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.register = register;
function login(req, res) {
    try {
        var _a = req.body, email = _a.email, password = _a.password, isAdmin = _a.isAdmin;
        var role = (isAdmin) ? 'n admin' : ' shopper';
        var users = new Users();
        var verifiedUser = users.verifyUser(email, password);
        if (verifiedUser) {
            if (((verifiedUser.storeUuid === null) && (!isAdmin)) || // check shopper uses shopper-login and admin uses admin-login
                ((verifiedUser.storeUuid !== null) && (isAdmin))) {
                res.cookie('currentUser', { userUuid: verifiedUser.userUuid }, { maxAge: 900000, httpOnly: true });
                res.send({ title: "Welcome back, " + verifiedUser.username + "!", text: "Enjoy your visit!", isLoggedIn: true });
            }
            else {
                res.send({ title: verifiedUser.username + ", you are a" + role + "!", text: "Please use the right login form!", isLoggedIn: false });
            }
        }
        else
            res.send({ title: 'Credentials are wrong', text: "Please verify.", isLoggedIn: false });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
