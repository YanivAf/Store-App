function renderPurchasedProducts(purchased: Array<any>) {
    try {

        const productsElement: HTMLElement = document.querySelector('.products');

        let purchasedProductsHtml: string;
        const AreThereProducts: boolean = (purchased.length > 0) ? true : false;

        let totalPurchasedPrice: number = 0;
        let totalQuantity: number = 0;
        if (!AreThereProducts) {
            purchasedProductsHtml = `<p>You haven't purchased anything yet... <a href="./store.html?storeUuid=mall">Click here</a> to do some shopping!</p>`;
        } else {
            const headersHtml: string = `
            <div class="products__item products__item--headers">
                <h4></h4>
                <h4></h4>
                <h4>Product Name</h4>
                <h4></h4>
                <h4>Total Price</h4>
                <h4>Quantity</h4>
            </div>`;

            const productsHtml: string = purchased.map((purchasedProduct) => {
                totalPurchasedPrice += purchasedProduct.totalPrice;
                totalQuantity += purchasedProduct.quantity;

                const purchasedProductHtml: string = `
                <div class="products__item product-row" id="${purchasedProduct.productUuid}">
                    <a href="./product.html?productUuid=${purchasedProduct.productUuid}" class="product-row__item product-row__item--name">
                        <h3>${purchasedProduct.productName}</h3>
                    </a>
                    <h4 class="product-row__item product-row__item--total">${(Math.round(purchasedProduct.totalPrice * 100) / 100).toFixed(2)}$</h4>
                    <div class="product-row__item product-row__item--quantity">
                        <p>${purchasedProduct.quantity}<p/>
                    </div>
                </div>`;
                return purchasedProductHtml;
            }).join('');
            
            const totalHtml: string = `
            <div class="products__item product-row total">
                <h3>Total:</h3>
                <h3 class="product-row__item product-row__item--total">${(Math.round(totalPurchasedPrice * 100) / 100).toFixed(2)}$</h3>
                <div class="product-row__item product-row__item--quantity">
                    <h3>${totalQuantity}</h3>
                </div>
            </div>`;

            purchasedProductsHtml = headersHtml + productsHtml + totalHtml;
        }

        productsElement.innerHTML = purchasedProductsHtml;

    } catch (error) {
        console.error(error.message);
    }
}

renderPurchasedProducts(purchasedProductsToRender);