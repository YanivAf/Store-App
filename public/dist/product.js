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
var url = new URL(window.location.href);
var productUuid = url.searchParams.get("productUuid");
function getProduct() {
    return __awaiter(this, void 0, void 0, function () {
        var getProductDetails, _a, storeProduct, cartProduct, isAdmin, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/store/product/" + productUuid)];
                case 1:
                    getProductDetails = _b.sent();
                    _a = getProductDetails.data, storeProduct = _a.storeProduct, cartProduct = _a.cartProduct, isAdmin = _a.isAdmin;
                    renderProduct(storeProduct, cartProduct, isAdmin);
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
function renderProduct(storeProduct, cartProduct, isAdmin) {
    return __awaiter(this, void 0, void 0, function () {
        var productElement, productHtml, buttonsByRole, inStockText, inStockColor, isInStock, sadsad;
        return __generator(this, function (_a) {
            try {
                productElement = document.querySelector('.product');
                productHtml = void 0;
                buttonsByRole = void 0;
                if (isAdmin)
                    buttonsByRole = "\n            <i class=\"product-buttons__item product-buttons__item--delete fas fa-trash\" id=\"delete-from-store\" title=\"Delete " + storeProduct.productName + "\"></i>";
                else {
                    if (cartProduct === undefined)
                        buttonsByRole = "<i class=\"product-buttons__item product-buttons__item--cart-add fas fa-cart-plus\" id=\"add-to-cart\" title=\"Add " + storeProduct.productName + " to cart\"></i>";
                    else
                        buttonsByRole = "<a href=\"./cart.html\" class=\"product-buttons__item product-buttons__item--cart-added\"><i class=\"fas fa-shopping-cart\" title=\"See " + storeProduct.productName + " in your cart\"></i></a>";
                }
                inStockText = void 0;
                inStockColor = void 0;
                isInStock = (storeProduct.inStock > 0) ? true : false;
                if (isInStock) {
                    inStockText = storeProduct.inStock + " left";
                    inStockColor = (storeProduct.inStock > 5) ? 'green' : 'orange';
                }
                else {
                    inStockText = 'Out of Stock';
                    inStockColor = 'red';
                }
                productHtml = "\n            <form class=\"main__item main__item--edit-product-form product-large\" id=\"edit-product-form\">\n                <input class=\"product-large__item product-large__item--name\" type=\"text\" minLength=\"2\" maxLength=\"40\" placeholder=\"Product Name\" value=\"" + storeProduct.productName + "\" />\n                <div class=\"product-large__item product-large__item--img\">\n                    <img id=\"productImg\" src=\"" + storeProduct.productImage + "\" title=\"" + storeProduct.productName + "\">\n                    <input class=\"product-large__item product-large__item--img\" type=\"file\" name=\"image\" onchange=\"readURL(this)\" />\n                </div>\n                <textarea class=\"product-large__item product-large__item--description\" minLength=\"10\" maxLength=\"500\" placeholder=\"Product Description\">" + storeProduct.productDescription + "</textarea>\n                <input class=\"product-large__item product-large__item--price\" type=\"number\" min=\"0\" max=\"5000\" placeholder=\"Price ($)\" value=\"" + (Math.round(storeProduct.productPrice * 100) / 100).toFixed(2) + "\" />\n                <input class=\"product-large__item product-large__item--in-stock\" type=\"number\" min=\"0\" max=\"500\" placeholder=\"In Stock\" value=\"" + storeProduct.inStock + "\" />\n                <input class=\"product-large__item product-large__item--submit\" type=\"submit\" value=\"Update\" />\n            </form>";
                sadsad = "<div class=\"products__item product\" id=\"" + storeProduct.productUuid + "\">\n                <h1 class=\"product__item product__item--name\">" + storeProduct.productName + "</h1>\n                <img src=\"" + storeProduct.productImage + "\" title=\"" + storeProduct.productName + " class=\"product__item product__item--img\" />\n                <p class=\"product__item product__item--description\">" + storeProduct.productDescription + "</p>\n                <h4 class=\"product__item product__item--price\">" + (Math.round(storeProduct.productPrice * 100) / 100).toFixed(2) + "$</h4>\n                <div class=\"product__item product__item--stock\" style=\"color:" + inStockColor + "\">" + inStockText + "</div>\n                <div class=\"product__item product-buttons\">" + buttonsByRole + "</div>\n            </div>";
                productElement.innerHTML = productHtml;
            }
            catch (error) {
                console.error(error.message);
            }
            return [2 /*return*/];
        });
    });
}
getProduct();
function renderAddProductForm() {
    var productsElement = document.querySelector('.products');
    var formHTML = "\n    <form class=\"main__item main__item--add-product-form product-large\" id=\"add-product-form\">\n        <h3 class=\"product-large__item product-large__item--title\" >Add a new product</h3>\n        <input class=\"product-large__item product-large__item--name\" type=\"text\" minLength=\"2\" maxLength=\"40\" placeholder=\"Product Name\" />\n        <div class=\"product-large__item product-large__item--img\">\n            <img id=\"productImg\" src=\"./images/cart-wp.png\">\n            <input class=\"product-large__item product-large__item--img\" type=\"file\" name=\"image\" onchange=\"readURL(this)\" />\n        </div>\n        <textarea class=\"product-large__item product-large__item--description\" minLength=\"10\" maxLength=\"500\" placeholder=\"Product Description\"></textarea>\n        <input class=\"product-large__item product-large__item--price\" type=\"number\" min=\"0\" max=\"5000\" placeholder=\"Price ($)\" />\n        <input class=\"product-large__item product-large__item--in-stock\" type=\"number\" min=\"0\" max=\"500\" placeholder=\"In Stock\" />\n        <input class=\"product-large__item product-large__item--submit\" type=\"submit\" value=\"Add\" />\n    </form>";
    productsElement.insertAdjacentHTML('afterend', formHTML);
}
// <i class="product-buttons__item product-buttons__item--delete fas fa-trash" id="delete-from-store" title="Delete ${product.productName}"></i>
// <i class="product-buttons__item product-buttons__item--edit fas fa-edit" id="edit-on-store" title="Edit ${product.productName}"></i>
