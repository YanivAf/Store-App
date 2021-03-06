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
        var getStoreDetails, _a, stores, store, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/store/" + storeUuid)];
                case 1:
                    getStoreDetails = _b.sent();
                    _a = getStoreDetails.data, stores = _a.stores, store = _a.store;
                    renderStore(stores, store, isAdmin);
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
function renderStore(stores, store, isAdmin) {
    try {
        var storeName = void 0, products_1;
        if (stores) {
            storeName = 'Virtual Mall';
            products_1 = [];
            stores.stores.forEach(function (store) { products_1 = products_1.concat(store.products); });
        }
        else {
            storeName = store.storeName;
            products_1 = store.products;
        }
        var storeNameElement = document.querySelector('.main__item--store-name');
        storeNameElement.innerText = storeName;
        var pageTitle = document.querySelector('title');
        pageTitle.innerText = storeName;
        renderStoreProducts(products_1, cartProductsToRender, lovedProducts, isAdmin);
        if ((!isAdmin) && (store)) {
            var contactStoreElement = document.querySelector('#contact');
            contactStoreElement.setAttribute('href', "mailto:" + store.contactEmail + "?subject=" + store.storeName + " - General Inquiry");
            contactStoreElement.innerHTML = "<i class=\"far fa-envelope\" title=\"Contact us!\"></i>";
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
function renderStoreProducts(products, cartProducts, lovedProducts, isAdmin) {
    try {
        var productsElement = document.querySelector('.products');
        var productsHtml = void 0;
        var AreThereProducts = (products.length > 0) ? true : false;
        productsHtml = (!AreThereProducts) ? 'no products to show!'
            :
                products.map(function (product) {
                    var buttonsByRole = "";
                    if (isAdmin)
                        buttonsByRole = "";
                    else {
                        if (storeUuid)
                            buttonsByRole = "\n                <a href=\"./store.html?storeUuid=" + product.storeUuid + "\" class=\"product-buttons__item product-buttons__item--store\">\n                    <i class=\"fas fa-store\" title=\"Go to " + product.productName + "'s store\"></i>\n                </a>";
                        var lovedProductIndex = lovedProducts.findIndex(function (lovedProduct) { return lovedProduct === product.productUuid; });
                        var isLoved = (lovedProductIndex !== -1) ? true : false;
                        var lovedBtnHtml = (isLoved) ? "<i class=\"product-buttons__item product-buttons__item--product-loved fas fa-heart product-loved\" title=\"Unlove " + product.productName + "\"></i>" : "<i class=\"product-buttons__item product-buttons__item--love-product far fa-heart love-product\" title=\"Love " + product.productName + "\"></i>";
                        var cartProductIndex = cartProducts.findIndex(function (cartProduct) { return cartProduct.productUuid === product.productUuid; });
                        if (cartProductIndex === -1)
                            buttonsByRole =
                                "<i class=\"product-buttons__item product-buttons__item--cart-add fas fa-cart-plus add-to-cart\" title=\"Add " + product.productName + " to cart\"></i>\n                " + lovedBtnHtml + "\n                " + buttonsByRole;
                        else
                            buttonsByRole = "\n                <a href=\"./cart.html\" class=\"product-buttons__item product-buttons__item--cart-added\">\n                    <i class=\"fas fa-shopping-cart\" title=\"See " + product.productName + " in your cart\"></i>\n                </a>\n                " + lovedBtnHtml + "\n                " + buttonsByRole;
                    }
                    var inStockText;
                    var inStockColor;
                    var isInStock = (product.inStock > 0) ? true : false;
                    if (isInStock) {
                        if (isAdmin)
                            inStockText = product.inStock + " left";
                        else
                            inStockText = (product.inStock > 5) ? "In Stock" : "Running Out!";
                        inStockColor = (product.inStock > 5) ? 'green' : 'orange';
                    }
                    else {
                        inStockText = 'Out of Stock';
                        inStockColor = 'red';
                    }
                    var saleTagHtml = "";
                    var salePriceHtml = "";
                    var isOnSale = (product.precentsOff > 0) ? true : false;
                    if (isOnSale) {
                        saleTagHtml = "<h5 class=\"product__item product__item--sale\">" + product.precentsOff + "% off!</h5>";
                        salePriceHtml = "<br /><span style=\"font-size: 12px; color: lightgrey; text-decoration: line-through;\">" + (Math.round(product.productPrice * 100) / 100).toFixed(2) + "$</span>";
                    }
                    var soldHtml = ((product.sold < 10) && (!isAdmin)) ? '<div class="sold">New product!</div>' : "<div class=\"sold\">" + product.sold + " sold</div>";
                    var lovedHtml = (!isAdmin) ? '' : "<div class=\"loved\">" + product.loved + " <i class=\"fas fa-heart\"></i></div>";
                    var productHtml = ((!isAdmin) && (!isInStock)) ? ''
                        :
                            "<div class=\"products__item product\" id=\"" + product.productUuid + "\">\n                " + saleTagHtml + "\n                <h3 class=\"product__item product__item--name\">" + product.productName + "</h3>\n                <a href=\"./product.html?storeUuid=" + product.storeUuid + "&productUuid=" + product.productUuid + "\" class=\"product__item product__item--img\">\n                    <img src=\"" + product.productImage + "\" title=\"" + product.productName + "\"/>\n                </a>\n                <a href=\"./product.html?storeUuid=" + product.storeUuid + "&productUuid=" + product.productUuid + "\" title=\"Click for full description\" class=\"product__item product__item--description\">" + product.productDescription + "</a>\n                <h4 class=\"product__item product__item--price\">" + (Math.round((product.productPrice - product.productPrice * (product.precentsOff / 100)) * 100) / 100).toFixed(2) + "$" + salePriceHtml + "</h4>\n                <div class=\"product__item product__item--stats\">\n                    " + soldHtml + "\n                    " + lovedHtml + "\n                </div>\n                <div class=\"product__item product__item--stock\" style=\"color:" + inStockColor + "\">" + inStockText + "</div>\n                <div class=\"product__item product-buttons\">" + buttonsByRole + "</div>\n                \n            </div>";
                    return productHtml;
                }).join('');
        productsElement.innerHTML = productsHtml;
    }
    catch (error) {
        console.error(error.message);
    }
}
var modalElement = document.querySelector('#add-product-modal');
if (isAdmin) {
    var addProductElement = document.querySelector("#add-product");
    addProductElement.addEventListener('click', function (ev) { return renderProductForm(ev); });
    var closeModalElement = document.querySelector(".close");
    closeModalElement.addEventListener('click', function (ev) { return modalElement.style.display = "none"; });
    window.onclick = function (ev) {
        if (ev.target == modalElement) {
            modalElement.style.display = "none";
        }
    };
}
function renderProductForm(ev) {
    try {
        modalElement.style.display = 'flex';
        var formInnerHTML = "\n        <div class=\"product-large__item product-large__item--img\">\n            <img id=\"product-preview\" src=\"./images/cart-wp.png\">\n            <input id=\"product-image\" class=\"button\" type=\"file\" name=\"productImage\" accept=\"image/*\" onchange=\"readURL(this)\" />\n        </div>\n        <div class=\"product-large__item details\">\n            <input class=\"details__item details__item--name\" type=\"text\" name=\"productName\" minLength=\"2\" maxLength=\"40\" placeholder=\"Product Name\" required />\n            <div class=\"details__item details__item--sale\">\n                <input type=\"number\" name=\"precentsOff\" min=\"0\" max=\"100\" placeholder=\"% Off\" />\n                <label for=\"precentsOff\">% Off</label>\n            </div>\n            <textarea class=\"details__item details__item--description\" name=\"productDescription\" minLength=\"10\" maxLength=\"300\" placeholder=\"Product Description (10-300 characters)\" required></textarea>\n            <div class=\"details__item details__item--price\">\n                <input type=\"number\" name=\"productPrice\" min=\"0\" max=\"5000\" placeholder=\"Price ($)\" step=\".01\" pattern=\"^\\d+(?:\\.\\d{1,2})?$\" required />\n                <label for=\"productPrice\">Price ($)</label>\n            </div>\n            <div class=\"details__item details__item--in-stock\">\n                <input type=\"number\" name=\"productInStock\" min=\"0\" max=\"500\" placeholder=\"In Stock\" required />\n                <label for=\"productInStock\">In Stock</label>\n            </div>        \n            <input class=\"details__item details__item--submit button\" type=\"submit\" value=\"Add\" />\n        </div>";
        addProductForm.innerHTML = formInnerHTML;
    }
    catch (error) {
        console.error(error.message);
    }
}
getStore();
