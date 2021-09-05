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
    function Product(productName, productDescription, productPrice, productImage, inStock) {
        this.productUuid = uuidv4();
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.inStock = inStock;
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
    Store.prototype.findProductIndex = function (productUuid) {
        try {
            var productIndex = this.products.findIndex(function (product) { return product.productUuid === productUuid; });
            return productIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Store.prototype.addProduct = function (productName, productDescription, productPrice, productImage, inStock, storeUuid) {
        try {
            var product = new Product(productName, productDescription, productPrice, productImage, inStock);
            product.storeUuid = this.storeUuid;
            this.products.push(product);
            this.updateStoreJson();
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
    Store.prototype.deleteProduct = function (productUuid) {
        try {
            this.products = this.products.filter(function (product) { return product.productUuid !== productUuid; });
            this.updateStoreJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    return Store;
}());
exports.Store = Store;
