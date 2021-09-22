export {};

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const usersJsonPath = path.resolve(__dirname, "../users.json");

const { Product, Store, Stores } = require('./storesModel');

const readUsersJson = () => {
  try {
    const users: any = fs.readFileSync(usersJsonPath);
    return JSON.parse(users);
  } catch (error) {
    console.error(error.message);
  }
}

export class CartProduct {
    storeUuid: string;
    productUuid: string;
    productName: string;
    inStockMirror: number;
    totalPrice: number;
    quantity: number;
    status: string;
    statusUpdatedAt: Date;
    purchasedAt: Date;
    
    constructor(storeUuid: string, productUuid: string, productName: string, inStockMirror: number) {
        this.storeUuid = storeUuid;
        this.productUuid = productUuid;
        this.productName = productName;
        this.inStockMirror = inStockMirror;
        this.quantity = 1;
        this.status = 'Awaiting Shipping';
        this.statusUpdatedAt = new Date();
    }
}

export class PurchasedCart {
    purchasedCartUuid: string;
    purchasedCartProducts: Array<CartProduct>;
    shippingAddress: string;
    purchasedAt: Date;

    constructor(purchasedCartProducts: Array<CartProduct>, shippingAddress: string) {
        this.purchasedCartUuid = uuidv4();
        this.purchasedCartProducts = purchasedCartProducts;
        this.shippingAddress = shippingAddress;
        this.purchasedAt = new Date();
    }
}

export class User {
    userUuid: string;
    email: string;
    username: string;
    shippingAddress: string;
    password: string;
    stores: Array<string>; // for admins
    cart: Array<CartProduct>;
    cartBackup: Array<CartProduct>;
    savedForLater: Array<string>; // products shopper saved for later 
    loved: Array<string>; // products shopper loved
    purchasedCarts: Array<PurchasedCart>; // previous carts products
    
    constructor(email: string, username: string, password: string) {
        this.userUuid = uuidv4();
        this.email = email;
        this.username = username;
        this.shippingAddress = 'No. StreetName st., CityName, CountryName';
        this.password = password;
        this.stores = [];
        this.cart = [];
        this.savedForLater = [];
        this.loved = [];
        this.purchasedCarts = [];
    }
}

export class Users {
    users: Array<User>;

    constructor() {
        this.users = readUsersJson();
    }

