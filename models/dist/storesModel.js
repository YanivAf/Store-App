"use strict";
exports.__esModule = true;
exports.Stores = exports.Store = exports.PurchasedCart = exports.Product = exports.readStoresJson = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var storesJsonPath = path.resolve(__dirname, "../stores.json");
var CartProduct = require('./usersModel').CartProduct;
exports.readStoresJson = function () {
    try {
        var store = fs.readFileSync(storesJsonPath);
        return JSON.parse(store);
    }
    catch (error) {
        console.error(error.message);
    }
};
var Product = /** @class */ (function () {
    function Product(storeUuid, productUuid, productName, createdAt, lastEditedAt, lastEditedBy, productDescription, productPrice, precentsOff, productImage, inStock) {
        this.storeUuid = storeUuid;
        this.productUuid = productUuid !== null && productUuid !== void 0 ? productUuid : uuidv4();
        this.productName = productName;
        this.createdAt = createdAt;
        this.lastEditedAt = lastEditedAt;
        this.lastEditedBy = lastEditedBy;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.precentsOff = precentsOff !== null && precentsOff !== void 0 ? precentsOff : 0;
        this.productImage = (productImage) ? "images/" + productImage : 'images/cart-wp.png';
        this.inStock = inStock;
    }
    return Product;
}());
exports.Product = Product;
var PurchasedCart = /** @class */ (function () {
    function PurchasedCart(shopperPurchasedCartUuid, purchasedCartProducts, shippingAddress, shopperEmail, shopperUsername, shopperUuid) {
        this.shopperPurchasedCartUuid = shopperPurchasedCartUuid;
        this.purchasedCartProducts = purchasedCartProducts;
        this.shopperEmail = shopperEmail;
        this.shopperUsername = shopperUsername;
        this.shopperUuid = shopperUuid;
        this.shippingAddress = shippingAddress;
        this.purchasedAt = new Date();
    }
    return PurchasedCart;
}());
exports.PurchasedCart = PurchasedCart;
var Store = /** @class */ (function () {
    function Store(storeAdminsUuids) {
        this.storeUuid = uuidv4();
        this.storeName = 'Untitled Store';
        this.createdAt = new Date();
        this.storeAdminsUuids = storeAdminsUuids;
        this.lastEditedAt = null;
        this.lastEditedBy = null;
        this.products = [];
        this.purchasedCarts = [];
    }
    return Store;
}());
exports.Store = Store;
var Stores = /** @class */ (function () {
    function Stores() {
        this.stores = exports.readStoresJson();
    }
    Stores.prototype.updateStoresJson = function () {
        try {
            fs.writeFileSync(storesJsonPath, JSON.stringify(this.stores));
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.findStoreIndex = function (storeUuid) {
        try {
            var storeIndex = this.stores.findIndex(function (store) { return store.storeUuid === storeUuid; });
            return storeIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.addStore = function (storeAdminsUuids) {
        try {
            var store = new Store(storeAdminsUuids);
            this.stores.push(store);
            var storeIndex = this.stores.length - 1;
            return storeIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.findStoreProductIndex = function (storeIndex, productUuid) {
        try {
            var productIndex = this.stores[storeIndex].products.findIndex(function (product) { return product.productUuid === productUuid; });
            return productIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.updateStoreName = function (storeName, storeUuid) {
        try {
            var storeIndex = this.findStoreIndex(storeUuid);
            this.stores[storeIndex].storeName = storeName;
            this.updateStoresJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.addProduct = function (storeUuid, productName, productDescription, productPrice, precentsOff, filename, inStock) {
        try {
            var storeIndex = this.findStoreIndex(storeUuid);
            var product = new Product(storeUuid, undefined, productName, new Date(), null, null, productDescription, productPrice, precentsOff, filename, inStock);
            this.stores[storeIndex].products.push(product);
            this.updateStoresJson();
            return this.stores[storeIndex];
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.editProduct = function (storeUuid, adminUuid, productUuid, productName, productDescription, productPrice, precentsOff, filename, inStock) {
        try {
            var storeIndex = this.findStoreIndex(storeUuid);
            var product = new Product(storeUuid, productUuid, productName, null, new Date(), adminUuid, productDescription, productPrice, precentsOff, filename, inStock);
            var productIndex = this.findStoreProductIndex(storeIndex, productUuid);
            if (!filename)
                product.productImage = this.stores[storeIndex].products[productIndex].productImage;
            product.createdAt = this.stores[storeIndex].products[productIndex].createdAt;
            this.stores[storeIndex].products[productIndex] = product;
            this.updateStoresJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.deleteProduct = function (storeUuid, productUuid) {
        try {
            var storeIndex = this.findStoreIndex(storeUuid);
            this.stores[storeIndex].products = this.stores[storeIndex].products.filter(function (product) { return product.productUuid !== productUuid; });
            this.updateStoresJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Stores.prototype.addPurchesedCart = function (shopperPurchasedCartUuid, purchasedCartProducts, shippingAddress, shopperEmail, shopperUsername, shopperUuid) {
        try {
            var purchasedCart_1;
            var purchasedStoreProducts_1;
            this.stores.forEach(function (store) {
                purchasedStoreProducts_1 = purchasedCartProducts.filter(function (cartProduct) { return cartProduct.storeUuid === store.storeUuid; });
                purchasedCart_1 = new PurchasedCart(shopperPurchasedCartUuid, purchasedStoreProducts_1, shippingAddress, shopperEmail, shopperUsername, shopperUuid);
                store.purchasedCarts.push(purchasedCart_1);
            });
            this.updateStoresJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    return Stores;
}());
exports.Stores = Stores;
