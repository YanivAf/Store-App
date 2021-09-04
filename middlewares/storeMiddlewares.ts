export {};

const { secret } = require('../../secret/dist/secret');
const { Product, Store } = require("../../models/dist/storeModel");
const { Users, User, CartProduct } = require("../../models/dist/usersModel");

// export function doesStoreExist(req, res, next) {
//     try {
//         // some logic

//         if (storeIndex === -1) res.status(404).send({ message: `Store doesn't exist. Apologies for the inconvenience.` });
//         else {
//             req.storeIndex = storeIndex;
//             next();
//         }
//         return; 

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send(error.message);    
//     }
// }

export function doesProductExist(req, res, next) {
    try {
        const store = new Store();
        const users = new Users();

        const { productUuid } = req.body;
        const userIndex: number = req.userIndex;
        const productIndex: number = store.findProductIndex(productUuid);
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
        const store = new Store();
        const users = new Users();
        const { productQuantity } = req.body;

        const productIndex: number = req.productIndex;
        const userIndex: number = req.userIndex;
        const cartProductIndex: number = req.cartProductIndex;
        
        if (cartProductIndex !== -1) {
            if (store.products[productIndex].inStock + users.users[userIndex].cart[cartProductIndex].quantity < productQuantity) res.status(409).send({ message: `Not enough items in stock. Apologies for the inconvenience.` });
            else next();
            return;
        } else {
            if (store.products[productIndex].inStock < productQuantity) res.status(409).send({ message: `Not enough items in stock. Apologies for the inconvenience.` });
            else next();
            return;
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

