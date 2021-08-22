"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Users = exports.User = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var usersJsonPath = path.resolve(__dirname, "../users.json");
var readJsonUsers = function () {
    try {
        var users = fs.readFileSync(usersJsonPath);
        return JSON.parse(users);
    }
    catch (error) {
        console.error(error);
    }
};
var User = /** @class */ (function () {
    function User(username, email, password, storeName, cart) {
        this.username = username;
        this.email = (email === null) ? uuidv4() : email; // uuid for buyers, email for admins
        this.password = (password === null) ? null : password;
        this.storeName = (storeName === null) ? null : storeName;
        this.storeUuid = (storeName === null) ? null : uuidv4();
        this.products = [];
        this.cart = []; // when paying for the first time - cart products are moved to "purchased"
        this.purchased = cart; // see comment above
    }
    return User;
}());
exports.User = User;
var Users = /** @class */ (function () {
    function Users() {
        this.users = readJsonUsers();
    }
    Users.prototype.updateUsersJson = function () {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.createUser = function (user) {
        try {
            var emailIndex = this.users.findIndex(function (userItem) { return userItem.email === user.email; });
            if (user.purchased === []) { // cart was empty => admin registration attempt
                if (emailIndex !== -1) { // email exists
                    if (this.users[emailIndex].password !== null)
                        return true; // have password => admin exists
                    else { // don't have password => buyer becoming admin
                        this.users[emailIndex].password = user.password; // set password
                    }
                }
                else { // email doesn't exist
                    this.users.push(user);
                }
            }
            else if (emailIndex !== -1) { // buyer paying for cart + uuid (email) exists
                this.users[emailIndex].purchased = __spreadArrays(user.purchased); // add newely paid products to purchased
                this.users[emailIndex].cart = []; // remove paid products from cart      
            }
            else { // buyer paying for cart + uuid (email) doesn't exist
                this.users.push(user); // create buyer
            }
            this.updateUsersJson();
            return false;
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.loginUser = function (email, password) {
        try {
            var userExists = this.users.find(function (user) { return user.email === email && user.password === password; });
            if (userExists)
                return userExists;
            return undefined;
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.findUsername = function (email) {
        try {
            var userExists = this.users.find(function (user) { return user.email === email; });
            if (userExists)
                return userExists.username;
            return undefined;
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.addProductToCart = function (cookieEmail, addedProductUuid) {
        try {
            var loggedInUserIndex = this.users.findIndex(function (user) { return user.email === cookieEmail; });
            this.users[loggedInUserIndex].cart.push(addedProductUuid);
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.deleteProductFromCart = function (cookieEmail, deletedProductUuid) {
        try {
            var loggedInUserIndex = this.users.findIndex(function (user) { return user.email === cookieEmail; });
            this.users[loggedInUserIndex].cart = this.users[loggedInUserIndex].cart.filter(function (cartProduct) { return (cartProduct !== deletedProductUuid); });
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    return Users;
}());
exports.Users = Users;
