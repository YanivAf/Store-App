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
function getStore() {
    return __awaiter(this, void 0, void 0, function () {
        var getStoreDetails, _a, store, isAdmin, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/store/" + storeUuid)];
                case 1:
                    getStoreDetails = _b.sent();
                    _a = getStoreDetails.data, store = _a.store, isAdmin = _a.isAdmin;
                    renderStore(store, isAdmin);
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
function renderStore(store, isAdmin) {
    try {
        var storeName = store.storeName, products = store.products;
        var storeNameElement = document.querySelector('.main__item--store-name');
        storeNameElement.innerText = storeName;
        var pageTitle = document.querySelector('title');
        pageTitle.innerText = storeName;
        renderStoreProducts(products, cartProductsToRender, isAdmin);
        if (isAdmin)
            renderProductForm();
    }
    catch (error) {
        console.error(error.message);
    }
}
function renderStoreProducts(products, cartProducts, isAdmin) {
    try {
        var productsElement = document.querySelector('.products');
        var productsHtml = void 0;
        var AreThereProducts = (products.length > 0) ? true : false;
        productsHtml = (!AreThereProducts) ? 'no products to show!'
            :
                products.map(function (product) {
                    var buttonsByRole;
                    if (isAdmin)
                        buttonsByRole = "\n                <a href=\"./product.html?productUuid=" + product.productUuid + "\" class=\"product-buttons__item product-buttons__item--info fas fa-info\" >\n                    <i title=\"View & change " + product.productName + "\"></i>\n                </a>";
                    else {
                        var cartProductIndex = cartProducts.findIndex(function (cartProduct) { return cartProduct.productUuid === product.productUuid; });
                        if (cartProductIndex === -1)
                            buttonsByRole = "<i class=\"product-buttons__item product-buttons__item--cart-add fas fa-cart-plus\" id=\"add-to-cart\" title=\"Add " + product.productName + " to cart\"></i>";
                        else
                            buttonsByRole = "<a href=\"./cart.html\" class=\"product-buttons__item product-buttons__item--cart-added\"><i class=\"fas fa-shopping-cart\" title=\"See " + product.productName + " in your cart\"></i></a>";
                    }
                    var inStockText;
                    var inStockColor;
                    var isInStock = (product.inStock > 0) ? true : false;
                    if (product.inStock > 0) {
                        inStockText = product.inStock + " left";
                        inStockColor = (product.inStock > 5) ? 'green' : 'orange';
                    }
                    else {
                        inStockText = 'Out of Stock';
                        inStockColor = 'red';
                    }
                    var productHtml = ((!isAdmin) && (!isInStock)) ? ''
                        :
                            "<div class=\"products__item product\" id=\"" + product.productUuid + "\">\n                <h3 class=\"product__item product__item--name\">" + product.productName + "</h3>\n                <a href=\"./product.html?productUuid=" + product.productUuid + "\" class=\"product__item product__item--img\">\n                    <img src=\"" + product.productImage + "\" title=\"" + product.productName + "\"/>\n                </a>\n                <a href=\"./product.html?productUuid=" + product.productUuid + "\" title=\"Click for full description\" class=\"product__item product__item--description\">" + product.productDescription + "</a>\n                <h4 class=\"product__item product__item--price\">" + (Math.round(product.productPrice * 100) / 100).toFixed(2) + "$</h4>\n                <div class=\"product__item product__item--stock\" style=\"color:" + inStockColor + "\">" + inStockText + "</div>\n                <div class=\"product__item product-buttons\">" + buttonsByRole + "</div>\n                \n            </div>";
                    return productHtml;
                }).join('');
        productsElement.innerHTML = productsHtml;
    }
    catch (error) {
        console.error(error.message);
    }
}
function renderProductForm() {
    try {
        var addProductForm = document.querySelector('#add-product-form');
        addProductForm.style.display = 'unset';
        var formInnerHTML = "\n        <h3 class=\"product-large__item product-large__item--title\" >Add a new product</h3>\n        <input class=\"product-large__item product-large__item--name\" type=\"text\" name=\"productName\" minLength=\"2\" maxLength=\"40\" placeholder=\"Product Name\" required />\n        <div class=\"product-large__item product-large__item--img\">\n            <img id=\"productImg\" src=\"./images/cart-wp.png\">\n            <input class=\"button\" type=\"file\" name=\"productImage\" onchange=\"readURL(this)\" />\n        </div>\n        <textarea class=\"product-large__item product-large__item--description\" name=\"productDescription\" minLength=\"10\" maxLength=\"300\" placeholder=\"Product Description (10-300 characters)\" required></textarea>\n        <input class=\"product-large__item product-large__item--price\" type=\"number\" name=\"productPrice\" min=\"0\" max=\"5000\" placeholder=\"Price ($)\" step=\".01\" pattern=\"^\\d+(?:\\.\\d{1,2})?$\" required />\n        <input class=\"product-large__item product-large__item--in-stock\" type=\"number\" name=\"productInStock\" min=\"0\" max=\"500\" placeholder=\"In Stock\" required />\n        <input class=\"product-large__item product-large__item--submit button\" type=\"submit\" value=\"Add\" />";
        addProductForm.innerHTML = formInnerHTML;
    }
    catch (error) {
        console.error(error.message);
    }
}
getStore();
