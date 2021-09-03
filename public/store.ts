async function getStore() {
    try {
        const getStoreDetails = await axios.get('/store/:storeUuid');
        const { store, isAdmin } = getStoreDetails.data;
        
        renderStore(store, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

function renderStore(store: any, isAdmin: boolean) {
    try {
        const { storeName, products } = store;

        const storeNameElement: HTMLElement = document.querySelector('.main__item--store-name');
        storeNameElement.innerText = storeName;
        
        const pageTitle: HTMLElement = document.querySelector('title');
        pageTitle.innerText= storeName;
        
        renderStoreProducts(products, cartProductsToRender, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

function renderStoreProducts(products: Array<any>, cartProducts: Array<any>, isAdmin: boolean) {
    try {

        const productsElement: HTMLElement = document.querySelector('.products');
        let productsHtml: string;
        
        const AreThereProducts: boolean = (products.length > 0) ? true : false;
        productsHtml = (!AreThereProducts) ? 'no products to show!'
        :
        products.map((product) => {
            let buttonsByRole: string;
            let cartProductQuantity: number;
            if (isAdmin) buttonsByRole =`
            <i class="product-buttons__item product-buttons__item--delete fas fa-trash" id="delete-from-store" title="Delete ${product.productName}"></i>
            <i class="product-buttons__item product-buttons__item--edit fas fa-edit" id="edit-on-store" title="Edit ${product.productName}"></i>`;
            else {
                const cartProductIndex = cartProducts.findIndex(cartProduct => cartProduct.productUuid === product.productUuid);
                if (cartProductIndex === -1) buttonsByRole = `<i class="product-buttons__item product-buttons__item--cart-add fas fa-cart-plus" id="add-to-cart" title="Add ${product.productName} to cart"></i>`;
                else buttonsByRole = `<a href="./cart.html" class="product-buttons__item product-buttons__item--cart-added"><i class="fas fa-shopping-cart" title="See ${product.productName} in your cart"></i></a>`;
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

        productsElement.innerHTML = productsHtml;

    } catch (error) {
        console.error(error.message);
    }
}

getStore();