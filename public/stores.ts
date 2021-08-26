async function showStores() {
    try {
        const getStoresDetails = await axios.get('/store/all');
        
        console.log('hi you');
        // on main - render stores (only one for this task)

    } catch (error) {
        console.error(error.message);
    }
}

showStores();

// TODO add onclick function to redirect to store with storeUuid in URL. get storeUuid from element id