export {};

const { secret } = require('../../secret/dist/secret');
const jwt = require('jsonwebtoken');
const { Users, User, CartProduct } = require('../../models/dist/usersModel');
const { Product, Store, Stores } = require('../../models/dist/storesModel');

export function welcome(req, res) {
  try {
    const { userIndex, isAdmin } = req;
    const users = new Users();
    const { username, stores } = users.users[userIndex];

    res.send({ isAdmin, storeUuid: stores[0], h1Text:`Shop Shop Shop`, message: `${username}, you're already logged in` });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function register(req, res) { // register.html + shopper-register.html
  try {
    const { email, username, password } = req.body;
    const { shopperToAdmin, userIndex, role } = req;
    const users = new Users();
    const userBasicInfo = users.addUser(email, username, password, shopperToAdmin, userIndex, role);
    const { userUuid, storeUuid } = userBasicInfo;

    const currentUserToken: any = jwt.sign({ userUuid }, secret, { expiresIn: 3600 });

    res.cookie('currentUser', currentUserToken, { maxAge: 3600000, httpOnly: true });
    res.send({ title: `Cheers, ${username}!`, text: `You are our newest ${role}!`, storeUuid });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function login(req, res) { // index.html
  try {
    const { adminLoginForm } = req.body;
    const { userIndex, role } = req;

    const users = new Users();
    const { username, userUuid, stores } = users.users[userIndex];

    const roleText: string = (role === 'admin') ? 'n admin' : ' shopper';
    
    if (((!adminLoginForm) && (role === 'shopper')) || // check shopper uses shopper-login
        ((adminLoginForm) && (role === 'admin'))) { // and admin uses admin-login
      const currentUserToken: any = jwt.sign({ userUuid }, secret, { expiresIn: 3600 });

      res.cookie('currentUser', currentUserToken, { maxAge: 3600000, httpOnly: true });
      res.send({ title: `Welcome back, ${username}!`, text: `Enjoy your visit!`, storeUuid: stores[0], isLoggedIn: true});
    } else res.send({ title: `${username}, you are not a${roleText}!`, text: `Please use the right login form!`, isLoggedIn: false});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function logout(req, res) { // index.html
  try {
    const { userIndex } = req;

    const users = new Users();
    const { username } = users.users[userIndex];

    res.clearCookie('currentUser');
    res.send({ username });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function details(req, res) { // all htmls except for index.html,  register.html, shopper-register.html
  try {
    const { userIndex, isAdmin } = req;
        
    const users = new Users();
    const user = users.users[userIndex];
    
    res.send({ user, isUserAdmin: isAdmin });


  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function updateQuantity(req, res) { // store.html + cart.html
  try {
    const { productUuid, productQuantity, allStoresInfo } = req.body;
    const users = new Users();
    
    const { userIndex, cartProductIndex, storeUuid, storeIndex, productIndex } = req;

    const cartProducts: Array<CartProduct> = users.updateCartProductQuantity(userIndex, cartProductIndex, storeIndex, storeUuid, productUuid, productIndex, productQuantity);
    const savedProducts: Array<string> = users.users[userIndex].savedForLater;
    const stores = new Stores();

    let allMallProducts: Array<Product>;
    if (allStoresInfo) {
      allMallProducts = [];
      stores.stores.forEach(store => {allMallProducts = allMallProducts.concat(store.products)});
    }

    const storeProducts: Array<Product> = allMallProducts ?? stores.stores[storeIndex].products;
    const shippingAddress: string = users.users[userIndex].shippingAddress;

    res.send({ cartProducts, storeProducts, savedProducts, shippingAddress });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function updateSaved(req, res) { // cart.html
  try {
    const { productUuid } = req.body;
    const users = new Users();
    
    const { userIndex } = req;

    const cartProducts: Array<CartProduct> = users.users[userIndex].cart;
    const savedProducts: Array<string> = users.unsaveForLater(userIndex, productUuid);
    const stores = new Stores();

    let allMallProducts: Array<Product>;
    allMallProducts = [];
    stores.stores.forEach(store => {allMallProducts = allMallProducts.concat(store.products)});

    const storeProducts: Array<Product> = allMallProducts;
    const shippingAddress: string = users.users[userIndex].shippingAddress;

    res.send({ cartProducts, storeProducts, savedProducts, shippingAddress });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function purchaseCart(req, res) { // cart.html
  try {
    const users = new Users();
    const { userIndex } = req;
    console.log('hi');
    users.emptyCart(userIndex);

    res.send({ title: `Cart purchase completed`, purchaseCart: true});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}