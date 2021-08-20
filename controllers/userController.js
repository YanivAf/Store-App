"use strict";
exports.__esModule = true;
exports.login = exports.register = exports.adminPanel = exports.welcome = void 0;
function welcome(req, res) {
    try {
        res.send({ h1Text: "Yaniv's App", message: "hello world" });
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
exports.register = register;
function login(req, res) {
    try {
        var _a = req.body, username = _a.username, password = _a.password;
        if (username && password) {
            res.cookie('userRole', { role: 'admin' }, { maxAge: 900000, httpOnly: true });
        }
        res.send({ login: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
