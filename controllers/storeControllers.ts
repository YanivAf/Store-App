export {};

const { secret } = require('../../secret/dist/secret');
const jwt = require('jwt-simple');
const { Product, Store } = require('../../models/dist/storeModel');

export const showStores = (req, res)=> { // stores.html
  try {
    // call additional get route to call from client: '/user/details'
    // req.body should have storeUuid
    const store = new Store();
    res.send(store);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showProducts = (req, res)=> { // store.html
  try {
    // call additional get route to call from client: '/user/details'
    const isAdmin = req.isAdmin;

    const storeUuid: string = (isAdmin) ? req.adminStoreUuid : req.body.storeUuid // needed when database will have more than 1 store in the future
    // if shopper- storeUuid from the id of store div in the client 
    // if admin- storeUuid from middleware

    const store = new Store();
    res.send({ store }); // needs products + storeName for h1 

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showProduct = (req, res)=> { // product.html
  try {

    // res.send({ showProduct:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const editStoreName = (req, res)=> { // store.html
  try {

    // res.send({ editStoreName:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const addProduct = (req, res)=> { // store.html
  try {

    // res.send({ addProduct:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const editProduct = (req, res)=> { // product.html
  try {

    // res.send({ editProduct:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const deleteProduct = (req, res)=> { // store.html
  try {

    // res.send({ deleteProduct:true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}