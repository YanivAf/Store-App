"use strict";
exports.__esModule = true;
exports.login = exports.register = exports.adminPanel = exports.welcome = void 0;
var Users = require("../../models/dist/usersModel").Users;
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
exports.adminPanel = function (req, res) {
    try {
        res.send({ adminPanel: true });
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
            res.send({ title: "Cheers, " + username + "!", text: "You are our newest " + role + "!", userUuid: userUuid });
        }
        else
            res.send({ title: 'Email already registered', text: "Please use a different email address." + shopperToAdminText });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.register = register;
function login(req, res) {
    try {
        var _a = req.body, email = _a.email, password = _a.password;
        if (email && password) {
            res.cookie('isAdmin', { isAdmin: isAdmin }, { maxAge: 900000, httpOnly: true }); // TODO build isAdmin logic
        }
        res.send({ login: true, isAdmin: isAdmin });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
