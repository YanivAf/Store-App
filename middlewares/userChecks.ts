export {};

const { secret } = require('../../secret/dist/secret');
const jwt = require('jsonwebtoken');
const { Users } = require("../../models/dist/usersModel");

export function isLoggedInAndVerified(req, res, next) {
    try {
        const { currentUser } = req.cookies;
        
        if (currentUser) {
            jwt.verify(currentUser, secret, (err, decoded) => {
                if (err) {
                    res.status(401).send({message:'You are not authorized to see this page.'});
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
        const { currentUser } = req;
        const { userUuid } = currentUser;
        
        const users = new Users();
        const userIndex: number = users.findUserIndex(userUuid, null);
        if (userIndex !== undefined) {
            req.userUuid = userUuid;
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
        else res.status(403).send({message:'This functionality is for shoppers only.'});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}

export function onlyAdmin(req, res, next) {
    try {
        const { isAdmin } = req;

        if (isAdmin) next();
        else res.status(403).send({message:'You are not authorized to see this page.'});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }
}