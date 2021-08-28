export {};

const { secret } = require('../../secret/dist/secret');
const jwt = require('jsonwebtoken');
const { Users, User } = require('../../models/dist/usersModel');
const { Product, Store } = require('../../models/dist/storeModel');

export function welcome(req, res) {
  try {
    const { userIndex, isAdmin } = req;
    const users = new Users();
    const { username, stores } = users.users[userIndex];

    if (isAdmin) {

    }
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

    const currentUserToken: any = jwt.sign({ userUuid }, secret, { expiresIn: 1800 });

    res.cookie('currentUser', currentUserToken, { maxAge: 1800000, httpOnly: true });
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
    const { username, userUuid, storeUuid } = users.users[userIndex];

    const roleText: string = (role === 'admin') ? 'n admin' : ' shopper';
    
    if (((!adminLoginForm) && (role === 'shopper')) || // check shopper uses shopper-login
        ((adminLoginForm) && (role === 'admin'))) { // and admin uses admin-login
      const currentUserToken: any = jwt.sign({ userUuid }, secret, { expiresIn: 1800 });

      res.cookie('currentUser', currentUserToken, { maxAge: 1800000, httpOnly: true });
      res.send({ title: `Welcome back, ${username}!`, text: `Enjoy your visit!`, storeUuid, isLoggedIn: true});
    } else res.send({ title: `${username}, you are not a${roleText}!`, text: `Please use the right login form!`, isLoggedIn: false});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const details = (req, res)=> { // all htmls except for index.html,  register.html, shopper-register.html
  try {
    const userIndex: string = req.userIndex;
    const isAdmin: boolean = req.isAdmin;
    
    const users = new Users();
    const user = users.users[userIndex];
    const { username, cart, purchased } = user;
    
    if (!isAdmin) res.send({ username, cart, purchased });
    else res.send({ username });


  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function addToCart(req, res) { // store.html
  try {
    const { productUuid, productName } = req.body;

    const users = new Users();
    const { userUuid } = req.userUuid;

    users.addCartProduct(userUuid, productUuid);

    res.send({ title: `${productName} added to your cart!`, addToCart: true});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function updateQuantity(req, res) { // store.html + cart.html
  try {
    const { productUuid, productName, mathSign } = req.body;

    const users = new Users();
    const { userUuid } = req.userUuid;

    const productQuantity: number = users.updateCartProductQuantity(userUuid, productUuid, mathSign);

    res.send({ title: `There are now ${productQuantity} ${productName}(s) in your cart`, updateQuantity: true});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function deleteFromCart(req, res) { // cart.html
  try {
    const { productUuid, productName } = req.body;

    const users = new Users();
    const { userUuid } = req.userUuid;

    users.deleteCartProduct(userUuid, productUuid);

    res.send({ title: `You have delete ${productName} from your cart`, deleteFromCart: true});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function purchaseCart(req, res) { // cart.html
  try {
    const users = new Users();
    const { userUuid } = req.userUuid;

    users.emptyCart(userUuid);


    res.send({ title: `Cart purchase completed`, purchaseCart: true});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}