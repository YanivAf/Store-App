export {};
const { Users } = require("../../models/dist/usersModel");

export function isAdmin(req, res, next) {
    try {
        const { currentUser } = req.cookies;

        if (currentUser) {
            const { userUuid } = currentUser;
            const users = new Users();
            const userIndex: number = users.findUserIndex(userUuid, null);
            
            if (!userIndex) throw new Error(`The user was not found.`);
            else if (users.users[userIndex].storeUuid !== null) next();
            else res.status(401).send({message:'You are not authorized to see this page.'});
        } else {
            res.status(401).send({message:'The session has expired. Please log in again.'});
        }
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);    
    }

}