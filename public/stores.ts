async function stores() {
    try {
        const storesUser = await axios.get('/store/all');
        
        console.log('hi you');
        // on top - render `Welcome ${username}`
        // on main - render stores (only one for this task)

    } catch (error) {
        console.error(error.message);
    }
}

stores();

// TODO add onclick function to redirect to store with storeUuid in URL