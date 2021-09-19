"use strict";
exports.__esModule = true;
exports.enoughInStock = exports.doesProductExist = exports.doesStoreExist = void 0;
var secret = require('../../secret/dist/secret').secret; // TODO convert secret to be used from env
var _a = require("../../models/dist/storesModel"), Product = _a.Product, Store = _a.Store, Stores = _a.Stores;
var _b = require("../../models/dist/usersModel"), CartProduct = _b.CartProduct, User = _b.User, Users = _b.Users;
function doesStoreExist(req, res, next) {
    var _a;
    try {
        var stores = new Stores();
        var storeUuid = (_a = req.params.storeUuid) !== null && _a !== void 0 ? _a : req.body.storeUuid;
        if (storeUuid === 'mall') {
            next();
            return;
        }
        var storeIndex = stores.findStoreIndex(storeUuid);
        if (storeIndex === -1)
            res.status(404).send({ message: "Store doesn't exist. Apologies for the inconvenience." });
        else {
            req.storeUuid = storeUuid;
            req.storeIndex = storeIndex;
            next();
        }
        return;
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.doesStoreExist = doesStoreExist;
function doesProductExist(req, res, next) {
    var _a;
    try {
        var stores = new Stores();
        var users = new Users();
        var productUuid = (_a = req.params.productUuid) !== null && _a !== void 0 ? _a : req.body.productUuid;
        var storeIndex = req.storeIndex;
        var userIndex = req.userIndex;
        var productIndex = stores.findStoreProductIndex(storeIndex, productUuid);
        var cartProductIndex = users.findCartProduct(userIndex, productUuid);
        if (productIndex === -1)
            res.status(404).send({ message: "Product doesn't exist. Apologies for the inconvenience." });
        else {
            req.productIndex = productIndex;
            req.cartProductIndex = cartProductIndex;
            next();
        }
        return;
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.doesProductExist = doesProductExist;
function enoughInStock(req, res, next) {
    try {
        var stores = new Stores();
        var users = new Users();
        var productQuantity = req.body.productQuantity;
        var storeIndex = req.storeIndex;
        var userIndex = req.userIndex;
        var productIndex = req.productIndex;
        var cartProductIndex = req.cartProductIndex;
        var cartProductQuantity = (cartProductIndex === -1) ? 0 : users.users[userIndex].cart[cartProductIndex].quantity;
        if (stores.stores[storeIndex].products[productIndex].inStock + cartProductQuantity < productQuantity)
            res.status(409).send({ message: "Not enough items in stock. Apologies for the inconvenience." });
        else
            next();
        return;
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.enoughInStock = enoughInStock;
