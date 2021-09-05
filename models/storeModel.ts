export {};

const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const storeJsonPath = path.resolve(__dirname, "../store.json");

const { CartProduct } = require('./usersModel');

export const productImgStorage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    }
});

export const readStoreJson = () => {
    try {
      const store: any = fs.readFileSync(storeJsonPath);
      return JSON.parse(store);
    } catch (error) {
      console.error(error.message);
    }
}

export class Product {
    productUuid: string;
    storeUuid: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImage: string; // uploaded file path
    inStock: number;

    constructor (productUuid: string, storeUuid: string, productName: string, productDescription: string, productPrice: number, productImage: string, inStock: number) {
        this.productUuid = (productUuid) ? productUuid : uuidv4();
        this.storeUuid = storeUuid;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productImage = `images/${productImage}`;
        this.inStock = inStock;
    }
}

export class PurchasedCart {
    purchasedCartProducts: Array<CartProduct>;
    shopperEmail: string;
    shopperUsername: string;
    shopperUuid: string;

    constructor(purchasedCartProducts: Array<CartProduct>, shopperEmail: string, shopperUsername: string, shopperUuid: string) {
        this.purchasedCartProducts = purchasedCartProducts;
        this.shopperEmail = shopperEmail;
        this.shopperUsername = shopperUsername;
        this.shopperUuid = shopperUuid;
    }
}

export class Store {
    storeUuid: string;
    storeName: string; // set after registration
    products: Array<Product>; // all products in store
    purchasedCarts: Array<PurchasedCart>;
    
    constructor() {
        const store = readStoreJson();
        this.storeUuid = store.storeUuid;
        this.storeName = store.storeName;
        this.products = store.products;
        this.purchasedCarts = store.purchasedCarts;
    }

    updateStoreJson() {
        try {
            fs.writeFileSync(storeJsonPath, JSON.stringify({ storeUuid: this.storeUuid, storeName: this.storeName, products: this.products, purchasedCarts: this.purchasedCarts }));
        } catch (error) {
            console.error(error.message);
        }
    }

    updateStoreName(storeName: string/*, storeUuid: string*/) { // storeUuid will be used when there is more than 1 store
        try {
            this.storeName = storeName;

            this.updateStoreJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    findProductIndex(productUuid: string): number {
        try {
            const productIndex: number = this.products.findIndex(product => product.productUuid === productUuid);

            return productIndex;

        } catch (error) {
            console.error(error.message);
        }
    }

    addProduct(productName: string, productDescription: string, productPrice: number, filename: string, inStock: number, storeUuid: string) {
        try {
            const product = new Product(undefined, this.storeUuid, productName, productDescription, productPrice, filename, inStock);

            this.products.push(product);

            this.updateStoreJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    editProduct(productUuid: string, productName: string, productDescription: string, productPrice: number, filename: string, inStock: number) {
        try {
            const product = new Product(productUuid, this.storeUuid, productName, productDescription, productPrice, filename, inStock);

            const productIndex: number = this.findProductIndex(productUuid);
            
            this.products[productIndex] = product;

            this.updateStoreJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    deleteProduct(productUuid: string) {
        try {
            this.products = this.products.filter(product => product.productUuid !== productUuid);

            this.updateStoreJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    addPurchesedCart(purchasedCartProducts: Array<CartProduct>, shopperEmail: string, shopperUsername: string, shopperUuid: string) {
        try {
            const purchasedCart = new PurchasedCart(purchasedCartProducts, shopperEmail, shopperUsername, shopperUuid);
            this.purchasedCarts.push(purchasedCart);

            this.updateStoreJson();

        } catch (error) {
            console.error(error.message);
        }
    }
}