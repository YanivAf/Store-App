export {};

const { secret } = require('../../secret/dist/secret'); // TODO convert secret to be used from env
const { User, Users } = require("../../models/dist/usersModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export function isLoggedInAndAuthenticated(req, res, next) {
    try {
        const { currentUser } = req.cookies;
        
        if (currentUser) {
            jwt.verify(currentUser, secret, (err, decoded) => {
                if (err) {
                    res.status(401).send({message:'You are not authorized to see this page, mister hacker...'});
                    return;
                }
                req.currentUser = decoded;
                next();
            });
        } else res.status(401).send({message:'The session has expired. Please log in again.'});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function doesUserExist(req, res, next) {
    try {
        const users = new Users();

        if (req.currentUser) {
            const { currentUser } = req;
            const { userUuid } = currentUser;
            const userIndex: number = users.findUserIndex(userUuid, null);
        
            if (userIndex !== undefined) {
                req.userUuid = userUuid;
                req.userIndex = userIndex;
                next();
            } else res.status(404).send({ message: `User wasn't found, mister hacker...` });
        } else {
            const { email, adminRegisterForm, adminLoginForm } = req.body;
            
            const userIndex: number = users.findUserIndex(null, email);

            if (adminRegisterForm) { // admin registration attempt
                if (userIndex !== -1) { // email exists (shopper to admin registration)
                    req.encryptedPassword = users.users[userIndex].password;
                    req.userIndex = userIndex;
                    next();
                    return;
                } else { // admin doesn't exist
                    req.shopperToAdmin = false;
                    req.userIndex = userIndex;
                    req.role = 'admin';            
                    next();
                    return;
                }
            } else if (adminRegisterForm === false) { // shopper registration attempt
                if (userIndex === -1) { // shopper doesn't exist
                    req.shopperToAdmin = false;
                    req.userIndex = userIndex;
                    req.role = 'shopper';            
                    next();
                    return;
                }
            } else if (adminLoginForm !== undefined) { // login attempt
                if (userIndex === -1) res.status(404).send({ message: `User doesn't exist. Please register to the system.` });
                else {
                    req.userIndex = userIndex;
                    next();
                }
                return;
            }
            
            res.status(409).send({ message: `Email already registered. Please use a different one.` });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function encryptPassword(req, res, next) {
    try {
        const { password } = req.body;
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, (err, hash) => {
            try {
                if (err) throw new Error('Issues in the password encryption process!');
                req.body.password = hash;
                next();
      
            } catch (error) {
                console.error(error.message);
                res.status(500).send(error.message);    
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function validatePassword(req, res, next) {
    try {
        const { role } = req; // registration attempt of new shopper or admin that wasn't already a shopper
        if (role) {
            next();
            return;
        }

        const { password } = req.body;
        const users = new Users();
        const { userIndex } = req;
        let encryptedPassword: string;
        
        if (req.encryptedPassword) encryptedPassword = req.encryptedPassword; // registration attempt - existing shopper to admin
        else encryptedPassword = users.users[userIndex].password; // login attempt

        bcrypt.compare(password, encryptedPassword, (err, result) => {
            try {
                if (err) throw res.status(409).send({ message: 'The password you entered is incorrect.' });
                else if (result) {
                    if (req.encryptedPassword) {
                        const { username } = req.body;
                        const shopperToAdminText: string = (users.users[userIndex].stores === 0) ? '\n\nShopper trying to become an admin? Please verify you credentials.' : '';

                        if ((users.users[userIndex].stores.length === 0) && // if exist as shopper + entered registered username & password
                            (users.users[userIndex].username === username)) {
                            req.shopperToAdmin = true;
                            req.role = 'admin';
                            next();
                            return;
                        }
                        
                        res.status(409).send({ message: `Email already registered.${shopperToAdminText}` });
                        return;
                    }
                    req.shopperToAdmin = false;
                    req.role = (users.users[userIndex].stores.length === 0) ? 'shopper' : 'admin';
                    next();
                } else res.status(409).send({ message: 'The password you entered is incorrect.' });

            } catch (error) {
                console.error(error.message);
                res.status(500).send(error.message);    
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function isAdmin(req, res, next) {
    try {
        const users = new Users();
        const { userIndex } = req;

        req.isAdmin = (users.users[userIndex].stores.length > 0) ? true : false;
        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}


export function onlyShopper(req, res, next) {
    try {
        const { isAdmin } = req;

        if (!isAdmin) next();
        else res.status(403).send({ message:'This functionality is for shoppers only.' });
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function onlyAdmin(req, res, next) {
    try {
        const { isAdmin } = req;

        if (isAdmin) next();
        else res.status(403).send({message:'This functionality is for admins only.'});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}