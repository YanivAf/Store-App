export {};

const { Users, User } = require("../../models/dist/usersModel");

export function welcome(req, res) {
  try {
    res.send({h1Text:`Shop Shop Shop`, message: "We wish you happy Shopping 🛒"});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showStores = (req, res)=>{
  try {
    // req.body should have userUuid
    // send stores + username + cart + purchased

    res.send({showStores:true})

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showProducts = (req, res)=>{ 
  try {
    // req.body should have storeUuid + userUuid
    // req.isAdmin to know if shopper or admin
    // for shopper - send also cart + purchased
    // send isAdmin + storeName + store products + username

    res.send({showProducts:true})

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function register(req, res) {
  try {
    const { email, username, password, isAdmin } = req.body;
    
    const role: string = (isAdmin) ? 'admin' : 'shopper';
    const shopperToAdminText: string = (isAdmin) ? '\n\nShopper trying to become an admin? Please verify you credentials.' : '';
    const users = new Users();
    const userUuid: string = users.addUser(email, username, password, isAdmin);

    if (userUuid) {
      res.cookie('currentUser', { userUuid }, { maxAge: 900000, httpOnly: true });
      res.send({ title: `Cheers, ${username}!`, text: `You are our newest ${role}!`, isRegistered: true});
    }
    else res.send({ title: 'Email already registered', text:`Please use a different email address.${shopperToAdminText}`, isRegistered: false });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function login(req, res) {
  try {
    const { email, password, isAdmin,  } = req.body;

    const role: string = (isAdmin) ? 'n admin' : ' shopper';
    const users = new Users();
    const verifiedUser: User = users.verifyUser(email, password);

    if (verifiedUser) {
      if (((verifiedUser.storeUuid === null) && (!isAdmin)) || // check shopper uses shopper-login and admin uses admin-login
          ((verifiedUser.storeUuid !== null) && (isAdmin))) {
        res.cookie('currentUser', { userUuid: verifiedUser.userUuid }, { maxAge: 900000, httpOnly: true });
        res.send({ title: `Welcome back, ${verifiedUser.username}!`, text: `Enjoy your visit!`, isLoggedIn: true});
      } else {
        res.send({ title: `${verifiedUser.username}, you are a${role}!`, text: `Please use the right login form!`, isLoggedIn: false});
      }
    }
    else res.send({ title: 'Credentials are wrong', text:`Please verify.`, isLoggedIn: false });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}