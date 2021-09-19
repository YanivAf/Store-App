export {};

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const storesJsonPath = path.resolve(__dirname, "../stores.json");

const { CartProduct } = require('./usersModel');

export const readStoresJson = () => {
    try {
      const store: any = fs.readFileSync(storesJsonPath);
      return JSON.parse(store);
    } catch (error) {
      console.error(error.message);
    }
}

export class Product {
    storeUuid: string;
    productUuid: string;
    productName: string;
    createdAt: Date;
    lastEditedAt: Date;
    lastEditedBy: string;
    productDescription: string;
    productPrice: number;
    precentsOff: number;
    productImage: string;
    inStock: number;
    ratings: Array<Review>;

    constructor (storeUuid: string, productUuid: string, productName: string, createdAt: Date, lastEditedAt: Date, lastEditedBy: string, productDescription: string, productPrice: number, precentsOff: number, productImage: string, inStock: number) {
        this.storeUuid = storeUuid;
        this.productUuid = productUuid ?? uuidv4();
        this.productName = productName;
        this.createdAt = createdAt;
        this.lastEditedAt = lastEditedAt;
        this.lastEditedBy = lastEditedBy;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.precentsOff = precentsOff ?? 0;
        this.productImage = (productImage) ? `images/${productImage}` : 'images/cart-wp.png';
        this.inStock = inStock;
    }
}

export class PurchasedCart {
    purchasedCartUuid: string; // retreived from the shopper
    purchasedCartProducts: Array<CartProduct>;
    shippingAddress: string;
    shopperEmail: string;
    shopperUsername: string;
    shopperUuid: string;
    purchasedAt: Date;

    constructor(purchasedCartUuid: string, purchasedCartProducts: Array<CartProduct>, shippingAddress: string, shopperEmail: string, shopperUsername: string, shopperUuid: string) {
        this.purchasedCartUuid = purchasedCartUuid;
        this.purchasedCartProducts = purchasedCartProducts;
        this.shopperEmail = shopperEmail;
        this.shopperUsername = shopperUsername;
        this.shopperUuid = shopperUuid;
        this.shippingAddress = shippingAddress;
        this.purchasedAt = new Date();
    }
}

export class Store {
    storeUuid: string;
    storeName: string; // set after registration
    createdAt: Date;
    storeAdminsUuids: Array<string>;
    lastEditedAt: Date;
    lastEditedBy: string;  
    products: Array<Product>;
    purchasedCarts: Array<PurchasedCart>;
    
    constructor(storeAdminsUuids) {
        this.storeUuid = uuidv4();
        this.storeName = 'Untitled Store';
        this.createdAt = new Date();
        this.storeAdminsUuids = storeAdminsUuids;
        this.lastEditedAt = null;
        this.lastEditedBy = null;
        this.products = [];
        this.purchasedCarts = [];
    }
}

export class Stores {
    stores: Array<Store>;

    constructor() {
        this.stores = readStoresJson();
    }

    updateStoresJson() {
        try {
            fs.writeFileSync(storesJsonPath, JSON.stringify(this.stores));
        } catch (error) {
            console.error(error.message);
        }
    }
    
    findStoreIndex(storeUuid: string): number {
        try {
            const storeIndex: number = this.stores.findIndex(store => store.storeUuid === storeUuid);

            return storeIndex;

        } catch (error) {
            console.error(error.message);
        }
    }

    addStore(storeAdminsUuids: Array<string>): number {
        try {
            const store = new Store(storeAdminsUuids);
            
            this.stores.push(store);
            const storeIndex = this.stores.length - 1;
            
            return storeIndex;

        } catch (error) {
            console.error(error.message);
        }
    }
    
    findStoreProductIndex(storeIndex: number, productUuid: string): number {
        try {
            const productIndex: number = this.stores[storeIndex].products.findIndex(product => product.productUuid === productUuid);

            return productIndex;

        } catch (error) {
            console.error(error.message);
        }
    }

    updateStoreName(storeName: string, storeUuid: string) {
        try {
            const storeIndex: number = this.findStoreIndex(storeUuid);
            this.stores[storeIndex].storeName = storeName;

            this.updateStoresJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    addProduct(storeUuid: string, productName: string, productDescription: string, productPrice: number, precentsOff: number, filename: string, inStock: number) {
        try {
            const storeIndex: number = this.findStoreIndex(storeUuid);
            const product = new Product(storeUuid, undefined, productName, new Date(), null, null, productDescription, productPrice, precentsOff, filename, inStock);
            
            this.stores[storeIndex].products.push(product);
            
            this.updateStoresJson();

            return this.stores[storeIndex];
            
        } catch (error) {
            console.error(error.message);
        }
    }
    
    editProduct(storeUuid: string, adminUuid: string, productUuid: string, productName: string, productDescription: string, productPrice: number, precentsOff: number, filename: string, inStock: number) {
        try {
            const storeIndex: number = this.findStoreIndex(storeUuid);
            const product = new Product(storeUuid, productUuid, productName, null, new Date(), adminUuid, productDescription, productPrice, precentsOff, filename, inStock);
            
            const productIndex: number = this.findStoreProductIndex(storeIndex, productUuid);
            if (!filename) product.productImage = this.stores[storeIndex].products[productIndex].productImage;
            product.createdAt = this.stores[storeIndex].products[productIndex].createdAt;
            
            this.stores[storeIndex].products[productIndex] = product;
            
            this.updateStoresJson();
            
        } catch (error) {
            console.error(error.message);
        }
    }
    
    deleteProduct(storeUuid: string, productUuid: string) {
        try {
            const storeIndex: number = this.findStoreIndex(storeUuid);
            
            this.stores[storeIndex].products = this.stores[storeIndex].products.filter(product => product.productUuid !== productUuid);
            
            this.updateStoresJson();
            
        } catch (error) {
            console.error(error.message);
        }
    }
    
    addPurchesedCart(shopperPurchasedCartUuid: string, purchasedCartProducts: Array<CartProduct>, shippingAddress: string, shopperEmail: string, shopperUsername: string, shopperUuid: string) {
        try {
            let purchasedCart: PurchasedCart;
            let purchasedStoreProducts: Array<CartProduct>;

            this.stores.forEach(store => {
                purchasedStoreProducts = purchasedCartProducts.filter(cartProduct => cartProduct.storeUuid === store.storeUuid);
                purchasedCart = new PurchasedCart(shopperPurchasedCartUuid, purchasedStoreProducts, shippingAddress, shopperEmail, shopperUsername, shopperUuid);
                store.purchasedCarts.push(purchasedCart);
            });

            this.updateStoresJson();

        } catch (error) {
            console.error(error.message);
        }
    }
}