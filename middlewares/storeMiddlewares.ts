export {};

const { Product, Store, Stores } = require("../../models/dist/storesModel");
const { CartProduct, User, Users } = require("../../models/dist/usersModel");

export function doesStoreExist(req, res, next) {
    try {
        const stores = new Stores();

        let storeUuid: string = req.params.storeUuid ?? req.body.storeUuid;
        let storeIndex: number;

        if (storeUuid === 'mall') {
            next();
            return;
        }
        
        if (storeUuid === 'all cart products stores') {
            const users = new Users();
            const userIndex: number = req.userIndex;
    
            users.users[userIndex].cart.forEach(cartProduct => {
                storeUuid = cartProduct.storeUuid;
                storeIndex = stores.findStoreIndex(storeUuid);
                if (storeIndex === -1) {
                    res.status(404).send({ message: `Store of "${cartProduct.productName}" doesn't exist anymore. To continue, please delete it from your cart.` });
                    return;
                }
            });
            next();
            return;
        }
        
        storeIndex = stores.findStoreIndex(storeUuid);

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

        const userIndex: number = req.userIndex;
        let productUuid: string = req.params.productUuid ?? req.body.productUuid;
        let storeIndex: number = req.storeIndex;
        let productIndex: number;
        
        if (productUuid === 'all cart products') {
            let storeUuid: string;

            users.users[userIndex].cart.forEach(cartProduct => {
                storeUuid = cartProduct.storeUuid;
                productUuid = cartProduct.productUuid;
                storeIndex = stores.findStoreIndex(storeUuid);

                productIndex = stores.findStoreProductIndex(storeIndex, productUuid);

                if (productIndex === -1) {
                    res.status(404).send({ message: `"${cartProduct.productName}" doesn't exist anymore. To continue, please delete it from your cart.` });
                    return;
                }
            });
            next();
            return;
        }

        productIndex = stores.findStoreProductIndex(storeIndex, productUuid);
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

        const userIndex: number = req.userIndex;
        const { productQuantity } = req.body;
        let storeIndex: number = req.storeIndex;
        let productIndex: number = req.productIndex;
        let cartProductIndex: number = req.cartProductIndex;
        let storeUuid: string = req.storeUuid;
        let productUuid: string = req.params.productUuid ?? req.body.productUuid;

        if (productUuid === 'all cart products') {
            let cartProductIndex: number = 0;

            users.users[userIndex].cart.forEach(cartProduct => {
                storeUuid = cartProduct.storeUuid;
                productUuid = cartProduct.productUuid;
                storeIndex = stores.findStoreIndex(storeUuid);
                
                productIndex = stores.findStoreProductIndex(storeIndex, productUuid);
                cartProduct.inStockMirror = stores.stores[storeIndex].products[productIndex].inStock;

                if (stores.stores[storeIndex].products[productIndex].inStockMirror < productQuantity) {
                    res.status(409).send({ message: `There are only ${cartProduct.inStockMirror} "${stores.stores[storeIndex].products[productIndex].productName}"s in stock. To continue, please adjust quantity (or save the product for later!)` });
                    return;
                }

                cartProductIndex++;
            });
            next();
            return;
        }

        const inStock: number = stores.stores[storeIndex].products[productIndex].inStock;
        const productName: string = stores.stores[storeIndex].products[productIndex].productName;

        cartProductIndex = (cartProductIndex === -1) ? users.addCartProduct(userIndex, storeUuid, productUuid, productName, inStock) : cartProductIndex;

        users.users[userIndex].cart[cartProductIndex].inStockMirror = stores.stores[storeIndex].products[productIndex].inStock;
        if (users.users[userIndex].cart[cartProductIndex].inStockMirror < productQuantity) res.status(409).send({ message: `There are only ${users.users[userIndex].cart[cartProductIndex].inStockMirror} "${stores.stores[storeIndex].products[productIndex].productName}"s in stock. To continue, please adjust quantity (or save the product for later!)` });
        else next();
        return;

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}