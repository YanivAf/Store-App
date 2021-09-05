export {};

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const usersJsonPath = path.resolve(__dirname, "../users.json");
const storeJsonPath = path.resolve(__dirname, "../store.json");

const { Product, Store } = require('./storeModel');

const readUsersJson = () => {
  try {
    const users: any = fs.readFileSync(usersJsonPath);
    return JSON.parse(users);
  } catch (error) {
    console.error(error.message);
  }
}

export class CartProduct {
    productUuid: string;
    productName: string;
    totalPrice: number;
    quantity: number;
    
    constructor(productUuid: string) {
        this.productUuid = productUuid;
        this.quantity = 1;
    }
}

export class User {
    userUuid: string;
    email: string;
    username: string;
    password: string;
    stores: Array<string>; // for admins
    cart: Array<CartProduct>;
    purchased: Array<CartProduct>; // previous carts products
    
    constructor(email: string, username: string, password: string) {
        this.userUuid = uuidv4();
        this.email = email;
        this.username = username;
        this.password = password;
        this.stores = [];
        this.cart = [];
        this.purchased = [];
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

    storeUuid(): string {
        try {
            const firstAdminIndex: number = this.users.findIndex(user => user.stores.length > 0); 
            let storeUuid: string;
            if (firstAdminIndex === -1) {
                storeUuid = uuidv4(); /// if a store doesn't exist - create it
                const store = new Store();
                store.storeUuid = storeUuid;
                store.updateStoreJson();

            } else storeUuid = this.users[firstAdminIndex].stores[0]; // else - assign the existing store (currently only 1 exists)

            return storeUuid;
            
        } catch (error) {
            console.error(error.message);
        }
    }

    addUser(userEmail: string, userUsername: string, userPassword: string, shopperToAdmin: boolean, userIndex: number, role: string): object {
        try {

            const user = new User(userEmail, userUsername, userPassword);

            const storeUuid: string = (role === 'admin') ? this.storeUuid() : undefined;
            const userUuid: string = (shopperToAdmin) ? this.users[userIndex].userUuid : user.userUuid;
            
            if (role === 'admin') {
                
                if (shopperToAdmin) {                        
                    this.users[userIndex].stores.push(storeUuid); // convert shopper to admin

                } else {
                    user.stores.push(storeUuid);
                    this.users.push(user); // add admin
                }
            } else this.users.push(user); // add shopper

            this.updateUsersJson();

            return { userUuid, storeUuid }; 

        } catch (error) {
            console.error(error.message);
        }
    }

    addCartProduct(shopperIndex: number, productUuid: string): number {
        try {
            const cartProduct = new CartProduct(productUuid);

            this.users[shopperIndex].cart.push(cartProduct);
            const cartProductIndex: number = this.users[shopperIndex].cart.length - 1;
            
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

    deleteCartProduct(shopperUuid: string, productUuid: string) { // on direct deletion or when quantity === 0
        try {
            const shopperIndex: number = this.findUserIndex(shopperUuid, null);

            this.users[shopperIndex].cart = this.users[shopperIndex].cart.filter(cartProduct => cartProduct.productUuid !== productUuid);

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    updateCartProductQuantity(shopperUuid: string, productUuid: string, productQuantity: number): Array<CartProduct> {
        try {
            const shopperIndex: number = this.findUserIndex(shopperUuid, null);
            let cartProductIndex: number = this.findCartProduct(shopperIndex, productUuid);
            const isNew: boolean = (cartProductIndex === -1) ? true : false;
            if (isNew) cartProductIndex = this.addCartProduct(shopperIndex, productUuid);

            const store = new Store();
            const productIndex: number = store.findProductIndex(productUuid);
            const cartQuantityChange: number = (isNew) ? productQuantity : productQuantity - this.users[shopperIndex].cart[cartProductIndex].quantity;

            if (productQuantity === 0) {
                store.products[productIndex].inStock += this.users[shopperIndex].cart[cartProductIndex].quantity;
                this.deleteCartProduct(shopperUuid, productUuid);
            } else {
                store.products[productIndex].inStock -= cartQuantityChange;
                this.users[shopperIndex].cart[cartProductIndex].quantity = productQuantity;

                const cartProductQuantity: number = this.users[shopperIndex].cart[cartProductIndex].quantity;
                const cartProductPrice: number = store.products[productIndex].productPrice;
                const cartProductName: string = store.products[productIndex].productName;
                
                this.users[shopperIndex].cart[cartProductIndex].totalPrice = cartProductQuantity * cartProductPrice;
                this.users[shopperIndex].cart[cartProductIndex].productName = cartProductName;
            }

            store.updateStoreJson();
            this.updateUsersJson();

            return this.users[shopperIndex].cart;

        } catch (error) {
            console.error(error.message);
        }
    }

    updatePurcased(shopperIndex: number/*, storeUuid: string*/) {
        try {
            this.users[shopperIndex].cart.forEach(cartProduct => { // update quantities&totalPrice in purchased according to shppoer purchase
                const cartProductIndex: number = this.users[shopperIndex].purchased.findIndex(cartProductPurchased => cartProductPurchased.productUuid == cartProduct.productUuid);
                if (cartProductIndex === -1) this.users[shopperIndex].purchased.push(cartProduct);
                else {
                    this.users[shopperIndex].purchased[cartProductIndex].quantity += cartProduct.quantity;
                    this.users[shopperIndex].purchased[cartProductIndex].totalPrice += cartProduct.totalPrice;
                }
            });

            const purchasedCartProducts: Array<CartProduct> = this.users[shopperIndex].cart;
            const shopperEmail: string = this.users[shopperIndex].email;
            const shopperUsername: string = this.users[shopperIndex].username;
            const shopperUuid: string = this.users[shopperIndex].userUuid;
            const store = new Store();
            store.addPurchesedCart(purchasedCartProducts, shopperEmail, shopperUsername, shopperUuid);

        } catch (error) {
            console.error(error.message);
        }
    }

    emptyCart(userIndex: number/*, storeUuid: string*/) { // after payment.
        try {
            this.updatePurcased(userIndex/*, storeUuid*/); // storeUuid will be used when there is more than 1 store
            this.users[userIndex].cart = [];

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }
}