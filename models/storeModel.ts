export {};

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const storeJsonPath = path.resolve(__dirname, "../store.json");

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
    productName: string;
    productDescription: string;
    productPrice: number;
    productImage: any; // upload file
    inStock: number; // how many in stock
    storeUuid: string;

}

export class Store {
    storeUuid: string;
    storeName: string; // set after registration
    products: Array<Product>; // all products in store
    
    constructor() {
        const store = readStoreJson();
        this.storeUuid = store.storeUuid;
        this.storeName = store.storeName;
        this.products = store.products;
    }

    updateStoreJson() {
        try {
            fs.writeFileSync(storeJsonPath, JSON.stringify({ storeUuid: this.storeUuid, storeName: this.storeName, products: this.products }));
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

    addProduct() {
        try {

        } catch (error) {
            console.error(error.message);
        }
    }

    editProduct() {
        try {

        } catch (error) {
            console.error(error.message);
        }
    }

    deleteProduct() {
        try {

        } catch (error) {
            console.error(error.message);
        }
    }
}