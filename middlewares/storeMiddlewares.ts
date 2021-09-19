export {};

const { secret } = require('../../secret/dist/secret'); // TODO convert secret to be used from env
const { Product, Store, Stores } = require("../../models/dist/storesModel");
const { CartProduct, User, Users } = require("../../models/dist/usersModel");

export function doesStoreExist(req, res, next) {
    try {
        const stores = new Stores();

        let storeUuid: string = req.params.storeUuid ?? req.body.storeUuid;

        if (storeUuid === 'mall') {
            next();
            return;
        }
        
        const storeIndex: number = stores.findStoreIndex(storeUuid);

        if (storeIndex === -1) res.status(404).send({ message: `Store doesn't exist. Apologies for the inconvenience.` });
        else {
            req.storeUuid = storeUuid;
            req.storeIndex = storeIndex;
            next();
        }
        return; 

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function doesProductExist(req, res, next) {
    try {
        const stores = new Stores();
        const users = new Users();
        const productUuid: string = req.params.productUuid ?? req.body.productUuid;

        const storeIndex: number = req.storeIndex;
        const userIndex: number = req.userIndex;
        const productIndex: number = stores.findStoreProductIndex(storeIndex, productUuid);
        const cartProductIndex: number = users.findCartProduct(userIndex, productUuid);

        if (productIndex === -1) res.status(404).send({ message: `Product doesn't exist. Apologies for the inconvenience.` });
        else {
            req.productIndex = productIndex;
            req.cartProductIndex = cartProductIndex;
            next();
        }
        return; 

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function enoughInStock(req, res, next) {
    try {
        const stores = new Stores();
        const users = new Users();
        const { productQuantity } = req.body;

        const storeIndex: number = req.storeIndex;
        const userIndex: number = req.userIndex;
        const productIndex: number = req.productIndex;
        const cartProductIndex: number = req.cartProductIndex;
        
        const cartProductQuantity: number = (cartProductIndex === -1) ? 0 : users.users[userIndex].cart[cartProductIndex].quantity;
        if (stores.stores[storeIndex].products[productIndex].inStock + cartProductQuantity < productQuantity) res.status(409).send({ message: `Not enough items in stock. Apologies for the inconvenience.` });
        else next();
        return;

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}