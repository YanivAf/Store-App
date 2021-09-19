"use strict";
exports.__esModule = true;
exports.purchaseCart = exports.deleteFromCart = exports.updateQuantity = exports.details = exports.logout = exports.login = exports.register = exports.welcome = void 0;
var secret = require('../../secret/dist/secret').secret;
var jwt = require('jsonwebtoken');
var _a = require('../../models/dist/usersModel'), Users = _a.Users, User = _a.User, CartProduct = _a.CartProduct;
var _b = require('../../models/dist/storesModel'), Product = _b.Product, Store = _b.Store, Stores = _b.Stores;
function welcome(req, res) {
    try {
        var userIndex = req.userIndex, isAdmin = req.isAdmin;
        var users = new Users();
        var _a = users.users[userIndex], username = _a.username, stores = _a.stores;
        if (isAdmin) {
        }
        res.send({ isAdmin: isAdmin, storeUuid: stores[0], h1Text: "Shop Shop Shop", message: username + ", you're already logged in" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.welcome = welcome;
function register(req, res) {
    try {
        var _a = req.body, email = _a.email, username = _a.username, password = _a.password;
        var shopperToAdmin = req.shopperToAdmin, userIndex = req.userIndex, role = req.role;
        var users = new Users();
        var userBasicInfo = users.addUser(email, username, password, shopperToAdmin, userIndex, role);
        var userUuid = userBasicInfo.userUuid, storeUuid = userBasicInfo.storeUuid;
        var currentUserToken = jwt.sign({ userUuid: userUuid }, secret, { expiresIn: 1800 });
        res.cookie('currentUser', currentUserToken, { maxAge: 1800000, httpOnly: true });
        res.send({ title: "Cheers, " + username + "!", text: "You are our newest " + role + "!", storeUuid: storeUuid });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.register = register;
function login(req, res) {
    try {
        var adminLoginForm = req.body.adminLoginForm;
        var userIndex = req.userIndex, role = req.role;
        var users = new Users();
        var _a = users.users[userIndex], username = _a.username, userUuid = _a.userUuid, stores = _a.stores;
        var roleText = (role === 'admin') ? 'n admin' : ' shopper';
        if (((!adminLoginForm) && (role === 'shopper')) || // check shopper uses shopper-login
            ((adminLoginForm) && (role === 'admin'))) { // and admin uses admin-login
            var currentUserToken = jwt.sign({ userUuid: userUuid }, secret, { expiresIn: 1800 });
            res.cookie('currentUser', currentUserToken, { maxAge: 1800000, httpOnly: true });
            res.send({ title: "Welcome back, " + username + "!", text: "Enjoy your visit!", storeUuid: stores[0], isLoggedIn: true });
        }
        else
            res.send({ title: username + ", you are not a" + roleText + "!", text: "Please use the right login form!", isLoggedIn: false });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
function logout(req, res) {
    try {
        var userIndex = req.userIndex;
        var users = new Users();
        var username = users.users[userIndex].username;
        res.clearCookie('currentUser');
        res.send({ username: username });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.logout = logout;
exports.details = function (req, res) {
    try {
        var userIndex = req.userIndex, isAdmin = req.isAdmin;
        var users = new Users();
        var user = users.users[userIndex];
        res.send({ user: user, isUserAdmin: isAdmin });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
function updateQuantity(req, res) {
    try {
        var _a = req.body, productUuid = _a.productUuid, productQuantity = _a.productQuantity, allStoresInfo = _a.allStoresInfo;
        var users = new Users();
        var userIndex = req.userIndex, cartProductIndex = req.cartProductIndex, storeUuid = req.storeUuid, storeIndex = req.storeIndex, productIndex = req.productIndex;
        var cartProducts = users.updateCartProductQuantity(userIndex, cartProductIndex, storeUuid, storeIndex, productUuid, productIndex, productQuantity);
        var shippingAddress = users.users[userIndex].shippingAddress;
        var stores = new Stores();
        var allMallProducts_1;
        if (allStoresInfo) {
            allMallProducts_1 = [];
            stores.stores.forEach(function (store) { allMallProducts_1 = allMallProducts_1.concat(store.products); });
        }
        var storeProducts = allMallProducts_1 !== null && allMallProducts_1 !== void 0 ? allMallProducts_1 : stores.stores[storeIndex].products;
        res.send({ cartProducts: cartProducts, storeProducts: storeProducts, shippingAddress: shippingAddress });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.updateQuantity = updateQuantity;
function deleteFromCart(req, res) {
    try {
        var _a = req.body, productUuid = _a.productUuid, productName = _a.productName;
        var users = new Users();
        var userUuid = req.userUuid.userUuid;
        users.deleteCartProduct(userUuid, productUuid);
        res.send({ title: "You have delete " + productName + " from your cart", deleteFromCart: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.deleteFromCart = deleteFromCart;
function purchaseCart(req, res) {
    try {
        var users = new Users();
        var userIndex = req.userIndex;
        users.emptyCart(userIndex);
        res.send({ title: "Cart purchase completed", purchaseCart: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.purchaseCart = purchaseCart;
