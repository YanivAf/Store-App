async function renderStores() {
    try {
        const getStoresDetails = await axios.get('/store/all');
        const { storeUuid, storeName } = getStoresDetails.data;

        const storesElement: HTMLElement = document.querySelector('.stores');
        const html: string = `
        <div class="stores__item store">
            <a href="./store.html?${storeUuid}">${storeName}</a>
        </div>`;
        storesElement.innerHTML = html;

    } catch (error) {
        console.error(error.message);
    }
}

renderStores();

// TODO add onclick function to redirect to store with storeUuid in URL. get storeUuid from element id