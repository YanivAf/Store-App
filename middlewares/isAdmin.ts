export {};

export function isAdmin(req, res, next) {
    try {
        const { userRole } = req.cookies;

        if (userRole) {
            const { role } = userRole;
            if (role === 'admin') next();
            else res.status(401).send({message:'You are not authorized to see this page.'});
        } else {
            res.status(401).send({message:'The session has expired. Please log in again.'});
        }
         
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);    
    }

}