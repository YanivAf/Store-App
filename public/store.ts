async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        const { username, cart, purchased } = userDetails;
        // on top - render `Welcome ${username}` + storeName
        
        if (!cart) { // ADMIN
            // on top - render add product button 
            renderStoreDetails(true);
        } else { // SHOPPER
            // on top - render cart logo
            renderStoreDetails(false);
        }
        
    } catch (error) {
        console.error(error.message);
    }
}

async function renderStoreDetails(isAdmin) {
    try {
        const getStoreDetails = await axios.get('/store');
        console.log('renderStoreDetails');
        const { store } = getStoreDetails;
        const { storeName, products } = store;
        
        // on main - render storeName
        
        if (isAdmin) {
            // on main - render products with edit+delete buttons
        } else {
            // on main - render products with cart buttons ("+" + "-")    
        }

    } catch (error) {
        console.error(error.message);
    }
}

getUserDetails();
