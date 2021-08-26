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

getUserDetails();