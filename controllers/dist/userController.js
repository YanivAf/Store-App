"use strict";
exports.__esModule = true;
exports.adminLogin = exports.adminRegister = exports.adminPanel = exports.welcome = void 0;
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
function adminRegister(req, res) {
    try {
        // const { username, password } = req.body;
        // if (username && password) {
        //   res.cookie('role', {role: 'admin'}, {maxAge: 900000, httpOnly: true});
        // }
        res.send({ register: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.adminRegister = adminRegister;
function adminLogin(req, res) {
    try {
        var _a = req.body, email = _a.email, password = _a.password;
        if (email && password) {
            res.cookie('userRole', { role: 'admin' }, { maxAge: 900000, httpOnly: true });
        }
        res.send({ login: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.adminLogin = adminLogin;
