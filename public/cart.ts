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
        const payBtn: HTMLButtonElement = document.querySelector('#pay');

        let cartProductsHtml: string;
        const AreThereProducts: boolean = (cartProducts.length > 0) ? true : false;

        let totalCartPrice: number = 0;
        let totalQuantity: number = 0;
        if (!AreThereProducts) {
            cartProductsHtml = '<p>Your cart is empty... <a href="./store.html?storeUuid=mall">Click here</a> to do some shopping!</p>';
            payBtn.classList.add('hide');
        } else {
            const headersHtml: string = `
            <div class="products__item products__item--headers">
                <h4>Remove</h4>
                <h4>Product Image</h4>
                <h4>Product Name</h4>
                <h4>Left in Stock</h4>
                <h4>Total Price</h4>
                <h4>Quantity</h4>
            </div>`;

            const productsHtml: string = cartProducts.map((cartProduct) => { 
                const productIndex = products.findIndex(product => product.productUuid === cartProduct.productUuid);           
                const inStockText = `${products[productIndex].inStock} left`;
                const inStockColor = (products[productIndex].inStock > 5) ? 'green' : 'orange';
                totalCartPrice += cartProduct.totalPrice;
                totalQuantity += cartProduct.quantity;

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
            
            const totalHtml: string = `
            <div class="products__item product-row total">
                <h3>Total:</h3>
                <h3 class="product-row__item product-row__item--total">${(Math.round(totalCartPrice * 100) / 100).toFixed(2)}$</h3>
                <div class="product-row__item product-row__item--quantity">
                    <h3>${totalQuantity}</h3>
                </div>
            </div>`;

            cartProductsHtml = headersHtml + productsHtml + totalHtml;
            payBtn.classList.remove('hide');
        }

        productsElement.innerHTML = cartProductsHtml;

    } catch (error) {
        console.error(error.message);
    }
}

getStore();