"use strict";
exports.__esModule = true;
exports.purchaseCart = exports.deleteFromCart = exports.updateQuantity = exports.addToCart = exports.details = exports.login = exports.register = exports.welcome = void 0;
var secret = require('../../secret/dist/secret').secret;
var jwt = require('jwt-simple');
var _a = require('../../models/dist/usersModel'), Users = _a.Users, User = _a.User;
function welcome(req, res) {
    try {
        res.send({ h1Text: "Shop Shop Shop", message: 'We wish you happy Shopping 🛒' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.welcome = welcome;
function register(req, res) {
    try {
        var _a = req.body, email = _a.email, username = _a.username, password = _a.password, isAdmin = _a.isAdmin;
        var role = (isAdmin) ? 'admin' : 'shopper';
        var shopperToAdminText = (isAdmin) ? '\n\nShopper trying to become an admin? Please verify you credentials.' : '';
        var users = new Users();
        var userBasicInfo = users.addUser(email, username, password, isAdmin);
        var userUuid = userBasicInfo.userUuid, storeUuid = userBasicInfo.storeUuid;
        if (userUuid) {
            var cookieToWrite = JSON.stringify({ userUuid: userUuid });
            var currentUserToken = jwt.encode(cookieToWrite, secret);
            res.cookie('currentUser', currentUserToken, { maxAge: 900000, httpOnly: true });
            res.send({ title: "Cheers, " + username + "!", text: "You are our newest " + role + "!", storeUuid: storeUuid, isRegistered: true });
        }
        else
            res.send({ title: 'Email already registered', text: "Please use a different email address." + shopperToAdminText, isRegistered: false });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.register = register;
function login(req, res) {
    try {
        var _a = req.body, email = _a.email, password = _a.password, isAdmin = _a.isAdmin;
        var role = (isAdmin) ? 'n admin' : ' shopper';
        var users = new Users();
        var verifiedUser = users.verifyUser(email, password);
        if (verifiedUser) {
            if (((verifiedUser.storeUuid === null) && (!isAdmin)) || // check shopper uses shopper-login and admin uses admin-login
                ((verifiedUser.storeUuid !== null) && (isAdmin))) {
                var cookieToWrite = JSON.stringify({ userUuid: verifiedUser.userUuid });
                var currentUserToken = jwt.encode(cookieToWrite, secret);
                res.cookie('currentUser', currentUserToken, { maxAge: 900000, httpOnly: true });
                res.send({ title: "Welcome back, " + verifiedUser.username + "!", text: "Enjoy your visit!", storeUuid: verifiedUser.storeUuid, isLoggedIn: true });
            }
            else {
                res.send({ title: verifiedUser.username + ", you are not a" + role + "!", text: "Please use the right login form!", isLoggedIn: false });
            }
        }
        else
            res.send({ title: 'Credentials are wrong', text: "Please verify.", isLoggedIn: false });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
exports.details = function (req, res) {
    try {
        var userIndex = req.userUuid;
        var isAdmin = req.isAdmin;
        var users = new Users();
        var user = users[userIndex];
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
function addToCart(req, res) {
    try {
        var _a = req.body, productUuid = _a.productUuid, productName = _a.productName;
        var users = new Users();
        var userUuid = req.userUuid.userUuid;
        users.addCartProduct(userUuid, productUuid);
        res.send({ title: productName + " added to your cart!", addToCart: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.addToCart = addToCart;
function updateQuantity(req, res) {
    try {
        var _a = req.body, productUuid = _a.productUuid, productName = _a.productName, mathSign = _a.mathSign;
        var users = new Users();
        var userUuid = req.userUuid.userUuid;
        var productQuantity = users.updateCartProductQuantity(userUuid, productUuid, mathSign);
        res.send({ title: "There are now " + productQuantity + " " + productName + "(s) in your cart", updateQuantity: true });
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
