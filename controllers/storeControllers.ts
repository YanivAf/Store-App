export {};

const { secret } = require('../../secret/dist/secret');
const jwt = require('jwt-simple');
const { Users, User } = require('../../models/dist/usersModel');

export const showStores = (req, res)=> {
  try {
    // req.body should have userUuid
    // send stores + username + cart + purchased

    res.send({showStores:true});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showProducts = (req, res)=> { 
  try {
    // req.body should have storeUuid + userUuid
    // req.isAdmin to know if shopper or admin
    // for shopper - send also cart + purchased
    // send isAdmin + storeName + store products + username

    res.send({ showProducts:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const addProduct = (req, res)=> {
  try {

    // res.send({ addProduct:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const editProduct = (req, res)=> {
  try {

    // res.send({ editProduct:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const deleteProduct = (req, res)=> {
  try {

    // res.send({ deleteProduct:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}