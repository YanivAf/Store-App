"use strict";
exports.__esModule = true;
exports.deleteProduct = exports.editProduct = exports.addProduct = exports.editStoreName = exports.showProduct = exports.showProducts = exports.showStores = void 0;
var secret = require('../../secret/dist/secret').secret;
var jwt = require('jwt-simple');
var _a = require('../../models/dist/storeModel'), Product = _a.Product, Store = _a.Store;
exports.showStores = function (req, res) {
    try {
        // call additional get route to call from client: '/user/details'
        // req.body should have storeUuid
        var store = new Store();
        res.send(store);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.showProducts = function (req, res) {
    try {
        // call additional get route to call from client: '/user/details'
        var isAdmin = req.isAdmin;
        var storeUuid = (isAdmin) ? req.adminStoreUuid : req.body.storeUuid; // needed when database will have more than 1 store in the future
        // if shopper- storeUuid from the id of store div in the client 
        // if admin- storeUuid from middleware
        var store = new Store();
        res.send({ store: store }); // needs products + storeName for h1 
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.showProduct = function (req, res) {
    try {
        // res.send({ showProduct:true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.editStoreName = function (req, res) {
    try {
        // res.send({ editStoreName:true });
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
