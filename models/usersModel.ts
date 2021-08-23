export {};

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const usersJsonPath = path.resolve(__dirname, "../users.json");
const storeJsonPath = path.resolve(__dirname, "../store.json");

const readStoreJson = () => {
    try {
      const store: any = fs.readFileSync(storeJsonPath);
      return JSON.parse(store);
    } catch (error) {
      console.error(error);
    }
}

export class Store {
    storeUuid: string;
    storeName: string;
    products: Array<any>;
}

const readUsersJson = () => {
  try {
    const users: any = fs.readFileSync(usersJsonPath);
    return JSON.parse(users);
  } catch (error) {
    console.error(error);
  }
}

export class CartProduct {
    productUuid: string;
    quantity: number;
    
    constructor(productUuid) {
        this.productUuid = productUuid;
        this.quantity = 1;
    }
}

export class User {
    userUuid: string;
    email: string;
    username: string;
    password: string;
    storeUuid: string; // for admins
    cart: Array<CartProduct>;
    purchased: Array<CartProduct>; // previous carts products
    
    constructor(email, username, password) { // isAdmin sent from register() in usersController.ts
        this.userUuid = uuidv4();
        this.email = email;
        this.username = username;
        this.password = password;
        this.storeUuid = null;
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
            console.error(error);
        }
    }

    verifyUser(userEmail: string, userPassword: string) { // login attempt TODO - think if it should be a middleware
        try {

            const doesUserExist: User = this.users.find(user => user.email === userEmail && user.password === userPassword);
            if (doesUserExist) return doesUserExist;

            return undefined;

        } catch (error) {
            console.error(error);
        }
    }

    findUserIndex(userUuid: string, userEmail: string): number {
        try {
            const userIndex: number = (userUuid) ? this.users.findIndex(user => user.userUuid === userUuid)
                                                : this.users.findIndex(user => user.email === userEmail);
            if ((userIndex === -1) && (userUuid)) throw new Error(`no user with uuid ${userUuid}`);

            return userIndex;

        } catch (error) {
            console.error(error);
        }
    }

    storeUuid(): string { // TODO - check if this should be a middleware
        try {
            const firstAdminIndex: number = this.users.findIndex(user => user.storeUuid !== null); 
            let storeUuid: string;
            if (firstAdminIndex === -1) {
                storeUuid = uuidv4(); /// if a store doesn't exist - create it
                const store: Store = readStoreJson();
                store.storeUuid = storeUuid;
                fs.writeFileSync(storeJsonPath, JSON.stringify(store)); 
            } else storeUuid = this.users[firstAdminIndex].storeUuid; // else - assign the existing store

            return storeUuid;
            
        } catch (error) {
            console.error(error);
        }
    }

    addUser(userEmail: string, userUsername: string, userPassword: string, isAdmin: boolean): string {
        try {
            const user = new User(userEmail, userUsername, userPassword);
            const userIndex: number = this.findUserIndex(null, userEmail);

            if (isAdmin) { // admin registration attempt
                if (userIndex !== -1) { // email exists
                    if ((this.users[userIndex].storeUuid === null) && // if buyer + entered registered username & password
                        (this.users[userIndex].username === userUsername) &&
                        (this.users[userIndex].password === userPassword)) {
                        
                        this.users[userIndex].storeUuid = this.storeUuid();
                        
                        this.updateUsersJson();

                        return this.users[userIndex].userUuid; // convert buyer to admin
                    } else return null; // unverified buyer OR admin exists
                } else { // email doesn't exist
                    user.storeUuid = this.storeUuid();
                    this.users.push(user); // add admin
                    
                }
            } else if (userIndex !== -1) return null; // buyer registration attempt + buyer exists
            else this.users.push(user); // add buyer

            this.updateUsersJson();

            return user.userUuid;

        } catch (error) {
            console.error(error);
        }
    }

    addCartProduct(buyerUuid: string, productUuid: string) {
        try {
            const buyerIndex: number = this.findUserIndex(buyerUuid, null);

            const cartProduct = new CartProduct(productUuid);
            this.users[buyerIndex].cart.push(cartProduct);

            this.updateUsersJson();

        } catch (error) {
            console.error(error);
        }
    }

    findCartProduct(buyerIndex: number, productUuid: string) {
        try {
            const cartProductIndex: number = this.users[buyerIndex].cart.findIndex(cartProduct => cartProduct.productUuid === productUuid);
            if (cartProductIndex === -1) throw new Error(`product ${productUuid} wasn't found in cart`);
            
            return cartProductIndex;

        } catch (error) {
            console.error(error);
        }
    }

    deleteCartProduct(buyerUuid: string, productUuid: string) { // on direct deletion or when quantity === 0
        try {
            const buyerIndex: number = this.findUserIndex(buyerUuid, null);
            const cartProductIndex: number = this.findCartProduct(buyerIndex, productUuid); // used to catch error if product doesn't exist

            this.users[buyerIndex].cart = this.users[buyerIndex].cart.filter(cartProduct => cartProduct.productUuid !== productUuid);

            this.updateUsersJson();

        } catch (error) {
            console.error(error);
        }
    }

    updateCartProductQuantity(buyerUuid: string, productUuid: string, mathSign: string) {
        try {
            const buyerIndex: number = this.findUserIndex(buyerUuid, null);
            const cartProductIndex: number = this.findCartProduct(buyerIndex, productUuid);

            if (mathSign === '+') this.users[buyerIndex].cart[cartProductIndex].quantity++;
            else {
                this.users[buyerIndex].cart[cartProductIndex].quantity--;
                if (this.users[buyerIndex].cart[cartProductIndex].quantity === 0) this.deleteCartProduct(buyerUuid, productUuid);
            }

            this.updateUsersJson();

        } catch (error) {
            console.error(error);
        }
    }

    emptyCart(buyerUuid: string) { // after payment
        try {
            const buyerIndex: number = this.findUserIndex(buyerUuid, null);

            this.updatePurcased(buyerIndex);
            this.users[buyerIndex].cart = [];

            this.updateUsersJson();

        } catch (error) {
            console.error(error);
        }
    }

    updatePurcased(buyerIndex: number) { // seperated from emptyCart for clarity
        try {
            this.users[buyerIndex].purchased.push(...this.users[buyerIndex].cart);

        } catch (error) {
            console.error(error);
        }
    }
}
