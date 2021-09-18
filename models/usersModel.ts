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
    totalPrice: number;
    quantity: number;
    status: string;
    purchasedAt: Date;
    
    constructor(storeUuid: string, productUuid: string) {
        this.storeUuid = storeUuid;
        this.productUuid = productUuid;
        this.quantity = 1;
        this.status = 'Awaiting Shipping';
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
    purchasedCarts: Array<PurchasedCart>; // previous carts products
    
    constructor(email: string, username: string, password: string) {
        this.userUuid = uuidv4();
        this.email = email;
        this.username = username;
        this.shippingAddress = 'No. StreetName st., CityName, CountryName';
        this.password = password;
        this.stores = [];
        this.cart = [];
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

    addCartProduct(shopperIndex: number, productUuid: string, storeUuid: string): number {
        try {
            const cartProduct = new CartProduct(storeUuid, productUuid);

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

    deleteCartProduct(shopperIndex: number, productUuid: string) {
        try {
            this.users[shopperIndex].cart = this.users[shopperIndex].cart.filter(cartProduct => cartProduct.productUuid !== productUuid);

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    updateCartProductQuantity(shopperIndex: number, cartProductIndex: number, storeUuid: string, storeIndex: number, productUuid: string, productIndex: number, productQuantity: number): Array<CartProduct> {
        try {
            const isNew: boolean = (cartProductIndex === -1) ? true : false;
            if (isNew) cartProductIndex = this.addCartProduct(shopperIndex, productUuid, storeUuid);

            const stores = new Stores();
            const cartQuantityChange: number = (isNew) ? productQuantity : productQuantity - this.users[shopperIndex].cart[cartProductIndex].quantity;

            if (productQuantity === -1) {
                stores.stores[storeIndex].products[productIndex].inStock += this.users[shopperIndex].cart[cartProductIndex].quantity;
                this.deleteCartProduct(shopperIndex, productUuid);
            } else {
                stores.stores[storeIndex].products[productIndex].inStock -= cartQuantityChange;
                this.users[shopperIndex].cart[cartProductIndex].quantity = productQuantity;

                const cartProductQuantity: number = this.users[shopperIndex].cart[cartProductIndex].quantity;
                const productPrice: number = stores.stores[storeIndex].products[productIndex].productPrice;
                const productPrecentsOff: number = stores.stores[storeIndex].products[productIndex].precentsOff;
                const cartProductPrice: number = productPrice - productPrice * (productPrecentsOff / 100);
                const cartProductName: string = stores.stores[storeIndex].products[productIndex].productName;
                
                this.users[shopperIndex].cart[cartProductIndex].totalPrice = cartProductQuantity * cartProductPrice;
                this.users[shopperIndex].cart[cartProductIndex].productName = cartProductName;
            }

            stores.updateStoresJson();
            this.updateUsersJson();

            return this.users[shopperIndex].cart;

        } catch (error) {
            console.error(error.message);
        }
    }

    addPurchesedCart(shopperIndex: number) {
        try {
            const purchasedCartProducts: Array<CartProduct> = this.users[shopperIndex].cart.filter(cartProduct => cartProduct.quantity > 0);
            const shippingAddress: string = this.users[shopperIndex].shippingAddress
            const purchasedCart = new PurchasedCart(purchasedCartProducts, shippingAddress);
            this.users[shopperIndex].purchasedCarts.push(purchasedCart);

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
            this.users[userIndex].cart = this.users[userIndex].cart.filter(cartProduct => cartProduct.quantity === 0);

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }
}