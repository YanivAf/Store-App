async function getStore() {
    try {
        const getStoreDetails = await axios.get('/store/mall');
        const { store } = getStoreDetails.data;
        const { products } = store;

        renderCartProducts(products, cartProductsToRender);

    } catch (error) {
        console.error(error.message);
    }
}

function renderCartProducts(products: Array<any>, cartProducts: Array<any>) {
    try {

        const productsElement: HTMLElement = document.querySelector('.products');
        let cartProductsHtml: string;
        const AreThereProducts: boolean = (cartProducts.length > 0) ? true : false;
        cartProductsHtml = (!AreThereProducts) ? '<p>Your cart is empty... <a href="./store.html?storeUuid=mall">Click here</a> to do some shopping!</p>'
        :
        `<div class="products__item products__item--headers">
            <h4>Remove</h4>
            <h4>Product Image</h4>
            <h4>Product Name</h4>
            <h4>Left in Stock</h4>
            <h4>Total Price</h4>
            <h4>Quantity</h4>
        </div>` +
        cartProducts.map((cartProduct) => { 
            const productIndex = products.findIndex(product => product.productUuid === cartProduct.productUuid);           
            const inStockText = `${products[productIndex].inStock} left`;
            const inStockColor = (products[productIndex].inStock > 5) ? 'green' : 'orange';
            
            const cartProductHtml: string = `
            <div class="products__item product-row" id="${cartProduct.productUuid}">
                <div class="product-row__item product-row__item--remove">
                    <i class="fas fa-trash remove-from-cart" title="Remove ${cartProduct.productName} from cart"></i>
                </div>
                <a href="./product.html?productUuid=${cartProduct.productUuid}" class="product-row__item product-row__item--img">
                    <img src="${products[productIndex].productImage}" title="${cartProduct.productName}"/>
                </a>
                <a href="./product.html?productUuid=${cartProduct.productUuid}" class="product-row__item product-row__item--name">
                    <h3>${cartProduct.productName}</h3>
                </a>
                <div class="product-row__item product-row__item--stock" style="color:${inStockColor}">${inStockText}</div>
                <h4 class="product-row__item product-row__item--total">${(Math.round(cartProduct.totalPrice * 100) / 100).toFixed(2)}$</h4>
                <div class="product-row__item product-row__item--quantity">
                    <input type="number" class="update-cart-qunatity" min="0" max="${cartProduct.quantity + products[productIndex].inStock}" value="${cartProduct.quantity}" />
                </div>
            </div>`;
            return cartProductHtml;
        }).join('');

        productsElement.innerHTML = cartProductsHtml;

    } catch (error) {
        console.error(error.message);
    }
}

getStore();

// <i class="product-buttons__item product-buttons__item--delete fas fa-trash" id="delete-from-store" title="Delete ${product.productName}"></i>
// <i class="product-buttons__item product-buttons__item--edit fas fa-edit" id="edit-on-store" title="Edit ${product.productName}"></i>