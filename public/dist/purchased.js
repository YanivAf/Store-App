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
function getStorePurchasedCarts() {
    return __awaiter(this, void 0, void 0, function () {
        var getStoreDetails, store, storePurchasedCarts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/store/" + storeUuid)];
                case 1:
                    getStoreDetails = _a.sent();
                    store = getStoreDetails.data.store;
                    storePurchasedCarts = store.purchasedCarts;
                    renderPurchasedCarts(storePurchasedCarts);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderPurchasedCarts(purchasedCarts) {
    try {
        var cartsElement = document.querySelector('.carts');
        var purchasedCartsHtml = void 0;
        var totalPurchasedPrice_1 = 0;
        var totalRefunded_1 = 0;
        var AreThereProducts = (purchasedCarts.length > 0) ? true : false;
        if (!AreThereProducts) {
            purchasedCartsHtml = (isAdmin) ? "<p>There aren't any purchases yet... <a href=\"./store.html?storeUuid=" + storeUuid + "\">Click here</a> to improve your store!</p>" : "<p>You haven't purchased anything yet... <a href=\"./store.html?storeUuid=mall\">Click here</a> to do some shopping!</p>";
        }
        else {
            var headersHtml_1 = "\n            <div class=\"cart__item cart__item--headers\">\n                <h4>Status</h4>\n                <h4>Status Update</h4>\n                <h4>Product Name</h4>\n                <h4></h4>\n                <h4>Total Price</h4>\n                <h4>Quantity</h4>\n            </div>";
            purchasedCartsHtml = purchasedCarts.map(function (purchasedCart) {
                var subTotalPurchasedPrice = 0;
                var subTotalQuantity = 0;
                var statusDisabledState = "";
                var statusHtml;
                var statusSelectedState = {
                    awaitingShipment: "",
                    shipped: "",
                    arrivedDestination: "",
                    activeExamination: ""
                };
                var purchasedCartProductsHtml = purchasedCart.purchasedCartProducts.map(function (purchasedCartProduct) {
                    subTotalPurchasedPrice += purchasedCartProduct.totalPrice;
                    subTotalQuantity += purchasedCartProduct.quantity;
                    totalPurchasedPrice_1 += purchasedCartProduct.totalPrice;
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
                                totalRefunded_1 += purchasedCartProduct.totalPrice;
                                break;
                            case 'Refunded - Stayed In Stock':
                                statusSelectedState.refundStayedInStock = " selected";
                                statusDisabledState = " disabled";
                                totalRefunded_1 += purchasedCartProduct.totalPrice;
                                totalPurchasedPrice_1 -= purchasedCartProduct.totalPrice;
                                break;
                        }
                        statusHtml = "\n                        <select class=\"update-delivery-status\"" + statusDisabledState + ">\n                            <option value=\"Awaiting Shipment\"" + statusSelectedState.awaitingShipment + ">Awaiting Shipment</option>\n                            <option value=\"Shipped\"" + statusSelectedState.shipped + ">Shipped</option>\n                            <option value=\"Arrived Destination\"" + statusSelectedState.arrivedDestination + ">Arrived Destination</option>\n                            <option value=\"Active Examination\"" + statusSelectedState.activeExamination + " title=\"Internal handling in progress to expidate product arrival\">Active Examination</option>\n                            <option value=\"Refunded - Left Stock\"" + statusSelectedState.refundLeftStock + ">Refunded - Left Stock</option>\n                            <option value=\"Refunded - Stayed In Stock\"" + statusSelectedState.refundStayedInStock + ">Refunded - Stayed In Stock</option>\n                        </select>";
                    }
                    else {
                        statusHtml = "" + purchasedCartProduct.status;
                    }
                    var purchasedCartProductHtml = "\n                    <div class=\"cart__item product-row\" id=\"" + purchasedCartProduct.productUuid + "\">\n                        <div class=\"product-row__item product-row__item--status\">\n                            " + statusHtml + "\n                        </div>\n                        <div class=\"product-row__item product-row__item--status-update\">\n                            " + purchasedCartProduct.statusUpdatedAt + "\n                        </div>\n                        <a href=\"./product.html?storeUuid=" + purchasedCartProduct.storeUuid + "&productUuid=" + purchasedCartProduct.productUuid + "\" class=\"product-row__item product-row__item--name\">\n                            <h3>" + purchasedCartProduct.productName + "</h3>\n                        </a>\n                        <h4 class=\"product-row__item product-row__item--total\">" + (Math.round(purchasedCartProduct.totalPrice * 100) / 100).toFixed(2) + "$</h4>\n                        <div class=\"product-row__item product-row__item--quantity\">\n                            <p>" + purchasedCartProduct.quantity + "<p/>\n                        </div>\n                    </div>";
                    return purchasedCartProductHtml;
                }).join('');
                var totalHtml = "\n                <div class=\"cart__item cart__item--footers\">\n                    <h3>Total:</h3>\n                    <h3></h3>\n                    <h3></h3>\n                    <h3></h3>\n                    <h3>" + (Math.round(subTotalPurchasedPrice * 100) / 100).toFixed(2) + "$</h3>\n                    <h3>" + subTotalQuantity + "</h3>\n                </div>";
                var shippingHtml = "\n                <div class=\"cart__item cart__item--footers\">\n                    <h3>Shipping Address:</h3>\n                    <h4>" + purchasedCart.shippingAddress + "</h4>\n                </div>";
                var purchaseDateHtml = "\n                <div class=\"cart__item cart__item--footers\">\n                    <h3>Purchase Date:</h3>\n                    <h4>" + purchasedCart.purchasedAt + "</h4>\n                </div>";
                var purchasedCartHtml = (!purchasedCartProductsHtml) ? '' : "\n                <div class=\"cart\" id = \"" + purchasedCart.purchasedCartUuid + "\">\n                    " + (headersHtml_1 + purchasedCartProductsHtml + totalHtml + shippingHtml + purchaseDateHtml) + "\n                </div>";
                return purchasedCartHtml;
            }).join('');
        }
        cartsElement.innerHTML = purchasedCartsHtml;
    }
    catch (error) {
        console.error(error.message);
    }
}
if (isAdmin)
    getStorePurchasedCarts();
else
    renderPurchasedCarts(shopperPurchasedCartsToRender);
