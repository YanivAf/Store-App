"use strict";
exports.__esModule = true;
exports.Store = exports.PurchasedCart = exports.Product = exports.readStoreJson = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var storeJsonPath = path.resolve(__dirname, "../store.json");
var CartProduct = require('./usersModel').CartProduct;
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
    function Product(productUuid, storeUuid, productName, productDescription, productPrice, productImage, inStock) {
        this.productUuid = (productUuid) ? productUuid : uuidv4();
        this.storeUuid = storeUuid;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productImage = (productImage) ? "images/" + productImage : 'images/cart-wp.png';
        this.inStock = inStock;
    }
    return Product;
}());
exports.Product = Product;
var PurchasedCart = /** @class */ (function () {
    function PurchasedCart(purchasedCartProducts, shopperEmail, shopperUsername, shopperUuid) {
        this.purchasedCartProducts = purchasedCartProducts;
        this.shopperEmail = shopperEmail;
        this.shopperUsername = shopperUsername;
        this.shopperUuid = shopperUuid;
    }
    return PurchasedCart;
}());
exports.PurchasedCart = PurchasedCart;
var Store = /** @class */ (function () {
    function Store() {
        var store = exports.readStoreJson();
        this.storeUuid = store.storeUuid;
        this.storeName = store.storeName;
        this.products = store.products;
        this.purchasedCarts = store.purchasedCarts;
    }
    Store.prototype.updateStoreJson = function () {
        try {
            fs.writeFileSync(storeJsonPath, JSON.stringify({ storeUuid: this.storeUuid, storeName: this.storeName, products: this.products, purchasedCarts: this.purchasedCarts }));
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
    Store.prototype.addProduct = function (productName, productDescription, productPrice, filename, inStock, storeUuid) {
        try {
            var product = new Product(undefined, this.storeUuid, productName, productDescription, productPrice, filename, inStock);
            this.products.push(product);
            this.updateStoreJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Store.prototype.editProduct = function (productUuid, productName, productDescription, productPrice, filename, inStock) {
        try {
            var product = new Product(productUuid, this.storeUuid, productName, productDescription, productPrice, filename, inStock);
            var productIndex = this.findProductIndex(productUuid);
            product.productImage = this.products[productIndex].productImage;
            this.products[productIndex] = product;
            this.updateStoreJson();
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
    Store.prototype.addPurchesedCart = function (purchasedCartProducts, shopperEmail, shopperUsername, shopperUuid) {
        try {
            var purchasedCart = new PurchasedCart(purchasedCartProducts, shopperEmail, shopperUsername, shopperUuid);
            this.purchasedCarts.push(purchasedCart);
            this.updateStoreJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    return Store;
}());
exports.Store = Store;
