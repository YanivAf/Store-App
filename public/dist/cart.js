var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getStoresProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var getStoreDetails, _a, stores, shippingAddress, storeProducts_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/store/mall")];
                case 1:
                    getStoreDetails = _b.sent();
                    _a = getStoreDetails.data, stores = _a.stores, shippingAddress = _a.shippingAddress;
                    storeProducts_1 = [];
                    stores.stores.forEach(function (store) { storeProducts_1 = storeProducts_1.concat(store.products); });
                    renderCartPageProducts(storeProducts_1, cartProductsToRender, savedProducts, shippingAddress);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderCartPageProducts(storeProducts, cartProducts, savedProducts, shippingAddress) {
    try {
        var productsHtml = void 0;
        var headersAndProductsHtml = void 0;
        var cartsElement = document.querySelector('.carts');
        var payBtn = document.querySelector('#pay');
        var AreThereCartProducts = (cartProducts.length > 0) ? true : false;
        var totalCartPrice_1 = 0;
        var totalQuantity_1 = 0;
        if (!AreThereCartProducts) {
            productsHtml = '<p>Your cart is empty... <a href="./store.html?storeUuid=mall">Click here</a> to do some shopping!</p>';
            payBtn.classList.add('hide');
        }
        else {
            headersAndProductsHtml = headersAndProducts(cartProducts, storeProducts, true);
            var totalHtml = "\n            <div class=\"carts__item carts__item--footers\">\n                <h3>Total:</h3>\n                <h3></h3>\n                <h3></h3>\n                <h3></h3>\n                <h3>" + (Math.round(totalCartPrice_1 * 100) / 100).toFixed(2) + "$</h3>\n                <h3>" + totalQuantity_1 + "</h3>\n            </div>";
            var shippingHtml = "\n            <div class=\"carts__item carts__item--footers\">\n                <h3>Shipping Address:</h3>\n                <h4>" + shippingAddress + "</h4>\n            </div>";
            productsHtml = headersAndProductsHtml + totalHtml + shippingHtml;
            payBtn.classList.remove('hide');
            if (totalQuantity_1 === 0)
                payBtn.disabled = true;
            else
                payBtn.disabled = false;
        }
        cartsElement.innerHTML = productsHtml;
        var savedElement = document.querySelector('.saved');
        var AreThereSavedProducts = (savedProducts.length > 0) ? true : false;
        if (!AreThereSavedProducts) {
            productsHtml = 'You have no saved products';
        }
        else {
            headersAndProductsHtml = headersAndProducts(savedProducts, storeProducts, false);
            productsHtml = headersAndProductsHtml;
        }
        savedElement.innerHTML = productsHtml;
        function headersAndProducts(products, storeProducts, isCartProducts) {
            try {
                var cartClass_1 = (isCartProducts) ? 'carts' : 'saved';
                var priceTitle = (isCartProducts) ? 'Total' : 'Product';
                var headersHtml = "\n                <div class=\"" + cartClass_1 + "__item " + cartClass_1 + "__item--headers\">\n                    <h4>Actions</h4>\n                    <h4>Product Image</h4>\n                    <h4>Product Name</h4>\n                    <h4>Stock Status</h4>\n                    <h4>" + priceTitle + " Price</h4>\n                    <h4>Quantity</h4>\n                </div>";
                var productsHtml_1 = products.map(function (product) {
                    var productId = (isCartProducts) ? product.productUuid : product;
                    var storeProductIndex = storeProducts.findIndex(function (storeProduct) { return storeProduct.productUuid === productId; });
                    var inStockText;
                    var inStockColor;
                    var isInStock = (storeProducts[storeProductIndex].inStock > 0) ? true : false;
                    if (isInStock) {
                        inStockText = (storeProducts[storeProductIndex].inStock > 5) ? "In Stock" : "Running Out!";
                        inStockColor = (storeProducts[storeProductIndex].inStock > 5) ? 'green' : 'orange';
                    }
                    else {
                        inStockText = 'Out of Stock';
                        inStockColor = 'red';
                    }
                    totalCartPrice_1 += product.totalPrice;
                    totalQuantity_1 += product.quantity;
                    var actionsHtml = (isCartProducts) ?
                        "<i class=\"fas fa-trash remove-from-cart\" title=\"Remove " + storeProducts[storeProductIndex].productName + " from cart\"></i>\n                    <i class=\"fas fa-save save-for-later\" title=\"Save " + storeProducts[storeProductIndex].productName + " for later\"></i>"
                        :
                            "<i class=\"fas fa-trash remove-from-saved\" title=\"Unsave " + storeProducts[storeProductIndex].productName + "\"></i>\n                    <i class=\"fas fa-cart-plus add-to-cart\" title=\"Add " + storeProducts[storeProductIndex].productName + " to cart\"></i>";
                    var minCartQuantity = (isCartProducts) ? '1' : '0';
                    var priceHtml = (isCartProducts) ?
                        (Math.round(product.totalPrice * 100) / 100).toFixed(2)
                        :
                            (Math.round((storeProducts[storeProductIndex].productPrice - storeProducts[storeProductIndex].productPrice * (storeProducts[storeProductIndex].precentsOff / 100)) * 100) / 100).toFixed(2);
                    var quantityHtml = (isCartProducts) ?
                        "<input type=\"number\" class=\"update-cart-qunatity\" min=\"" + minCartQuantity + "\" max=\"" + storeProducts[storeProductIndex].inStock + "\" value=\"" + product.quantity + "\" />"
                        :
                            '0';
                    var productHtml = "\n                    <div class=\"" + cartClass_1 + "__item product-row\" id=\"" + storeProducts[storeProductIndex].productUuid + "\">\n                        <div class=\"product-row__item product-row__item--actions\">\n                            " + actionsHtml + "\n                        </div>\n                        <a href=\"./product.html?storeUuid=" + storeProducts[storeProductIndex].storeUuid + "&productUuid=" + storeProducts[storeProductIndex].productUuid + "\" class=\"product-row__item product-row__item--img\">\n                            <img src=\"" + storeProducts[storeProductIndex].productImage + "\" title=\"" + storeProducts[storeProductIndex].productName + "\"/>\n                        </a>\n                        <a href=\"./product.html?storeUuid=" + storeProducts[storeProductIndex].storeUuid + "&productUuid=" + storeProducts[storeProductIndex].productUuid + "\" class=\"product-row__item product-row__item--name\">\n                            <h3>" + storeProducts[storeProductIndex].productName + "</h3>\n                        </a>\n                        <div class=\"product-row__item product-row__item--stock\" style=\"color:" + inStockColor + "\">" + inStockText + "</div>\n                        <h4 class=\"product-row__item product-row__item--price\">" + priceHtml + "$</h4>\n                        <div class=\"product-row__item product-row__item--quantity\">\n                            " + quantityHtml + "\n                        </div>\n                    </div>";
                    return productHtml;
                }).join('');
                return headersHtml + productsHtml_1;
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
getStoresProducts();
