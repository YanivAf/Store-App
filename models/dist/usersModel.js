"use strict";
exports.__esModule = true;
exports.Users = exports.User = exports.PurchasedCart = exports.CartProduct = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var usersJsonPath = path.resolve(__dirname, "../users.json");
var _a = require('./storesModel'), Product = _a.Product, Store = _a.Store, Stores = _a.Stores;
var readUsersJson = function () {
    try {
        var users = fs.readFileSync(usersJsonPath);
        return JSON.parse(users);
    }
    catch (error) {
        console.error(error.message);
    }
};
var CartProduct = /** @class */ (function () {
    function CartProduct(storeUuid, productUuid, productName, inStockMirror) {
        this.storeUuid = storeUuid;
        this.productUuid = productUuid;
        this.productName = productName;
        this.inStockMirror = inStockMirror;
        this.quantity = 1;
        this.status = 'Awaiting Shipping';
        this.statusUpdatedAt = new Date();
    }
    return CartProduct;
}());
exports.CartProduct = CartProduct;
var PurchasedCart = /** @class */ (function () {
    function PurchasedCart(purchasedCartProducts, shippingAddress) {
        this.purchasedCartUuid = uuidv4();
        this.purchasedCartProducts = purchasedCartProducts;
        this.shippingAddress = shippingAddress;
        this.purchasedAt = new Date();
    }
    return PurchasedCart;
}());
exports.PurchasedCart = PurchasedCart;
var User = /** @class */ (function () {
    function User(email, username, password) {
        this.userUuid = uuidv4();
        this.email = email;
        this.username = username;
        this.shippingAddress = 'No. StreetName st., CityName, CountryName';
        this.password = password;
        this.stores = [];
        this.cart = [];
        this.savedForLater = [];
        this.loved = [];
        this.purchasedCarts = [];
    }
    return User;
}());
exports.User = User;
var Users = /** @class */ (function () {
    function Users() {
        this.users = readUsersJson();
    }
    Users.prototype.updateUsersJson = function () {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.findUserIndex = function (userUuid, userEmail) {
        try {
            var userIndex = (userUuid) ? this.users.findIndex(function (user) { return user.userUuid === userUuid; })
                : this.users.findIndex(function (user) { return user.email === userEmail; });
            return userIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.addUser = function (userEmail, userUsername, userPassword, shopperToAdmin, userIndex, role /*, storeUuid: string, joinStoreToken: string*/) {
        try {
            var user = new User(userEmail, userUsername, userPassword);
            var userUuid = (shopperToAdmin) ? this.users[userIndex].userUuid : user.userUuid;
            var storeUuid = undefined;
            if (role === 'admin') {
                var stores = new Stores();
                var storeIndex = stores.addStore([userUuid], userEmail);
                storeUuid = stores.stores[storeIndex].storeUuid;
                if (shopperToAdmin) {
                    this.users[userIndex].stores.push(storeUuid); // convert shopper to admin
                }
                else {
                    user.stores.push(storeUuid);
                    this.users.push(user); // add admin
                }
                stores.updateStoresJson();
            }
            else
                this.users.push(user); // add shopper
            this.updateUsersJson();
            return { userUuid: userUuid, storeUuid: storeUuid };
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.addCartProduct = function (shopperIndex, storeUuid, productUuid, productName, inStock) {
        try {
            var cartProduct = new CartProduct(storeUuid, productUuid, productName, inStock);
            this.users[shopperIndex].cart.push(cartProduct);
            var cartProductIndex = this.users[shopperIndex].cart.length - 1;
            this.users[shopperIndex].savedForLater = this.users[shopperIndex].savedForLater.filter(function (savedProductUuid) { return savedProductUuid !== productUuid; });
            this.updateUsersJson();
            return cartProductIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.findCartProduct = function (shopperIndex, productUuid) {
        try {
            var cartProductIndex = this.users[shopperIndex].cart.findIndex(function (cartProduct) { return cartProduct.productUuid === productUuid; });
            return cartProductIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.deleteCartProduct = function (shopperIndex, productUuid) {
        try {
            this.users[shopperIndex].cart = this.users[shopperIndex].cart.filter(function (cartProduct) { return cartProduct.productUuid !== productUuid; });
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.updateLovedProducts = function (shopperIndex, productUuid, storeIndex, productIndex) {
        try {
            var stores = new Stores();
            var lovedProductIndex = this.users[shopperIndex].loved.findIndex(function (lovedProduct) { return lovedProduct === productUuid; });
            if (lovedProductIndex === -1) {
                this.users[shopperIndex].loved.unshift(productUuid);
                stores.stores[storeIndex].products[productIndex].loved++;
            }
            else {
                this.users[shopperIndex].loved.splice(lovedProductIndex, 1);
                stores.stores[storeIndex].products[productIndex].loved--;
            }
            this.updateUsersJson();
            stores.updateStoresJson();
            return this.users[shopperIndex].loved;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.saveForLater = function (shopperIndex, productUuid) {
        try {
            this.users[shopperIndex].savedForLater.unshift(productUuid);
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.unsaveForLater = function (shopperIndex, productUuid) {
        try {
            this.users[shopperIndex].savedForLater = this.users[shopperIndex].savedForLater.filter(function (savedProduct) { return savedProduct !== productUuid; });
            this.updateUsersJson();
            return this.users[shopperIndex].savedForLater;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.updateCartProductQuantity = function (shopperIndex, cartProductIndex, storeIndex, storeUuid, productUuid, productIndex, productQuantity) {
        try {
            var stores = new Stores();
            var isNew = (cartProductIndex === -1) ? true : false;
            if (isNew) { // count as created cart for store, if cartProduct is the first from that store
                var cartProductsFromStore = this.users[shopperIndex].cart.filter(function (cartProduct) { return cartProduct.storeUuid === storeUuid; }).length;
                var isFirstFromStore = (cartProductsFromStore === 1) ? true : false;
                if (isFirstFromStore)
                    stores.stores[storeIndex].createdCartsCounter++;
            }
            cartProductIndex = (isNew) ? this.users[shopperIndex].cart.length - 1 : cartProductIndex;
            var cartQuantityChange = (isNew) ? productQuantity : productQuantity - this.users[shopperIndex].cart[cartProductIndex].quantity;
            if (productQuantity < 0) {
                this.deleteCartProduct(shopperIndex, productUuid);
                if (productQuantity === -2)
                    this.saveForLater(shopperIndex, productUuid);
            }
            else {
                this.users[shopperIndex].cart[cartProductIndex].inStockMirror -= cartQuantityChange;
                this.users[shopperIndex].cart[cartProductIndex].quantity = productQuantity;
                var cartProductQuantity = this.users[shopperIndex].cart[cartProductIndex].quantity;
                var productPrice = stores.stores[storeIndex].products[productIndex].productPrice;
                var productPrecentsOff = stores.stores[storeIndex].products[productIndex].precentsOff;
                var cartProductPrice = productPrice - productPrice * (productPrecentsOff / 100);
                this.users[shopperIndex].cart[cartProductIndex].totalPrice = cartProductQuantity * cartProductPrice;
            }
            stores.updateStoresJson();
            this.updateUsersJson();
            return this.users[shopperIndex].cart;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.addPurchesedCart = function (shopperIndex) {
        try {
            var purchasedCartProducts = this.users[shopperIndex].cart;
            var shippingAddress = this.users[shopperIndex].shippingAddress;
            var purchasedCart = new PurchasedCart(purchasedCartProducts, shippingAddress);
            this.users[shopperIndex].purchasedCarts.unshift(purchasedCart);
            var shopperEmail = this.users[shopperIndex].email;
            var shopperUsername = this.users[shopperIndex].username;
            var shopperUuid = this.users[shopperIndex].userUuid;
            var stores = new Stores();
            stores.addPurchesedCart(purchasedCart.purchasedCartUuid, purchasedCartProducts, shippingAddress, shopperEmail, shopperUsername, shopperUuid);
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.emptyCart = function (userIndex) {
        try {
            this.addPurchesedCart(userIndex);
            this.users[userIndex].cart = [];
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    return Users;
}());
exports.Users = Users;
