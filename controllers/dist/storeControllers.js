"use strict";
exports.__esModule = true;
exports.deleteProduct = exports.editProduct = exports.addProduct = exports.editStoreName = exports.showProduct = exports.showProducts = exports.showStores = void 0;
var _a = require('../../models/dist/storeModel'), Product = _a.Product, Store = _a.Store;
var _b = require('../../models/dist/usersModel'), CartProduct = _b.CartProduct, User = _b.User, Users = _b.Users;
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
        var storeUuid = req.params.storeUuid;
        var store = new Store();
        if (storeUuid === 'mall')
            store.storeName = 'Virtual Mall'; // show from all stores (needed if more than 1 store. for now only title changes)
        res.send({ store: store, isAdmin: isAdmin });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.showProduct = function (req, res) {
    try {
        var isAdmin = req.isAdmin, userIndex = req.userIndex, cartProductIndex = req.cartProductIndex, productIndex = req.productIndex;
        var store = new Store();
        var users = new Users();
        var storeProduct = store.products[productIndex];
        var cartProduct = ((isAdmin) || (cartProductIndex === -1)) ? undefined : users.users[userIndex].cart[cartProductIndex];
        res.send({ storeProduct: storeProduct, cartProduct: cartProduct, isAdmin: isAdmin });
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
        var _a = req.body, storeUuid = _a.storeUuid, productName = _a.productName, productDescription = _a.productDescription, productPrice = _a.productPrice, productImage = _a.productImage, productInStock = _a.productInStock;
        var store = new Store(); // storeUuid would be used if more than 1 store
        var filename = (req.file) ? req.file : undefined;
        store.addProduct(productName, productDescription, productPrice, filename, productInStock);
        res.send({ store: store });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.editProduct = function (req, res) {
    try {
        var _a = req.body, storeUuid = _a.storeUuid, productName = _a.productName, productDescription = _a.productDescription, productPrice = _a.productPrice, productImage = _a.productImage, productInStock = _a.productInStock;
        var store = new Store(); // storeUuid would be used if more than 1 store
        var productUuid = req.params.productUuid;
        var filename = (req.file) ? req.file : undefined;
        store.editProduct(productUuid, productName, productDescription, productPrice, filename, productInStock);
        res.send({ productUpdate: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.deleteProduct = function (req, res) {
    try {
        var store = new Store(); // storeUuid would be used if more than 1 store
        var productUuid = req.params.productUuid;
        store.deleteProduct(productUuid);
        res.send({ deleteProduct: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
