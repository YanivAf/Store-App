function renderPurchasedProducts(purchased) {
    try {
        var productsElement = document.querySelector('.products');
        var purchasedProductsHtml = void 0;
        var AreThereProducts = (purchased.length > 0) ? true : false;
        var totalPurchasedPrice_1 = 0;
        var totalQuantity_1 = 0;
        if (!AreThereProducts) {
            purchasedProductsHtml = "<p>You haven't purchased anything yet... <a href=\"./store.html?storeUuid=mall\">Click here</a> to do some shopping!</p>";
        }
        else {
            var headersHtml = "\n            <div class=\"products__item products__item--headers\">\n                <h4></h4>\n                <h4></h4>\n                <h4>Product Name</h4>\n                <h4></h4>\n                <h4>Total Price</h4>\n                <h4>Quantity</h4>\n            </div>";
            var productsHtml = purchased.map(function (purchasedProduct) {
                totalPurchasedPrice_1 += purchasedProduct.totalPrice;
                totalQuantity_1 += purchasedProduct.quantity;
                var purchasedProductHtml = "\n                <div class=\"products__item product-row\" id=\"" + purchasedProduct.productUuid + "\">\n                    <a href=\"./product.html?productUuid=" + purchasedProduct.productUuid + "\" class=\"product-row__item product-row__item--name\">\n                        <h3>" + purchasedProduct.productName + "</h3>\n                    </a>\n                    <h4 class=\"product-row__item product-row__item--total\">" + (Math.round(purchasedProduct.totalPrice * 100) / 100).toFixed(2) + "$</h4>\n                    <div class=\"product-row__item product-row__item--quantity\">\n                        <p>" + purchasedProduct.quantity + "<p/>\n                    </div>\n                </div>";
                return purchasedProductHtml;
            }).join('');
            var totalHtml = "\n            <div class=\"products__item product-row total\">\n                <h3>Total:</h3>\n                <h3 class=\"product-row__item product-row__item--total\">" + (Math.round(totalPurchasedPrice_1 * 100) / 100).toFixed(2) + "$</h3>\n                <div class=\"product-row__item product-row__item--quantity\">\n                    <h3>" + totalQuantity_1 + "</h3>\n                </div>\n            </div>";
            purchasedProductsHtml = headersHtml + productsHtml + totalHtml;
        }
        productsElement.innerHTML = purchasedProductsHtml;
    }
    catch (error) {
        console.error(error.message);
    }
}
renderPurchasedProducts(purchasedProductsToRender);
