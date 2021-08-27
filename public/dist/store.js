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
function renderStoreDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var getStoreDetails, _a, store, isAdmin_1, storeName, products, storeNameElement, productsElement, html, AreThereProducts, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('/store/:storeUuid')];
                case 1:
                    getStoreDetails = _b.sent();
                    _a = getStoreDetails.data, store = _a.store, isAdmin_1 = _a.isAdmin;
                    console.log(getStoreDetails);
                    storeName = store.storeName, products = store.products;
                    storeNameElement = document.querySelector('#store-name');
                    storeNameElement.innerText = storeName;
                    productsElement = document.querySelector('.products');
                    html = void 0;
                    AreThereProducts = (store.products.length > 0) ? true : false;
                    html = (!AreThereProducts) ? 'no products to show!' :
                        store.products.map(function (product) {
                            var buttonsByRole = (isAdmin_1) ?
                                "<i class=\"product-buttons__item product-buttons__item--delete fas fa-trash\" title=\"Delete " + product.productName + "\"></i>\n                <i class=\"product-buttons__item product-buttons__item--edit fas fa-edit\" title=\"Edit " + product.productName + "\"></i>"
                                :
                                    "<div class=\"product-buttons__item product-buttons__item--cart-reduce\" title=\"Reduce quantity\">-</div>\n                <div class=\"product-buttons__item product-buttons__item--cart-total\" title=\"Reduce quantity\">CartQuantity</div>\n                <div class=\"product-buttons__item product-buttons__item--cart-add\" title=\"Add quantity\">+</div>";
                            var inStockText;
                            var inStockColor;
                            if (product.inStock > 0) {
                                inStockText = product.inStock + " left";
                                inStockColor = (product.inStock > 5) ? 'green' : 'orange';
                            }
                            else {
                                inStockText = 'Out of Stock';
                                inStockColor = 'red';
                            }
                            return "<div class=\"products__item product\" id=\"" + product.productUuid + "\">\n                    <h3 class=\"product__item product__item--name\">" + product.productName + "</h3>\n                    <img class=\"product__item product__item--img\" src=\"" + product.productImage + "\" title=\"" + product.productName + "\"/>\n                    <p class=\"product__item product__item--description\">" + product.productDescription + "</p>\n                    <div class=\"product__item product__item--price\">" + (Math.round(product.productPrice * 100) / 100).toFixed(2) + "$</div>\n                    <div class=\"product__item product__item--stock\" style=\"color:" + inStockColor + "\">" + inStockText + "</div>\n                    <div class=\"product__item product-buttons\">" + buttonsByRole + "</div>\n                    \n                </div>";
                        }).join('');
                    productsElement.innerHTML = html;
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
