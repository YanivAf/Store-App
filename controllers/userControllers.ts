export {};

const { secret } = require('../../secret/dist/secret');
const jwt = require('jsonwebtoken');
const { Users, User } = require('../../models/dist/usersModel');
const { Product, Store } = require('../../models/dist/storeModel');

export function welcome(req, res) {
  try {
    res.send({h1Text:`Shop Shop Shop`, message: 'We wish you happy Shopping 🛒'});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function register(req, res) { // register.html + shopper-register.html
  try {
    const { email, username, password, isAdmin } = req.body;
    
    const role: string = (isAdmin) ? 'admin' : 'shopper';
    const shopperToAdminText: string = (isAdmin) ? '\n\nShopper trying to become an admin? Please verify you credentials.' : '';
    const users = new Users();
    const userBasicInfo = users.addUser(email, username, password, isAdmin);
    const { userUuid, storeUuid } = userBasicInfo;

    if (userUuid) {
      const cookieToWrite: string = JSON.stringify({ userUuid });
      const currentUserToken: any = jwt.sign(cookieToWrite, secret, { expiresIn: '1h' });

      res.cookie('currentUser', currentUserToken, { maxAge: 18000000, httpOnly: true });
      res.send({ title: `Cheers, ${username}!`, text: `You are our newest ${role}!`, storeUuid, isRegistered: true});
    }
    else res.send({ title: 'Email already registered', text:`Please use a different email address.${shopperToAdminText}`, isRegistered: false });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function login(req, res) { // index.html
  try {
    const { email, password, adminLoginForm } = req.body;

    const role: string = (adminLoginForm) ? 'n admin' : ' shopper';
    const users = new Users();
    const verifiedUser: User = users.verifyUser(email, password);
    
    if (verifiedUser) {
      const storeUuid: string = (verifiedUser.stores.length === 0) ? null : verifiedUser.stores[0];
      if (((!storeUuid) && (!adminLoginForm)) || // check shopper uses shopper-login and admin uses admin-login
          ((storeUuid) && (adminLoginForm))) {
        const cookieToWrite: string = JSON.stringify({ userUuid: verifiedUser.userUuid });
        const currentUserToken: any = jwt.sign(cookieToWrite, secret);

        res.cookie('currentUser', currentUserToken, { maxAge: 18000000, httpOnly: true });
        res.send({ title: `Welcome back, ${verifiedUser.username}!`, text: `Enjoy your visit!`, storeUuid, isLoggedIn: true});
      } else {
        res.send({ title: `${verifiedUser.username}, you are not a${role}!`, text: `Please use the right login form!`, isLoggedIn: false});
      }
    }
    else res.send({ title: 'Credentials are wrong', text:`Please verify.`, isLoggedIn: false });

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