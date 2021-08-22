export {};

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const usersJsonPath = path.resolve(__dirname, "../users.json");

const readJsonUsers = () => {
  try {
    const users = fs.readFileSync(usersJsonPath);
    return JSON.parse(users);
  } catch (error) {
    console.error(error);
  }
}

export class User {
    username: string;
    email: string; // acts as uuid
    password: string; // for admins
    storeName: string; // for admins (only one store per admin)
    storeUuid: string; // for admins
    products: Array<string>; // for admins - all products in store
    cart: Array<string>; // cart products uuids
    purchased: Array<string>; // purchased products uuids

    constructor(username, email, password, storeName, cart) {
        this.username = username;
        this.email = (email === null) ? uuidv4() : email; // uuid for buyers, email for admins
        this.password = (password === null) ? null : password;
        this.storeName = (storeName === null) ? null : storeName;
        this.storeUuid = (storeName === null) ? null : uuidv4();
        this.products = [];
        this.cart = []; // when paying for the first time - cart products are moved to "purchased"
        this.purchased = cart; // see comment above
    }
}

export class Users {
    users: Array<User>;

    constructor() {
        this.users = readJsonUsers();
    }

    updateUsersJson() {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        } catch (error) {
            console.error(error);
        }
    }

    createUser(user) {
        try {
            const emailIndex = this.users.findIndex(userItem => userItem.email === user.email);

            if (user.purchased === []) { // cart was empty => admin registration attempt
                if (emailIndex !== -1) { // email exists
                    if (this.users[emailIndex].password !== null) return true; // have password => admin exists
                    else { // don't have password => buyer becoming admin
                        this.users[emailIndex].password = user.password; // set password
                    }
                } else { // email doesn't exist
                    this.users.push(user); 
                }
            } else if (emailIndex !== -1) { // buyer paying for cart + uuid (email) exists
                this.users[emailIndex].purchased = [... user.purchased]; // add newely paid products to purchased
                this.users[emailIndex].cart = []; // remove paid products from cart      
            } else { // buyer paying for cart + uuid (email) doesn't exist
                this.users.push(user); // create buyer
            }

            this.updateUsersJson();

            return false;

        } catch (error) {
            console.error(error);
        }
    }

    loginUser(email, password) {
        try {
            const userExists = this.users.find(user => user.email === email && user.password === password);
            if (userExists) return userExists;

            return undefined;

        } catch (error) {
            console.error(error);
        }
    }

    findUsername (email) {
        try {
            const userExists = this.users.find(user => user.email === email);
            if (userExists) return userExists.username;

            return undefined;
            
        } catch (error) {
            console.error(error);
        }
    }

    addProductToCart(cookieEmail, addedProductUuid) {
        try {
            const loggedInUserIndex = this.users.findIndex(user => user.email === cookieEmail);
            this.users[loggedInUserIndex].cart.push(addedProductUuid);

            this.updateUsersJson();

        } catch (error) {
            console.error(error);
        }
    }

    deleteProductFromCart(cookieEmail, deletedProductUuid) {
        try {
            const loggedInUserIndex = this.users.findIndex(user => user.email === cookieEmail);
            this.users[loggedInUserIndex].cart = this.users[loggedInUserIndex].cart.filter(cartProduct => (cartProduct !== deletedProductUuid));

        this.updateUsersJson();

        } catch (error) {
            console.error(error);
        }
    }
}
