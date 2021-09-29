"use strict";
exports.__esModule = true;
exports.deleteProduct = exports.editProduct = exports.addProduct = exports.editStoreName = exports.showProduct = exports.showProducts = exports.showStores = void 0;
var _a = require('../../models/dist/storesModel'), Product = _a.Product, Store = _a.Store, Stores = _a.Stores;
var _b = require('../../models/dist/usersModel'), CartProduct = _b.CartProduct, User = _b.User, Users = _b.Users;
exports.showStores = function (req, res) {
    try {
        var stores = new Stores();
        res.send({ stores: stores });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.showProducts = function (req, res) {
    try {
        var storeUuid = req.params.storeUuid;
        var stores = new Stores();
        var storeIndex = stores.findStoreIndex(storeUuid);
        var store = stores.stores[storeIndex];
        if (storeUuid === 'mall') {
            var userIndex = req.userIndex;
            var users = new Users();
            var shippingAddress = users.users[userIndex].shippingAddress;
            res.send({ stores: stores, shippingAddress: shippingAddress });
        }
        else
            res.send({ store: store });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.showProduct = function (req, res) {
    try {
        var isAdmin = req.isAdmin, userIndex = req.userIndex, cartProductIndex = req.cartProductIndex, storeIndex = req.storeIndex, productIndex = req.productIndex;
        var stores = new Stores();
        var store = stores.stores[storeIndex];
        var users = new Users();
        var storeProduct = store.products[productIndex];
        var cartProduct = undefined;
        if ((!isAdmin) && (cartProductIndex !== -1))
            cartProduct = users.users[userIndex].cart[cartProductIndex];
        var contactEmail = store.contactEmail;
        var storeName = store.storeName;
        res.send({ storeProduct: storeProduct, cartProduct: cartProduct, storeName: storeName, contactEmail: contactEmail });
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
        var _a = req.body, storeUuid = _a.storeUuid, productName = _a.productName, productDescription = _a.productDescription;
        var _b = req.body, productPrice = _b.productPrice, precentsOff = _b.precentsOff, productInStock = _b.productInStock;
        productPrice = Number(productPrice);
        precentsOff = Number(precentsOff);
        productInStock = Number(productInStock);
        var stores = new Stores();
        var filename = (req.file) ? req.file.filename : undefined;
        var store = stores.addProduct(storeUuid, productName, productDescription, productPrice, precentsOff, filename, productInStock);
        res.send({ store: store });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.editProduct = function (req, res) {
    try {
        var _a = req.body, storeUuid = _a.storeUuid, productName = _a.productName, productDescription = _a.productDescription;
        var _b = req.body, productPrice = _b.productPrice, precentsOff = _b.precentsOff, productInStock = _b.productInStock;
        productPrice = Number(productPrice);
        precentsOff = Number(precentsOff);
        productInStock = Number(productInStock);
        var userUuid = req.userUuid;
        var stores = new Stores();
        var productUuid = req.params.productUuid;
        var filename = (req.file) ? req.file.filename : undefined;
        stores.editProduct(storeUuid, userUuid, productUuid, productName, productDescription, productPrice, precentsOff, filename, productInStock);
        res.send({ productUpdate: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.deleteProduct = function (req, res) {
    try {
        var stores = new Stores();
        var _a = req.params, storeUuid = _a.storeUuid, productUuid = _a.productUuid;
        stores.deleteProduct(storeUuid, productUuid);
        res.send({ deleteProduct: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
