"use strict";
exports.__esModule = true;
exports.enoughInStock = exports.doesProductExist = exports.doesStoreExist = void 0;
var _a = require("../../models/dist/storesModel"), Product = _a.Product, Store = _a.Store, Stores = _a.Stores;
var _b = require("../../models/dist/usersModel"), CartProduct = _b.CartProduct, User = _b.User, Users = _b.Users;
function doesStoreExist(req, res, next) {
    var _a;
    try {
        var stores_1 = new Stores();
        var storeUuid_1 = (_a = req.params.storeUuid) !== null && _a !== void 0 ? _a : req.body.storeUuid;
        var storeIndex_1;
        if (storeUuid_1 === 'mall') {
            next();
            return;
        }
        if (storeUuid_1 === 'all cart products stores') {
            var users = new Users();
            var userIndex = req.userIndex;
            var isNotFound_1 = false;
            var notFoundCartProductsNames_1 = '';
            users.users[userIndex].cart.forEach(function (cartProduct) {
                storeUuid_1 = cartProduct.storeUuid;
                storeIndex_1 = stores_1.findStoreIndex(storeUuid_1);
                if (storeIndex_1 === -1) {
                    isNotFound_1 = true;
                    notFoundCartProductsNames_1 += "\"" + cartProduct.productName + "\", ";
                }
            });
            if (isNotFound_1) {
                notFoundCartProductsNames_1.replace(/[,][ ]$/g, '');
                res.status(404).send({ message: "Store of " + notFoundCartProductsNames_1 + " doesn't exist anymore. To continue, please adjust your cart accordingly." });
            }
            else
                next();
            return;
        }
        storeIndex_1 = stores_1.findStoreIndex(storeUuid_1);
        if (storeIndex_1 === -1)
            res.status(404).send({ message: "Store doesn't exist anymore. Apologies for the inconvenience." });
        else {
            req.storeUuid = storeUuid_1;
            req.storeIndex = storeIndex_1;
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
        var stores_2 = new Stores();
        var users = new Users();
        var userIndex = req.userIndex;
        var productUuid_1 = (_a = req.params.productUuid) !== null && _a !== void 0 ? _a : req.body.productUuid;
        var storeIndex_2 = req.storeIndex;
        var productIndex_1;
        if (productUuid_1 === 'all cart products') {
            var storeUuid_2;
            var notFoundCounter_1 = 0;
            var notFoundCartProductsNames_2 = '';
            users.users[userIndex].cart.forEach(function (cartProduct) {
                storeUuid_2 = cartProduct.storeUuid;
                productUuid_1 = cartProduct.productUuid;
                storeIndex_2 = stores_2.findStoreIndex(storeUuid_2);
                productIndex_1 = stores_2.findStoreProductIndex(storeIndex_2, productUuid_1);
                if (productIndex_1 === -1) {
                    notFoundCounter_1++;
                    notFoundCartProductsNames_2 = "\"" + cartProduct.productName + "\", ";
                }
            });
            if (notFoundCounter_1 > 0) {
                var dontVsDoesnt = (notFoundCounter_1 > 1) ? "don't" : "doesn't";
                notFoundCartProductsNames_2.replace(/[,][ ]$/g, '');
                res.status(404).send({ message: notFoundCartProductsNames_2 + " " + dontVsDoesnt + " exist anymore. To continue, please adjust your cart accordingly." });
            }
            else
                next();
            return;
        }
        productIndex_1 = stores_2.findStoreProductIndex(storeIndex_2, productUuid_1);
        var cartProductIndex = users.findCartProduct(userIndex, productUuid_1);
        if (productIndex_1 === -1)
            res.status(404).send({ message: "\"" + users.users[userIndex].cart[cartProductIndex].productName + "\" doesn't exist anymore. Apologies for the inconvenience." });
        else {
            req.productIndex = productIndex_1;
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
    var _a;
    try {
        var stores_3 = new Stores();
        var users = new Users();
        var userIndex = req.userIndex;
        var productQuantity = req.body.productQuantity;
        var storeIndex_3 = req.storeIndex;
        var productIndex_2 = req.productIndex;
        var cartProductIndex_1 = req.cartProductIndex;
        var storeUuid_3 = req.storeUuid;
        var productUuid_2 = (_a = req.params.productUuid) !== null && _a !== void 0 ? _a : req.body.productUuid;
        if (productUuid_2 === 'all cart products') {
            cartProductIndex_1 = 0;
            var isConflict_1 = false;
            var conflicCartProduct_1;
            var conflictStoreProduct_1;
            users.users[userIndex].cart.forEach(function (cartProduct) {
                storeUuid_3 = cartProduct.storeUuid;
                productUuid_2 = cartProduct.productUuid;
                storeIndex_3 = stores_3.findStoreIndex(storeUuid_3);
                productIndex_2 = stores_3.findStoreProductIndex(storeIndex_3, productUuid_2);
                cartProduct.inStockMirror = stores_3.stores[storeIndex_3].products[productIndex_2].inStock;
                if (cartProduct.inStockMirror < cartProduct.quantity) {
                    isConflict_1 = true;
                    conflicCartProduct_1 = cartProduct;
                    conflictStoreProduct_1 = stores_3.stores[storeIndex_3].products[productIndex_2];
                }
                cartProductIndex_1++;
            });
            if (isConflict_1) {
                res.status(409).send({ message: "There are " + conflicCartProduct_1.inStockMirror + " \"" + conflictStoreProduct_1.productName + "\"s in stock. To continue, please adjust quantity (or save the product for later!)" });
            }
            else
                next();
            return;
        }
        var inStock = stores_3.stores[storeIndex_3].products[productIndex_2].inStock;
        var productName = stores_3.stores[storeIndex_3].products[productIndex_2].productName;
        cartProductIndex_1 = (cartProductIndex_1 === -1) ? users.addCartProduct(userIndex, storeUuid_3, productUuid_2, productName, inStock) : cartProductIndex_1;
        users.users[userIndex].cart[cartProductIndex_1].inStockMirror = stores_3.stores[storeIndex_3].products[productIndex_2].inStock;
        if (users.users[userIndex].cart[cartProductIndex_1].inStockMirror < productQuantity)
            res.status(409).send({ message: "There are " + users.users[userIndex].cart[cartProductIndex_1].inStockMirror + " \"" + stores_3.stores[storeIndex_3].products[productIndex_2].productName + "\"s in stock. To continue, please adjust quantity (or save the product for later!)" });
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
