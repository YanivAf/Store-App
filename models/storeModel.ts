class Product {
productUuid: string;
productName: string;
productDescription: string;
productPrice: number;
productImage: any; // upload file(?)
inStock: number; // how many in stock
storeUuid: string;

}

class Store {
storeUuid: string;
storeName: string; // set after registration
products: Array<Product>; // all products in store

updateStoreName() {

}

addProduct() {

}

editProduct() {

}

deleteProduct() {

}

updateStoreJson() {
    
}

}