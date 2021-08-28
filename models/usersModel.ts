export {};

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const usersJsonPath = path.resolve(__dirname, "../users.json");
const storeJsonPath = path.resolve(__dirname, "../store.json");

const { readStoreJson, Product, Store } = require('./storeModel');

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
        this.totalPrice = 0;
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

    verifyUser(userEmail: string, userPassword: string): User { // login attempt TODO - think if it should be a middleware
        try {

            const user: User = this.users.find(user => user.email === userEmail && user.password === userPassword);
            if (!user) throw new Error(`credentials are wrong`);

            return user;

        } catch (error) {
            console.error(error.message);
        }
    }

    findUserIndex(userUuid: string, userEmail: string): number {
        try {
            const userIndex: number = (userUuid) ? this.users.findIndex(user => user.userUuid === userUuid)
                                                : this.users.findIndex(user => user.email === userEmail);
            if ((userIndex === -1) && (userUuid)) throw new Error(`no user with uuid ${userUuid}`);
            
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
                const store: Store = readStoreJson();
                store.storeUuid = storeUuid;
                fs.writeFileSync(storeJsonPath, JSON.stringify(store)); 
            } else storeUuid = this.users[firstAdminIndex].stores[0]; // else - assign the existing store (currently only 1 exists)

            return storeUuid;
            
        } catch (error) {
            console.error(error.message);
        }
    }

    addUser(userEmail: string, userUsername: string, userPassword: string, isAdmin: boolean): object {
        try {
            const user = new User(userEmail, userUsername, userPassword);
            const userIndex: number = this.findUserIndex(null, userEmail);

            if (isAdmin) { // admin registration attempt
                if (userIndex !== -1) { // email exists
                    if ((this.users[userIndex].stores.length === 0) && // if exist as shopper + entered registered username & password
                        (this.users[userIndex].username === userUsername) &&
                        (this.users[userIndex].password === userPassword)) {
                        
                        this.users[userIndex].stores.push(this.storeUuid());

                        this.updateUsersJson();

                        return { userUuid: this.users[userIndex].userUuid, storeUuid: this.users[userIndex].stores[0] }; // convert shopper to admin
                    } else return null; // unverified shopper OR admin exists
                } else { // email doesn't exist
                    user.stores.push(this.storeUuid());
                    this.users.push(user); // add admin
                    
                }
            } else // shopper registration attempt
            if (userIndex !== -1) return null; // shopper exists
            else this.users.push(user); // add shopper

            this.updateUsersJson();

            return { userUuid: user.userUuid, storeUuid: [] };

        } catch (error) {
            console.error(error.message);
        }
    }

    completeCartProductDetails(quantity: number, productUuid: string): CartProduct {
        try {
            const store: Store = readStoreJson();
            const product: Product = store.products.find(product => product.productUuid === productUuid);
            const productPrice: number = product.productPrice;
            
            const cartProduct = new CartProduct(productUuid);
            cartProduct.productName = product.productName;
            cartProduct.quantity = quantity;
            cartProduct.totalPrice = productPrice * quantity;
            
            return cartProduct;
        

        } catch (error) {
            console.error(error.message);
        }
    }

    addCartProduct(shopperUuid: string, productUuid: string): CartProduct {
        try {
            const shopperIndex: number = this.findUserIndex(shopperUuid, null);

            const cartProduct: CartProduct = this.completeCartProductDetails(1, productUuid);

            this.users[shopperIndex].cart.push(cartProduct);
            
            
            this.updateUsersJson();
            
            return cartProduct;

        } catch (error) {
            console.error(error.message);
        }
    }

    findCartProduct(shopperIndex: number, productUuid: string): number {
        try {
            const cartProductIndex: number = this.users[shopperIndex].cart.findIndex(cartProduct => cartProduct.productUuid === productUuid);
            if (cartProductIndex === -1) throw new Error(`product ${productUuid} wasn't found in cart`);
            
            return cartProductIndex;

        } catch (error) {
            console.error(error.message);
        }
    }

    deleteCartProduct(shopperUuid: string, productUuid: string) { // on direct deletion or when quantity === 0
        try {
            const shopperIndex: number = this.findUserIndex(shopperUuid, null);
            const cartProductIndex: number = this.findCartProduct(shopperIndex, productUuid); // used to catch error if product doesn't exist

            this.users[shopperIndex].cart = this.users[shopperIndex].cart.filter(cartProduct => cartProduct.productUuid !== productUuid);

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }

    updateCartProductQuantity(shopperUuid: string, productUuid: string, mathSign: string): CartProduct {
        try {
            const shopperIndex: number = this.findUserIndex(shopperUuid, null);
            const cartProductIndex: number = this.findCartProduct(shopperIndex, productUuid);

            if (mathSign === '+') this.users[shopperIndex].cart[cartProductIndex].quantity++;
            else this.users[shopperIndex].cart[cartProductIndex].quantity--;

            const cartProductQuantity: number = this.users[shopperIndex].cart[cartProductIndex].quantity;
            
            let cartProduct: CartProduct;
            if (cartProductQuantity === 0) this.deleteCartProduct(shopperUuid, productUuid);
            else {
                cartProduct = this.completeCartProductDetails(cartProductQuantity, productUuid);
                this.users[shopperIndex].cart[cartProductIndex] = cartProduct;
            }

            this.updateUsersJson();

            return cartProduct;

        } catch (error) {
            console.error(error.message);
        }
    }

    updatePurcased(shopperIndex: number/*, storeUuid: string*/) { // seperated from emptyCart for clarity
        try {
            this.users[shopperIndex].cart.forEach(cartProduct => { // update quantities&totalPrice in purchased according to shppoer purchase
                const cartProductIndex: number = this.users[shopperIndex].purchased.findIndex(cartProductPurchased => cartProductPurchased.productUuid == cartProduct.productUuid);
                if (cartProductIndex === -1) this.users[shopperIndex].purchased.push(cartProduct);
                else {
                    this.users[shopperIndex].purchased[cartProductIndex].quantity += cartProduct.quantity;
                    this.users[shopperIndex].purchased[cartProductIndex].totalPrice += cartProduct.totalPrice;
                }
            });

            const store: Store = readStoreJson();
            this.users[shopperIndex].cart.forEach(cartProduct => { // update stock quantities in store according to shppoer purchase
                const productIndex: number = store.products.findIndex(product => product.productUuid === cartProduct.productUuid);
                store.products[productIndex].inStock -= cartProduct.quantity;
            });

            fs.writeFileSync(storeJsonPath, JSON.stringify(store));

        } catch (error) {
            console.error(error.message);
        }
    }

    emptyCart(shopperUuid: string/*, storeUuid: string*/) { // after payment.
        try {
            const shopperIndex: number = this.findUserIndex(shopperUuid, null);

            this.updatePurcased(shopperIndex/*, storeUuid*/); // storeUuid will be used when there is more than 1 store
            this.users[shopperIndex].cart = [];

            this.updateUsersJson();

        } catch (error) {
            console.error(error.message);
        }
    }
}