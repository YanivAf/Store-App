async function renderStore() {
    try {

        const getStoreDetails = await axios.get('/store/:storeUuid');
        const { store, isAdmin } = getStoreDetails.data;

        let cartProducts;
        if (!isAdmin) {
            const getCartProducts = await axios.get('/user/cart');
            cartProducts = getCartProducts.data.cartProducts;
        }
        
        const { storeName, products } = store;

        const storeNameElement: HTMLElement = document.querySelector('.main__item--store-name');
        const pageTitle: HTMLElement = document.querySelector('title');
        storeNameElement.innerText = storeName;
        pageTitle.innerText= storeName;
        
        const productsElement: HTMLElement = document.querySelector('.products');
        let html: string;
        
            // on main - render products with edit+delete buttons
            const AreThereProducts: boolean = (products.length > 0) ? true : false;
            html = (!AreThereProducts) ? 'no products to show!' :
            products.map((product) => {
                let buttonsByRole: string;
                if (isAdmin) {
                    buttonsByRole =
                    `<i class="product-buttons__item product-buttons__item--delete fas fa-trash" title="Delete ${product.productName}"></i>
                    <i class="product-buttons__item product-buttons__item--edit fas fa-edit" title="Edit ${product.productName}"></i>`
                } else {
                    const cartProduct = cartProducts.find(cartProduct => cartProduct.productUuid === product.productUuid);
                    const cartProductQuantity: number = (cartProduct) ? cartProduct.quantity : 0;
                    const reduceDisabled: string = (cartProductQuantity === 0) ? 'disabled' : '';
                    const quantityZero: string = (cartProductQuantity === 0) ? ' style="background-color: gray;"' : '';
                    buttonsByRole =
                    `<button ${reduceDisabled} class="product-buttons__item product-buttons__item--cart-reduce" title="Reduce quantity">-</button>
                    <div class="product-buttons__item product-buttons__item--cart-quantity"${quantityZero} title="${product.productName} quantity">${cartProductQuantity}</div>
                    <button class="product-buttons__item product-buttons__item--cart-add" title="Add quantity">+</button>`;
                }
                let inStockText: string;
                let inStockColor: string;
                const isInStock: boolean = (product.inStock > 0) ? true : false;
                if (product.inStock > 0) {
                    inStockText = `${product.inStock} left`;
                    inStockColor = (product.inStock > 5) ? 'green' : 'orange';
                } else {
                    inStockText = 'Out of Stock';
                    inStockColor = 'red';
                }
                const productHtml: string = ((!isAdmin) && (!isInStock)) ? ''
                :
                `<div class="products__item product" id="${product.productUuid}">
                    <h3 class="product__item product__item--name">${product.productName}</h3>
                    <a href="./product.html?productUuid=${product.productUuid}" class="product__item product__item--img">
                        <img src="${product.productImage}" title="${product.productName}"/>
                    </a>
                    <a href="./product.html?productUuid=${product.productUuid}" title="${product.productDescription}" class="product__item product__item--description">${product.productDescription}</a>
                    <h4 class="product__item product__item--price">${(Math.round(product.productPrice * 100) / 100).toFixed(2)}$</h4>
                    <div class="product__item product__item--stock" style="color:${inStockColor}">${inStockText}</div>
                    <div class="product__item product-buttons">${buttonsByRole}</div>
                    
                </div>`;
                return productHtml;
            }).join('');

        productsElement.innerHTML = html;

    } catch (error) {
        console.error(error.message);
    }
}

renderStore();