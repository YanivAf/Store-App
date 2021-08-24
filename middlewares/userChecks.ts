export {};
const { Users } = require("../../models/dist/usersModel");

export function isLoggedIn(req, res, next) {
    try {
        const { currentUser } = req.cookies;

        if (currentUser) {
            req.currentUser = currentUser;
            next();
        } else res.status(401).send({message:'The session has expired. Please log in again.'});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function doesUserExist(req, res, next) {
    try {
        const { currentUser } = req;
        const { userUuid } = currentUser;
        const users = new Users();
        const userIndex: number = users.findUserIndex(userUuid, null);
        
        if (userIndex !== undefined) {
            req.userIndex = userIndex;
            next();
        } else throw new Error(`The user was not found.`);
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function isAdmin(req, res, next) {
    try {
        const users = new Users();
        const { userIndex } = req;
        let isAdmin: boolean;

        req.isAdmin = (users.users[userIndex].storeUuid !== null) ? true : false;
        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function onlyAdmin(req, res, next) {
    try {
        const { isAdmin } = req;

        if (isAdmin) next();
        else res.status(401).send({message:'You are not authorized to see this page.'});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}