    updateUsersJson() {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        } catch (error) {
            console.error(error.message);
        }
    }

    findUserIndex(userUuid: string, userEmail: string): number {
        try {
            const userIndex: number = (userUuid) ? this.users.findIndex(user => user.userUuid === userUuid)
                                                : this.users.findIndex(user => user.email === userEmail);
            
            return userIndex;

        } catch (error) {
            console.error(error.message);
        }
    }

    addUser(userEmail: string, userUsername: string, userPassword: string, shopperToAdmin: boolean, userIndex: number, role: string/*, storeUuid: string, joinStoreToken: string*/): object {
        try {
            const user = new User(userEmail, userUsername, userPassword);
            
            const userUuid: string = (shopperToAdmin) ? this.users[userIndex].userUuid : user.userUuid;
            let storeUuid: string = undefined;

            if (role === 'admin') {
                const stores = new Stores();
                const storeIndex: number = stores.addStore([userUuid]);
                storeUuid = stores.stores[storeIndex].storeUuid;

                if (shopperToAdmin) {                        
                    this.users[userIndex].stores.push(storeUuid); // convert shopper to admin

                } else {
                    user.stores.push(storeUuid);
                    this.users.push(user); // add admin
                }

                stores.updateStoresJson();

            } else this.users.push(user); // add shopper

            this.updateUsersJson();

            return { userUuid, storeUuid }; 

        } catch (error) {
            console.error(error.message);
        }
    }

    restoreCart(shopperIndex: string): Array<CartProduct> {
        try {
            const stores = new Stores();
            let storeIndex: number;
            let productIndex: number;
            let cantBackup: Array<CartProduct> = [];

            this.users[shopperIndex].cartBackup.forEach(cartProduct => {
                storeIndex = stores.findStoreIndex(cartProduct.storeUuid);
                productIndex = stores.findStoreProductIndex(storeIndex, cartProduct.productUuid);

                if (stores.stores[storeIndex].products[productIndex].inStock >= cartProduct.quantity) {
                    stores.stores[storeIndex].products[productIndex].inStock -= cartProduct.quantity;
                    this.users[shopperIndex].cart.push(cartProduct);
                }
                else cantBackup.push(cartProduct);
            });

            this.users[shopperIndex].cartBackup = [];

            stores.updateStoresJson();
            this.updateUsersJson();

            return cantBackup;

        } catch (error) {
            console.error(error.message);
        }
    }

    addCartProduct(shopperIndex: number, storeUuid: string, productUuid: string, productName: string, inStock: number): number {
        try {
            const cartProduct = new CartProduct(storeUuid, productUuid, productName, inStock);

            this.users[shopperIndex].cart.push(cartProduct);
            const cartProductIndex: number = this.users[shopperIndex].cart.length - 1;
            
            this.users[shopperIndex].savedForLater = this.users[shopperIndex].savedForLater.filter(savedProductUuid => savedProductUuid !== productUuid);

            this.updateUsersJson();
            
            return cartProductIndex;

        } catch (error) {
            console.error(error.message);
        }
    }

    findCartProduct(shopperIndex: number, productUuid: string): number {
        try {
            let cartProductIndex: number = this.users[shopperIndex].cart.findIndex(cartProduct => cartProduct.productUuid === productUuid);

            return cartProductIndex;

        } catch (error) {
            console.error(error.message);
        }
    }

    deleteCartProduct(shopperIndex: number, productUuid: string) {
        try {
            this.users[shopperIndex].cart = this.users[shopperIndex].cart.filter(cartProduct => cartProduct.productUuid !== productUuid);

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    saveForLater(shopperIndex: number, productUuid: string) {
        try {
            this.users[shopperIndex].savedForLater.unshift(productUuid);

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    updateCartProductQuantity(shopperIndex: number, cartProductIndex: number, storeIndex: number, storeUuid: string, productUuid: string, productIndex: number, productQuantity: number): Array<CartProduct> {
        try {
            const stores = new Stores();

            const isNew: boolean = (cartProductIndex === -1) ? true : false;

            cartProductIndex = (isNew) ? this.users[shopperIndex].cart.length - 1 : cartProductIndex;
            const cartQuantityChange: number = (isNew) ? productQuantity : productQuantity - this.users[shopperIndex].cart[cartProductIndex].quantity;

            if (productQuantity < 0) {
                this.deleteCartProduct(shopperIndex, productUuid);
                if (productQuantity === -2) this.saveForLater(shopperIndex, productUuid);
            } else {

                this.users[shopperIndex].cart[cartProductIndex].inStockMirror -= cartQuantityChange;
                this.users[shopperIndex].cart[cartProductIndex].quantity = productQuantity;

                const cartProductQuantity: number = this.users[shopperIndex].cart[cartProductIndex].quantity;

                const productPrice: number = stores.stores[storeIndex].products[productIndex].productPrice;
                const productPrecentsOff: number = stores.stores[storeIndex].products[productIndex].precentsOff;
                const cartProductPrice: number = productPrice - productPrice * (productPrecentsOff / 100);

                this.users[shopperIndex].cart[cartProductIndex].totalPrice = cartProductQuantity * cartProductPrice;
            }

            stores.updateStoresJson();
            this.updateUsersJson();

            return this.users[shopperIndex].cart;

        } catch (error) {
            console.error(error.message);
        }
    }

    backupCartProducts(shopperIndex: number) {
        try {
            const stores = new Stores();
            let storeIndex: number;
            let productIndex: number;

            this.users[shopperIndex].cart.forEach(cartProduct => {
                storeIndex = stores.findStoreIndex(cartProduct.storeUuid);
                productIndex = stores.findStoreProductIndex(storeIndex, cartProduct.productUuid);

                stores.stores[storeIndex].products[productIndex].inStock += cartProduct.quantity;
                this.users[shopperIndex].cartBackup.push(cartProduct);
            });

            this.users[shopperIndex].cart = [];

            stores.updateStoresJson();
            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    addPurchesedCart(shopperIndex: number) {
        try {
            const purchasedCartProducts: Array<CartProduct> = this.users[shopperIndex].cart;
            const shippingAddress: string = this.users[shopperIndex].shippingAddress
            const purchasedCart = new PurchasedCart(purchasedCartProducts, shippingAddress);
            this.users[shopperIndex].purchasedCarts.unshift(purchasedCart);

            const shopperEmail: string = this.users[shopperIndex].email;
            const shopperUsername: string = this.users[shopperIndex].username;
            const shopperUuid: string = this.users[shopperIndex].userUuid;
            const stores = new Stores();
            stores.addPurchesedCart(purchasedCart.purchasedCartUuid, purchasedCartProducts, shippingAddress, shopperEmail, shopperUsername, shopperUuid);

        } catch (error) {
            console.error(error.message);
        }
    }

    emptyCart(userIndex: number) { // after payment.
        try {
            this.addPurchesedCart(userIndex);
            this.users[userIndex].cart = [];

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }
}