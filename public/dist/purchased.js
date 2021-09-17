function renderPurchasedCarts(purchasedCarts) {
    try {
        var productsElement = document.querySelector('.products');
        var purchasedCartsHtml = void 0;
        var AreThereProducts = (purchasedCarts.length > 0) ? true : false;
        var totalPurchasedPrice_1 = 0;
        var totalQuantity_1 = 0;
        if (!AreThereProducts) {
            purchasedCartsHtml = "<p>You haven't purchased anything yet... <a href=\"./store.html?storeUuid=mall\">Click here</a> to do some shopping!</p>";
        }
        else {
            var headersHtml = "\n            <div class=\"products__item products__item--headers\">\n                <h4></h4>\n                <h4></h4>\n                <h4>Product Name</h4>\n                <h4></h4>\n                <h4>Total Price</h4>\n                <h4>Quantity</h4>\n            </div>";
            var productsHtml = purchasedCarts.map(function (purchasedCart) {
                totalPurchasedPrice_1 += purchasedCart.totalPrice;
                totalQuantity_1 += purchasedCart.quantity;
                var purchasedCartHtml = "\n                <div class=\"products__item product-row\" id=\"" + purchasedCart.productUuid + "\">\n                    <a href=\"./product.html?productUuid=" + purchasedCart.productUuid + "\" class=\"product-row__item product-row__item--name\">\n                        <h3>" + purchasedCart.productName + "</h3>\n                    </a>\n                    <h4 class=\"product-row__item product-row__item--total\">" + (Math.round(purchasedCart.totalPrice * 100) / 100).toFixed(2) + "$</h4>\n                    <div class=\"product-row__item product-row__item--quantity\">\n                        <p>" + purchasedCart.quantity + "<p/>\n                    </div>\n                </div>";
                return purchasedCartHtml;
            }).join('');
            var totalHtml = "\n            <div class=\"products__item product-row total\">\n                <h3>Total:</h3>\n                <h3 class=\"product-row__item product-row__item--total\">" + (Math.round(totalPurchasedPrice_1 * 100) / 100).toFixed(2) + "$</h3>\n                <div class=\"product-row__item product-row__item--quantity\">\n                    <h3>" + totalQuantity_1 + "</h3>\n                </div>\n            </div>";
            purchasedCartsHtml = headersHtml + productsHtml + totalHtml;
        }
        productsElement.innerHTML = purchasedCartsHtml;
    }
    catch (error) {
        console.error(error.message);
    }
}
renderPurchasedCarts(purchasedCartsToRender);
