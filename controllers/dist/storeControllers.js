"use strict";
exports.__esModule = true;
exports.deleteProduct = exports.editProduct = exports.addProduct = exports.editStoreName = exports.showProduct = exports.showProducts = exports.showStores = void 0;
var _a = require('../../models/dist/storeModel'), Product = _a.Product, Store = _a.Store;
exports.showStores = function (req, res) {
    try {
        var store = new Store();
        res.send({ storeUuid: store.storeUuid, storeName: store.storeName });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.showProducts = function (req, res) {
    try {
        var isAdmin = req.isAdmin;
        var storeUuid = req.params.storeUuid; // needed when database will have more than 1 store in the future
        var store = new Store();
        res.send({ store: store, isAdmin: isAdmin });
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
