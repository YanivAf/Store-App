async function renderStoreDetails() {
    try {

        const getStoreDetails = await axios.get('/store/:storeUuid');
        const { store, isAdmin } = getStoreDetails.data;
        console.log(getStoreDetails);
        const { storeName, products } = store;

        const storeNameElement: HTMLElement = document.querySelector('#store-name');
        storeNameElement.innerText = storeName;
        
        const productsElement: HTMLElement = document.querySelector('.products');
        let html: string;
        
            // on main - render products with edit+delete buttons
            const AreThereProducts: boolean = (store.products.length > 0) ? true : false;
            html = (!AreThereProducts) ? 'no products to show!' :
            store.products.map((product) => {
                let buttonsByRole: string = (isAdmin) ?
                `<i class="product-buttons__item product-buttons__item--delete fas fa-trash" title="Delete ${product.productName}"></i>
                <i class="product-buttons__item product-buttons__item--edit fas fa-edit" title="Edit ${product.productName}"></i>`
                :
                `<div class="product-buttons__item product-buttons__item--cart-reduce" title="Reduce quantity">-</div>
                <div class="product-buttons__item product-buttons__item--cart-total" title="Reduce quantity">CartQuantity</div>
                <div class="product-buttons__item product-buttons__item--cart-add" title="Add quantity">+</div>`;
                let inStockText: string;
                let inStockColor: string
                if (product.inStock > 0) {
                    inStockText = `${product.inStock} left`;
                    inStockColor = (product.inStock > 5) ? 'green' : 'orange';
                } else {
                    inStockText = 'Out of Stock';
                    inStockColor = 'red';
                }
                return `<div class="products__item product" id="${product.productUuid}">
                    <h3 class="product__item product__item--name">${product.productName}</h3>
                    <img class="product__item product__item--img" src="${product.productImage}" title="${product.productName}"/>
                    <p class="product__item product__item--description">${product.productDescription}</p>
                    <div class="product__item product__item--price">${(Math.round(product.productPrice * 100) / 100).toFixed(2)}$</div>
                    <div class="product__item product__item--stock" style="color:${inStockColor}">${inStockText}</div>
                    <div class="product__item product-buttons">${buttonsByRole}</div>
                    
                </div>`
            }).join('');

        productsElement.innerHTML = html;

    } catch (error) {
        console.error(error.message);
    }
}