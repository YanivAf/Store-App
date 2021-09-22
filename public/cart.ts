async function getStoresProducts() {
    try {
        const getStoreDetails = await axios.get(`/store/mall`);
        const { stores, shippingAddress } = getStoreDetails.data;
        let storeProducts = [];
        stores.stores.forEach(store => {storeProducts = storeProducts.concat(store.products)});
        
        renderCartPageProducts(storeProducts, cartProductsToRender, savedProducts, shippingAddress);

    } catch (error) {
        console.error(error.message);
    }
}

function renderCartPageProducts(storeProducts: Array<any>, cartProducts: Array<any>, savedProducts: Array<any>, shippingAddress: string) {
    try {
        let productsHtml: string;
        let headersAndProductsHtml: string;

        const cartsElement: HTMLElement = document.querySelector('.carts');
        const payBtn: HTMLButtonElement = document.querySelector('#pay');
        const AreThereCartProducts: boolean = (cartProducts.length > 0) ? true : false;

        let totalCartPrice: number = 0;
        let totalQuantity: number = 0;

        if (!AreThereCartProducts) {
            productsHtml = '<p>Your cart is empty... <a href="./store.html?storeUuid=mall">Click here</a> to do some shopping!</p>';
            payBtn.classList.add('hide');
        } else {
            headersAndProductsHtml = headersAndProducts(cartProducts, storeProducts, true);
            
            const totalHtml: string = `
            <div class="carts__item carts__item--footers">
                <h3>Total:</h3>
                <h3></h3>
                <h3></h3>
                <h3></h3>
                <h3>${(Math.round(totalCartPrice * 100) / 100).toFixed(2)}$</h3>
                <h3>${totalQuantity}</h3>
            </div>`;
            const shippingHtml: string = `
            <div class="carts__item carts__item--footers">
                <h3>Shipping Address:</h3>
                <h4>${shippingAddress}</h4>
            </div>`;

            productsHtml = headersAndProductsHtml + totalHtml + shippingHtml;
            payBtn.classList.remove('hide');
            if (totalQuantity === 0) payBtn.disabled = true;
            else payBtn.disabled = false;
        }

        cartsElement.innerHTML = productsHtml;

        const savedElement: HTMLElement = document.querySelector('.saved');
        const AreThereSavedProducts: boolean = (savedProducts.length > 0) ? true : false;

        if (!AreThereSavedProducts) {
            productsHtml = 'You have no saved products';
        } else {
            headersAndProductsHtml = headersAndProducts(savedProducts, storeProducts, false);

            productsHtml = headersAndProductsHtml;
        }

        savedElement.innerHTML = productsHtml;

        function headersAndProducts(products: Array<any>, storeProducts: Array<any>, isCartProducts: boolean) {
            try {
                const cartClass: string = (isCartProducts) ? 'carts' : 'saved';
                const priceTitle: string = (isCartProducts) ? 'Total' : 'Product'
                const headersHtml: string = `
                <div class="${cartClass}__item ${cartClass}__item--headers">
                    <h4>Actions</h4>
                    <h4>Product Image</h4>
                    <h4>Product Name</h4>
                    <h4>Stock Status</h4>
                    <h4>${priceTitle} Price</h4>
                    <h4>Quantity</h4>
                </div>`;

                const productsHtml: string = products.map((product) => {
                    const productId = (isCartProducts) ? product.productUuid : product;
                    const storeProductIndex: number = storeProducts.findIndex(storeProduct => storeProduct.productUuid === productId);

                    let inStockText: string;
                    let inStockColor: string;
                    const isInStock: boolean = (storeProducts[storeProductIndex].inStock > 0) ? true : false;

                    if (isInStock) {
                        inStockText = (storeProducts[storeProductIndex].inStock > 5) ? `In Stock` : `Running Out!`;
                        inStockColor = (storeProducts[storeProductIndex].inStock > 5) ? 'green' : 'orange';
                    } else {
                        inStockText = 'Out of Stock';
                        inStockColor = 'red';
                    }    
                    totalCartPrice += product.totalPrice;
                    totalQuantity += product.quantity;
                    
                    const actionsHtml: string = (isCartProducts) ?
                    `<i class="fas fa-trash remove-from-cart" title="Remove ${storeProducts[storeProductIndex].productName} from cart"></i>
                    <i class="fas fa-save save-for-later" title="Save ${storeProducts[storeProductIndex].productName} for later"></i>`
                    :
                    `<i class="fas fa-trash remove-from-saved" title="Unsave ${storeProducts[storeProductIndex].productName}"></i>
                    <i class="fas fa-cart-plus add-to-cart" title="Add ${storeProducts[storeProductIndex].productName} to cart"></i>`;
                    const minCartQuantity: string = (isCartProducts) ? '1' : '0'
                    const priceHtml: string = (isCartProducts) ?
                    (Math.round(product.totalPrice * 100) / 100).toFixed(2)
                    :
                    (Math.round((storeProducts[storeProductIndex].productPrice - storeProducts[storeProductIndex].productPrice * (storeProducts[storeProductIndex].precentsOff / 100)) * 100) / 100).toFixed(2);
                    const quantityHtml: string = (isCartProducts) ?
                    `<input type="number" class="update-cart-qunatity" min="${minCartQuantity}" max="${storeProducts[storeProductIndex].inStock}" value="${product.quantity}" />`
                    :
                    '0';

                    const productHtml: string = `
                    <div class="${cartClass}__item product-row" id="${storeProducts[storeProductIndex].productUuid}">
                        <div class="product-row__item product-row__item--actions">
                            ${actionsHtml}
                        </div>
                        <a href="./product.html?storeUuid=${storeProducts[storeProductIndex].storeUuid}&productUuid=${storeProducts[storeProductIndex].productUuid}" class="product-row__item product-row__item--img">
                            <img src="${storeProducts[storeProductIndex].productImage}" title="${storeProducts[storeProductIndex].productName}"/>
                        </a>
                        <a href="./product.html?storeUuid=${storeProducts[storeProductIndex].storeUuid}&productUuid=${storeProducts[storeProductIndex].productUuid}" class="product-row__item product-row__item--name">
                            <h3>${storeProducts[storeProductIndex].productName}</h3>
                        </a>
                        <div class="product-row__item product-row__item--stock" style="color:${inStockColor}">${inStockText}</div>
                        <h4 class="product-row__item product-row__item--price">${priceHtml}$</h4>
                        <div class="product-row__item product-row__item--quantity">
                            ${quantityHtml}
                        </div>
                    </div>`;
                    return productHtml;
                }).join('');

                return headersHtml + productsHtml;

            } catch (error) {
                console.error(error.message);
            }
        }

    } catch (error) {
        console.error(error.message);
    }
}

getStoresProducts();