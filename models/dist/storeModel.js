"use strict";
exports.__esModule = true;
exports.Store = exports.Product = exports.readStoreJson = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var storeJsonPath = path.resolve(__dirname, "../store.json");
exports.readStoreJson = function () {
    try {
        var store = fs.readFileSync(storeJsonPath);
        return JSON.parse(store);
    }
    catch (error) {
        console.error(error.message);
    }
};
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
exports.Product = Product;
var Store = /** @class */ (function () {
    function Store() {
        var store = exports.readStoreJson();
        this.storeUuid = store.storeUuid;
        this.storeName = store.storeName;
        this.products = store.products;
    }
    Store.prototype.updateStoreJson = function () {
        try {
            fs.writeFileSync(storeJsonPath, JSON.stringify({ storeUuid: this.storeUuid, storeName: this.storeName, products: this.products }));
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Store.prototype.updateStoreName = function (storeName /*, storeUuid: string*/) {
        try {
            this.storeName = storeName;
            this.updateStoreJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Store.prototype.addProduct = function () {
        try {
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Store.prototype.editProduct = function () {
        try {
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Store.prototype.deleteProduct = function () {
        try {
        }
        catch (error) {
            console.error(error.message);
        }
    };
    return Store;
}());
exports.Store = Store;
