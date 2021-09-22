async function getStorePurchasedCarts() {
    try {
        const getStoreDetails = await axios.get(`/store/${storeUuid}`);
        const { store } = getStoreDetails.data;
        const storePurchasedCarts: Array<any> = store.purchasedCarts;
        renderPurchasedCarts(storePurchasedCarts);

    } catch (error) {
        console.error(error.message);
    }
}

function renderPurchasedCarts(purchasedCarts: Array<any>) {
    try {
        const cartsElement: HTMLElement = document.querySelector('.carts');

        let purchasedCartsHtml: string;
        let totalPurchasedPrice: number = 0;
        let totalRefunded: number = 0;

        const AreThereProducts: boolean = (purchasedCarts.length > 0) ? true : false;

        if (!AreThereProducts) {
            purchasedCartsHtml = (isAdmin) ? `<p>There aren't any purchases yet... <a href="./store.html?storeUuid=${storeUuid}">Click here</a> to improve your store!</p>` : `<p>You haven't purchased anything yet... <a href="./store.html?storeUuid=mall">Click here</a> to do some shopping!</p>`;
        } else {
            const headersHtml: string = `
            <div class="cart__item cart__item--headers">
                <h4>Status</h4>
                <h4>Status Update</h4>
                <h4>Product Name</h4>
                <h4></h4>
                <h4>Total Price</h4>
                <h4>Quantity</h4>
            </div>`;

            purchasedCartsHtml = purchasedCarts.map((purchasedCart) => {
                let subTotalPurchasedPrice: number = 0;
                let subTotalQuantity: number = 0;
                let statusDisabledState: string = ""
                let statusHtml: string;
                let statusSelectedState: any = {
                    awaitingShipment: "",
                    shipped: "",
                    arrivedDestination: "",
                    activeExamination: ""
                };
                const purchasedCartProductsHtml: string = purchasedCart.purchasedCartProducts.map((purchasedCartProduct) => {
                    subTotalPurchasedPrice += purchasedCartProduct.totalPrice;
                    subTotalQuantity += purchasedCartProduct.quantity;
                    totalPurchasedPrice += purchasedCartProduct.totalPrice;

                    if (isAdmin) {
                        switch (purchasedCartProduct.status) {
                            case 'Awaiting Shipment':
                                statusSelectedState.awaitingShipment = " selected";
                                break;
                            case 'Shipped':
                                statusSelectedState.shipped = " selected";
                                break;
                            case 'Arrived Destination':
                                statusSelectedState.arrivedDestination = " selected";
                                break;
                            case 'Active Examination':
                                statusSelectedState.activeExamination = " selected";
                                break;
                            case 'Refunded - Left Stock':
                                statusSelectedState.refundLeftStock = " selected";
                                statusDisabledState = " disabled";
                                totalRefunded += purchasedCartProduct.totalPrice;
                                break;
                            case 'Refunded - Stayed In Stock':
                                statusSelectedState.refundStayedInStock = " selected";
                                statusDisabledState = " disabled";
                                totalRefunded += purchasedCartProduct.totalPrice;
                                totalPurchasedPrice -= purchasedCartProduct.totalPrice;
                                break;
                        }
                        statusHtml = `
                        <select class="update-delivery-status"${statusDisabledState}>
                            <option value="Awaiting Shipment"${statusSelectedState.awaitingShipment}>Awaiting Shipment</option>
                            <option value="Shipped"${statusSelectedState.shipped}>Shipped</option>
                            <option value="Arrived Destination"${statusSelectedState.arrivedDestination}>Arrived Destination</option>
                            <option value="Active Examination"${statusSelectedState.activeExamination} title="Internal handling in progress to expidate product arrival">Active Examination</option>
                            <option value="Refunded - Left Stock"${statusSelectedState.refundLeftStock}>Refunded - Left Stock</option>
                            <option value="Refunded - Stayed In Stock"${statusSelectedState.refundStayedInStock}>Refunded - Stayed In Stock</option>
                        </select>`;
                    } else {
                        statusHtml = `${purchasedCartProduct.status}`;
                    }
                
                    const purchasedCartProductHtml: string = `
                    <div class="cart__item product-row" id="${purchasedCartProduct.productUuid}">
                        <div class="product-row__item product-row__item--status">
                            ${statusHtml}
                        </div>
                        <div class="product-row__item product-row__item--status-update">
                            ${purchasedCartProduct.statusUpdatedAt}
                        </div>
                        <a href="./product.html?storeUuid=${purchasedCartProduct.storeUuid}&productUuid=${purchasedCartProduct.productUuid}" class="product-row__item product-row__item--name">
                            <h3>${purchasedCartProduct.productName}</h3>
                        </a>
                        <h4 class="product-row__item product-row__item--price">${(Math.round(purchasedCartProduct.totalPrice * 100) / 100).toFixed(2)}$</h4>
                        <div class="product-row__item product-row__item--quantity">
                            <p>${purchasedCartProduct.quantity}<p/>
                        </div>
                    </div>`;
                    return purchasedCartProductHtml;
                }).join('');
            
                const totalHtml: string = `
                <div class="cart__item cart__item--footers">
                    <h3>Total:</h3>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                    <h3>${(Math.round(subTotalPurchasedPrice * 100) / 100).toFixed(2)}$</h3>
                    <h3>${subTotalQuantity}</h3>
                </div>`;
                const shippingHtml: string = `
                <div class="cart__item cart__item--footers">
                    <h3>Shipping Address:</h3>
                    <h4>${purchasedCart.shippingAddress}</h4>
                </div>`;
                const purchaseDateHtml: string = `
                <div class="cart__item cart__item--footers">
                    <h3>Purchase Date:</h3>
                    <h4>${purchasedCart.purchasedAt}</h4>
                </div>`;

                const purchasedCartHtml = (!purchasedCartProductsHtml) ? '' : `
                <div class="cart" id = "${purchasedCart.purchasedCartUuid}">
                    ${headersHtml + purchasedCartProductsHtml + totalHtml + shippingHtml + purchaseDateHtml}
                </div>`;
                return purchasedCartHtml;
            }).join('');
        }

        cartsElement.innerHTML = purchasedCartsHtml;

    } catch (error) {
        console.error(error.message);
    }
}

if (isAdmin) getStorePurchasedCarts();
else renderPurchasedCarts(shopperPurchasedCartsToRender);