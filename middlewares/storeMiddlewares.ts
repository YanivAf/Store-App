export {};

const { secret } = require('../../secret/dist/secret');
const { Product, Store } = require("../../models/dist/storeModel");

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
        const { productUuid } = req.body;
        const productIndex: number = store.findProductIndex(productUuid);

        if (productIndex === -1) res.status(404).send({ message: `Product doesn't exist. Apologies for the inconvenience.` });
        else {
            req.productIndex = productIndex;
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
        const { productQuantity } = req.body;

        const productIndex: number = req.productIndex;
        
        if (store.products[productIndex].quantity < productQuantity) res.status(409).send({ message: `Not enough items in stock. Apologies for the inconvenience.` });
        else {
            next();
        }
        return; 

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

