async function store() {
    try {
        const storeUser = await axios.get('/store/:storeUuid');
        console.log('hi you');
        // on top - render `Welcome ${username}` + storeName
        // SHOPPER
        // on top - render cart logo        
        // on main - render products W/O edit+delete button
        // ADMIN
        // on top - render also add product button 
        // on main - render products with edit+delete button

    } catch (error) {
        console.error(error.message);
    }
}

store();