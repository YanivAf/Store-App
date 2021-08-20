"use strict";
exports.__esModule = true;
exports.register = exports.login = exports.welcome = void 0;
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
function login(req, res) {
    try {
        res.send({ login: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
function register(req, res) {
    try {
        res.send({ register: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.register = register;
