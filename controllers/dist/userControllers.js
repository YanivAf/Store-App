"use strict";
exports.__esModule = true;
exports.purchaseCart = exports.deleteFromCart = exports.updateQuantity = exports.getQuantities = exports.details = exports.logout = exports.login = exports.register = exports.welcome = void 0;
var secret = require('../../secret/dist/secret').secret;
var jwt = require('jsonwebtoken');
var _a = require('../../models/dist/usersModel'), Users = _a.Users, User = _a.User, CartProduct = _a.CartProduct;
var _b = require('../../models/dist/storeModel'), Product = _b.Product, Store = _b.Store;
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
        var _a = users.users[userIndex], username = _a.username, userUuid = _a.userUuid, storeUuid = _a.storeUuid;
        var roleText = (role === 'admin') ? 'n admin' : ' shopper';
        if (((!adminLoginForm) && (role === 'shopper')) || // check shopper uses shopper-login
            ((adminLoginForm) && (role === 'admin'))) { // and admin uses admin-login
            var currentUserToken = jwt.sign({ userUuid: userUuid }, secret, { expiresIn: 1800 });
            res.cookie('currentUser', currentUserToken, { maxAge: 1800000, httpOnly: true });
            res.send({ title: "Welcome back, " + username + "!", text: "Enjoy your visit!", storeUuid: storeUuid, isLoggedIn: true });
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
        var userIndex = req.userIndex;
        var isAdmin = req.isAdmin;
        var users = new Users();
        var user = users.users[userIndex];
        var username = user.username, cart = user.cart, purchased = user.purchased;
        if (!isAdmin)
            res.send({ username: username, cart: cart, purchased: purchased });
        else
            res.send({ username: username });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
function getQuantities(req, res) {
    try {
        var userIndex = req.userIndex;
        var users = new Users();
        var cartProducts = users.users[userIndex].cart;
        res.send({ messege: "got all user's cart products", cartProducts: cartProducts });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.getQuantities = getQuantities;
function updateQuantity(req, res) {
    try {
        var _a = req.body, productUuid = _a.productUuid, productName = _a.productName, mathSign = _a.mathSign;
        var users = new Users();
        var userUuid = req.userUuid;
        var productQuantity = users.updateCartProductQuantity(userUuid, productUuid, mathSign);
        res.send({ message: "There are now " + productQuantity + " " + productName + "(s) in your cart", productQuantity: productQuantity });
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
        var userUuid = req.userUuid.userUuid;
        users.emptyCart(userUuid);
        res.send({ title: "Cart purchase completed", purchaseCart: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.purchaseCart = purchaseCart;
