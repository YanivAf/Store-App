async function getProduct() {
    try {
        console.log('hi you');

    } catch (error) {
        console.error(error.message);
    }
}

async function renderProduct() {
    try {
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

getProduct();