"use strict";
exports.__esModule = true;
exports.enoughInStock = exports.doesProductExist = void 0;
var secret = require('../../secret/dist/secret').secret;
var _a = require("../../models/dist/storeModel"), Product = _a.Product, Store = _a.Store;
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
        var productUuid = req.body.productUuid;
        var productIndex = store.findProductIndex(productUuid);
        if (productIndex === -1)
            res.status(404).send({ message: "Product doesn't exist. Apologies for the inconvenience." });
        else {
            req.productIndex = productIndex;
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
        var productQuantity = req.body.productQuantity;
        var productIndex = req.productIndex;
        if (store.products[productIndex].quantity < productQuantity)
            res.status(409).send({ message: "Not enough items in stock. Apologies for the inconvenience." });
        else {
            next();
        }
        return;
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}
exports.enoughInStock = enoughInStock;
