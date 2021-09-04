"use strict";
exports.__esModule = true;
exports.enoughInStock = exports.doesProductExist = void 0;
var secret = require('../../secret/dist/secret').secret;
var _a = require("../../models/dist/storeModel"), Product = _a.Product, Store = _a.Store;
var _b = require("../../models/dist/usersModel"), Users = _b.Users, User = _b.User, CartProduct = _b.CartProduct;
// export function doesStoreExist(req, res, next) {
//     try {
//         // some logic
//         if (storeIndex === -1) res.status(404).send({ message: `Store doesn't exist. Apologies for the inconvenience.` });
//         else {
//             req.storeIndex = storeIndex;
//             next();
//         }
//         return; 
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send(error.message);    
//     }
// }
function doesProductExist(req, res, next) {
    try {
        var store = new Store();
        var users = new Users();
        var productUuid = req.body.productUuid;
        var userIndex = req.userIndex;
        var productIndex = store.findProductIndex(productUuid);
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
        var store = new Store();
        var users = new Users();
        var productQuantity = req.body.productQuantity;
        var productIndex = req.productIndex;
        var userIndex = req.userIndex;
        var cartProductIndex = req.cartProductIndex;
        if (cartProductIndex !== -1) {
            if (store.products[productIndex].inStock + users.users[userIndex].cart[cartProductIndex].quantity < productQuantity)
                res.status(409).send({ message: "Not enough items in stock. Apologies for the inconvenience." });
            else
                next();
            return;
        }
        else {
            if (store.products[productIndex].inStock < productQuantity)
                res.status(409).send({ message: "Not enough items in stock. Apologies for the inconvenience." });
            else
                next();
            return;
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.enoughInStock = enoughInStock;
