export {};

const { Product, Store } = require('../../models/dist/storeModel');

export const showStores = (req, res)=> {
  try {
    const store = new Store();
    res.send({ storeUuid: store.storeUuid, storeName: store.storeName });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showProducts = (req, res)=> { // store.html
  try {
    const isAdmin = req.isAdmin;

    const storeUuid: string = req.params.storeUuid;
    const store = new Store();
    if (storeUuid === 'mall') store.storeName = 'Virtual Mall'; // show from all stores (needed if more than 1 store. for now only title changes)
    
    res.send({ store, isAdmin });

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