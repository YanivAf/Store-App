"use strict";
exports.__esModule = true;
exports.deleteProduct = exports.editProduct = exports.addProduct = exports.showProducts = exports.showStores = void 0;
var secret = require('../../secret/dist/secret').secret;
var jwt = require('jwt-simple');
var _a = require('../../models/dist/usersModel'), Users = _a.Users, User = _a.User;
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
exports.addProduct = function (req, res) {
    try {
        // res.send({ addProduct:true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.editProduct = function (req, res) {
    try {
        // res.send({ editProduct:true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.deleteProduct = function (req, res) {
    try {
        // res.send({ deleteProduct:true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
