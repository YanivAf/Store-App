export {};

const { Product, Store, Stores } = require('../../models/dist/storesModel');
const { CartProduct, User, Users } = require('../../models/dist/usersModel');

export const showStores = (req, res)=> {
  try {
    const stores = new Stores();
    res.send({ stores });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showProducts = (req, res)=> { // store.html
  try {
    const { storeUuid } = req.params;
    const stores = new Stores();
    const storeIndex: number = stores.findStoreIndex(storeUuid);
    const store = stores.stores[storeIndex];

    if (storeUuid === 'mall') {
      const { userIndex } = req;
      const users = new Users();
      const shippingAddress: string = users.users[userIndex].shippingAddress;
      res.send({ stores, shippingAddress });
    }
    else res.send({ store });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const showProduct = (req, res)=> { // product.html
  try {
    const { isAdmin, userIndex, cartProductIndex, storeIndex, productIndex } = req;

    const stores = new Stores();
    const store = stores.stores[storeIndex];

    const users = new Users();

    const storeProduct: Product = store.products[productIndex];
    let cartProduct: CartProduct = undefined;
    if ((!isAdmin) && (cartProductIndex !== -1)) cartProduct = users.users[userIndex].cart[cartProductIndex];

    res.send({ storeProduct, cartProduct });

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
    const { storeUuid, productName, productDescription } = req.body;
    let { productPrice, precentsOff, productInStock } = req.body;
    productPrice = Number(productPrice);
    precentsOff = Number(precentsOff);
    productInStock = Number(productInStock);

    const stores = new Stores();

    const filename = (req.file) ? req.file.filename : undefined;

    const store: Store = stores.addProduct(storeUuid, productName, productDescription, productPrice, precentsOff, filename, productInStock);

    res.send({ store });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const editProduct = (req, res)=> { // product.html
  try {

    const { storeUuid, productName, productDescription } = req.body;
    let { productPrice, precentsOff, productInStock } = req.body;
    productPrice = Number(productPrice);
    precentsOff = Number(precentsOff);
    productInStock = Number(productInStock);

    const { userUuid } = req;
    const stores = new Stores();
    const { productUuid } = req.params;

    const filename = (req.file) ? req.file.filename : undefined;

    stores.editProduct(storeUuid, userUuid, productUuid, productName, productDescription, productPrice, precentsOff, filename, productInStock);

    res.send({ productUpdate: true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const deleteProduct = (req, res)=> { // store.html
  try {
    const stores = new Stores();
    const { storeUuid, productUuid } = req.params;

    stores.deleteProduct(storeUuid, productUuid);

    res.send({ deleteProduct: true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}