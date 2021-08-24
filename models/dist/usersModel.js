"use strict";
exports.__esModule = true;
exports.Users = exports.User = exports.CartProduct = exports.Store = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var usersJsonPath = path.resolve(__dirname, "../users.json");
var storeJsonPath = path.resolve(__dirname, "../store.json");
var readStoreJson = function () {
    try {
        var store = fs.readFileSync(storeJsonPath);
        return JSON.parse(store);
    }
    catch (error) {
        console.error(error.message);
    }
};
var Store = /** @class */ (function () {
    function Store() {
    }
    return Store;
}());
exports.Store = Store;
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
    function CartProduct(productUuid) {
        this.productUuid = productUuid;
        this.quantity = 1;
    }
    return CartProduct;
}());
exports.CartProduct = CartProduct;
var User = /** @class */ (function () {
    function User(email, username, password) {
        this.userUuid = uuidv4();
        this.email = email;
        this.username = username;
        this.password = password;
        this.storeUuid = null;
        this.cart = [];
        this.purchased = [];
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
    Users.prototype.verifyUser = function (userEmail, userPassword) {
        try {
            var doesUserExist = this.users.find(function (user) { return user.email === userEmail && user.password === userPassword; });
            if (doesUserExist)
                return doesUserExist;
            return undefined;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.findUserIndex = function (userUuid, userEmail) {
        try {
            var userIndex = (userUuid) ? this.users.findIndex(function (user) { return user.userUuid === userUuid; })
                : this.users.findIndex(function (user) { return user.email === userEmail; });
            if ((userIndex === -1) && (userUuid))
                throw new Error("no user with uuid " + userUuid);
            return userIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.storeUuid = function () {
        try {
            var firstAdminIndex = this.users.findIndex(function (user) { return user.storeUuid !== null; });
            var storeUuid = void 0;
            if (firstAdminIndex === -1) {
                storeUuid = uuidv4(); /// if a store doesn't exist - create it
                var store = readStoreJson();
                store.storeUuid = storeUuid;
                fs.writeFileSync(storeJsonPath, JSON.stringify(store));
            }
            else
                storeUuid = this.users[firstAdminIndex].storeUuid; // else - assign the existing store
            return storeUuid;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.addUser = function (userEmail, userUsername, userPassword, isAdmin) {
        try {
            var user = new User(userEmail, userUsername, userPassword);
            var userIndex = this.findUserIndex(null, userEmail);
            if (isAdmin) { // admin registration attempt
                if (userIndex !== -1) { // email exists
                    if ((this.users[userIndex].storeUuid === null) && // if shopper + entered registered username & password
                        (this.users[userIndex].username === userUsername) &&
                        (this.users[userIndex].password === userPassword)) {
                        this.users[userIndex].storeUuid = this.storeUuid();
                        this.updateUsersJson();
                        return this.users[userIndex].userUuid; // convert shopper to admin
                    }
                    else
                        return null; // unverified shopper OR admin exists
                }
                else { // email doesn't exist
                    user.storeUuid = this.storeUuid();
                    this.users.push(user); // add admin
                }
            }
            else if (userIndex !== -1)
                return null; // shopper registration attempt + shopper exists
            else
                this.users.push(user); // add shopper
            this.updateUsersJson();
            return user.userUuid;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.addCartProduct = function (shopperUuid, productUuid) {
        try {
            var shopperIndex = this.findUserIndex(shopperUuid, null);
            var cartProduct = new CartProduct(productUuid);
            this.users[shopperIndex].cart.push(cartProduct);
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.findCartProduct = function (shopperIndex, productUuid) {
        try {
            var cartProductIndex = this.users[shopperIndex].cart.findIndex(function (cartProduct) { return cartProduct.productUuid === productUuid; });
            if (cartProductIndex === -1)
                throw new Error("product " + productUuid + " wasn't found in cart");
            return cartProductIndex;
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.deleteCartProduct = function (shopperUuid, productUuid) {
        try {
            var shopperIndex = this.findUserIndex(shopperUuid, null);
            var cartProductIndex = this.findCartProduct(shopperIndex, productUuid); // used to catch error if product doesn't exist
            this.users[shopperIndex].cart = this.users[shopperIndex].cart.filter(function (cartProduct) { return cartProduct.productUuid !== productUuid; });
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.updateCartProductQuantity = function (shopperUuid, productUuid, mathSign) {
        try {
            var shopperIndex = this.findUserIndex(shopperUuid, null);
            var cartProductIndex = this.findCartProduct(shopperIndex, productUuid);
            if (mathSign === '+')
                this.users[shopperIndex].cart[cartProductIndex].quantity++;
            else {
                this.users[shopperIndex].cart[cartProductIndex].quantity--;
                if (this.users[shopperIndex].cart[cartProductIndex].quantity === 0)
                    this.deleteCartProduct(shopperUuid, productUuid);
            }
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.emptyCart = function (shopperUuid) {
        try {
            var shopperIndex = this.findUserIndex(shopperUuid, null);
            this.updatePurcased(shopperIndex);
            this.users[shopperIndex].cart = [];
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Users.prototype.updatePurcased = function (shopperIndex) {
        var _a;
        try {
            (_a = this.users[shopperIndex].purchased).push.apply(_a, this.users[shopperIndex].cart);
        }
        catch (error) {
            console.error(error.message);
        }
    };
    return Users;
}());
exports.Users = Users;
