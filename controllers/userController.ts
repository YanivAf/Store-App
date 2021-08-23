export {};

const { Users } = require("../../models/dist/usersModel");

export function welcome(req, res) {
  try {
    res.send({h1Text:`Shop Shop Shop`, message: "We wish you happy Shopping 🛒"});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const adminPanel = (req, res)=>{
  try {
    res.send({adminPanel:true})

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function register(req, res) {
  try {
    const { email, username, password, isAdmin } = req.body;
    
    const role: string = (isAdmin) ? 'admin' : 'buyer';
    const buyerToAdminText: string = (isAdmin) ? '\n\nBuyer trying to become an admin? Please verify you credentials.' : '';
    const users = new Users();
    const userUuid: string = users.addUser(email, username, password, isAdmin);

    res.cookie('isAdmin', { isAdmin }, { maxAge: 900000, httpOnly: true });
    
    if (userUuid) res.send({ title: `Cheers, ${username}!`, text: `You are our newest ${role}!`, userUuid});
    else res.send({ title: 'Email already registered', text:`Please use a different email address.${buyerToAdminText}` });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function login(req, res) {
  try {
    const { email, password } = req.body;

    if (email && password) {
      res.cookie('isAdmin', { isAdmin }, { maxAge: 900000, httpOnly: true }); // TODO build isAdmin logic
    }

    res.send({ login: true, isAdmin }); 

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}