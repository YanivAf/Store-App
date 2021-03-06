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
function getProduct(updatedLovedProducts) {
    return __awaiter(this, void 0, void 0, function () {
        var getProductDetails, _a, storeProduct, cartProduct, storeName, contactEmail, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/store/" + storeUuid + "/product/" + productUuid)];
                case 1:
                    getProductDetails = _b.sent();
                    _a = getProductDetails.data, storeProduct = _a.storeProduct, cartProduct = _a.cartProduct, storeName = _a.storeName, contactEmail = _a.contactEmail;
                    lovedProducts = (updatedLovedProducts) ? updatedLovedProducts : lovedProducts;
                    renderProduct(storeProduct, cartProduct, lovedProducts, storeName, contactEmail, isAdmin);
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
function renderProduct(storeProduct, cartProduct, lovedProducts, storeName, contactEmail, isAdmin) {
    try {
        var updateProductForm = document.querySelector('#edit-product-form');
        var pageTitle = document.querySelector('title');
        var productNameElement = document.querySelector('#product-name');
        pageTitle.innerText = storeProduct.productName;
        productNameElement.innerHTML = storeProduct.productName;
        var productHtml = void 0;
        var soldHtml = "<div class=\"sold\">" + storeProduct.sold + " sold</div>";
        var lovedHtml = "<div class=\"loved\">" + storeProduct.loved + " <i class=\"fas fa-heart\"></i></div>";
        var buttonsByRole = void 0;
        var cartProductQuantity = void 0;
        if (isAdmin) {
            updateProductForm.style.display = 'flex';
            buttonsByRole = "<i class=\"product-buttons__item product-buttons__item--delete fas fa-trash\" id=\"delete-from-store\" onclick=\"deleteProduct(event)\" title=\"Delete " + storeProduct.productName + "\"></i>";
            productHtml = "\n            <div class=\"product-large__item product-large__item--img\">\n                <img id=\"productImg\" src=\"" + storeProduct.productImage + "\" title=\"" + storeProduct.productName + "\">\n                <input id=\"product-image\" class=\"button\" type=\"file\" name=\"productImage\" accept=\"image/*\" onchange=\"readURL(this)\" />\n            </div>\n            <div class=\"product-large__item details\">\n                <input class=\"details__item details__item--name\" type=\"text\" name=\"productName\" minLength=\"2\" maxLength=\"40\" placeholder=\"Product Name\" value=\"" + storeProduct.productName + "\" required />\n                <div class=\"details__item details__item--buttons product-buttons\">" + buttonsByRole + "</div>\n                <div class=\"details__item details__item--sale\">\n                    <input type=\"number\" name=\"precentsOff\" min=\"0\" max=\"100\" placeholder=\"% Off\" value=\"" + storeProduct.precentsOff + "\" />\n                    <label for=\"precentsOff\">% Off</label>\n                </div>\n                <textarea class=\"details__item details__item--description\" name=\"productDescription\" minLength=\"10\" maxLength=\"300\" placeholder=\"Product Description (10-300 characters)\" required>" + storeProduct.productDescription + "</textarea>\n                <div class=\"details__item details__item--stats\">\n                    " + soldHtml + "\n                    " + lovedHtml + "\n                </div>\n                <div class=\"details__item details__item--price\">\n                    <input type=\"number\" name=\"productPrice\" min=\"0\" max=\"5000\" placeholder=\"Price ($)\" step=\".01\" pattern=\"^\\d+(?:\\.\\d{1,2})?$\" value=\"" + (Math.round(storeProduct.productPrice * 100) / 100).toFixed(2) + "\" required />\n                    <label for=\"productPrice\">Price ($)</label>\n                </div>\n                <div class=\"details__item details__item--in-stock\">\n                    <input type=\"number\" name=\"productInStock\" min=\"0\" max=\"500\" placeholder=\"In Stock\" value=\"" + storeProduct.inStock + "\" required />\n                    <label for=\"productInStock\">In Stock</label>\n                </div>\n                <input class=\"details__item details__item--submit button\" type=\"submit\" value=\"Update\" />\n            </div>";
            updateProductForm.innerHTML = productHtml;
        }
        else {
            if (updateProductForm)
                updateProductForm.remove();
            var lovedProductIndex = lovedProducts.findIndex(function (lovedProduct) { return lovedProduct === storeProduct.productUuid; });
            var isLoved = (lovedProductIndex !== -1) ? true : false;
            var lovedHtml_1 = (isLoved) ? "<i class=\"product-buttons__item product-buttons__item--product-loved fas fa-heart product-loved\" title=\"Unlove " + storeProduct.productName + "\"></i>" : "<i class=\"product-buttons__item product-buttons__item--love-product far fa-heart love-product\" title=\"Love " + storeProduct.productName + "\"></i>";
            soldHtml = (storeProduct.sold < 10) ? '<div class="sold">New product!</div>' : "<div class=\"sold\">" + storeProduct.sold + " sold</div>";
            var inStockText = void 0;
            var inStockColor = void 0;
            var isInStock = (storeProduct.inStock > 0) ? true : false;
            if (isInStock) {
                if (isAdmin)
                    inStockText = storeProduct.inStock + " left";
                else
                    inStockText = (storeProduct.inStock > 5) ? "In Stock" : "Running Out!";
                inStockColor = (storeProduct.inStock > 5) ? 'green' : 'orange';
            }
            else {
                inStockText = 'Out of Stock';
                inStockColor = 'red';
            }
            if (cartProduct === undefined) {
                buttonsByRole = "\n                <i class=\"product-buttons__item product-buttons__item--cart-add fas fa-cart-plus add-to-cart\" title=\"Add " + storeProduct.productName + " to cart\"></i>\n                " + lovedHtml_1 + "\n                <a href=\"./store.html?storeUuid=" + storeProduct.storeUuid + "\" class=\"product-buttons__item product-buttons__item--store\">\n                    <i class=\"fas fa-store\" title=\"Go to " + storeProduct.productName + "'s store\"></i>\n                </a>";
                cartProductQuantity = 0;
            }
            else {
                cartProductQuantity = cartProduct.quantity;
                buttonsByRole = "\n                <a href=\"./cart.html\" class=\"product-buttons__item product-buttons__item--cart-added\">\n                    <i class=\"fas fa-shopping-cart\" title=\"See " + storeProduct.productName + " in your cart\"></i>\n                </a>\n                " + lovedHtml_1 + "\n                <a href=\"./store.html?storeUuid=" + storeProduct.storeUuid + "\" class=\"product-buttons__item product-buttons__item--store\">\n                    <i class=\"fas fa-store\" title=\"Go to " + storeProduct.productName + "'s store\"></i>\n                </a>";
            }
            var saleTagHtml = "";
            var salePriceHtml = "";
            var isOnSale = (storeProduct.precentsOff > 0) ? true : false;
            if (isOnSale) {
                saleTagHtml = "<h5 class=\"details__item details__item--sale\">" + storeProduct.precentsOff + "% off!</h5>";
                salePriceHtml = "<br /><span style=\"font-size: 14px; color: lightgrey; text-decoration: line-through;\">" + (Math.round(storeProduct.productPrice * 100) / 100).toFixed(2) + "$</span>";
            }
            productHtml = "\n            <div class=\"main__item product-large\">\n                <div class=\"product-large__item product-large__item--img\">\n                    <img id=\"productImg\" src=\"" + storeProduct.productImage + "\" title=\"" + storeProduct.productName + "\">\n                </div>\n                <div class=\"product-large__item details\">\n                    <h3 class=\"details__item details__item--name\">Product Details</h3>\n                    <div class=\"details__item details__item--buttons product-buttons\">" + buttonsByRole + "</div>\n                    " + saleTagHtml + "\n                    \n                    <article class=\"details__item details__item--description\" title=\"Product Description\">" + storeProduct.productDescription + "</article>\n                    <div class=\"details__item details__item--stats\">\n                        " + soldHtml + "\n                    </div>\n                    <div class=\"details__item details__item--price\">\n                        <h3>" + (Math.round((storeProduct.productPrice - storeProduct.productPrice * (storeProduct.precentsOff / 100)) * 100) / 100).toFixed(2) + "$<span style=\"font-size: 12px; font-weight: normal;\"> per unit</span>" + salePriceHtml + "</h3>\n                    </div>\n                    <p class=\"details__item details__item--in-stock\" title=\"In Stock\" style=\"color:" + inStockColor + "\">" + inStockText + "</p>\n                    <div class=\"details__item details__item--quantity\">\n                        <input type=\"number\" class=\"update-cart-qunatity\" name=\"cartQuantity\" min=\"0\" max=\"" + storeProduct.inStock + "\" value=\"" + cartProductQuantity + "\" />\n                        <label for=\"cartQuantity\"> in your cart</label>\n                    </div>\n                </div>\n            </div>";
            var productElement = document.querySelector('.product-large');
            if (productElement)
                productElement.remove();
            var mainElement = document.querySelector('.main');
            mainElement.insertAdjacentHTML('beforeend', productHtml);
            magnifyImg();
            var contactStoreElement = document.querySelector('#contact');
            contactStoreElement.setAttribute('href', "mailto:" + contactEmail + "?subject=" + storeName + " - Inquiry about " + storeProduct.productName);
            contactStoreElement.innerHTML = "<i class=\"far fa-envelope\" title=\"Contact us!\"></i>";
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
function magnifyImg() {
    try {
        var productImg_1 = document.querySelector('#productImg');
        var zoom_1 = 3;
        var magnifierGlass_1 = document.createElement('div');
        magnifierGlass_1.setAttribute('class', 'img-magnifier-glass');
        productImg_1.parentElement.insertBefore(magnifierGlass_1, productImg_1);
        magnifierGlass_1.addEventListener("mousemove", moveMagnifier);
        productImg_1.addEventListener("mousemove", moveMagnifier);
        magnifierGlass_1.addEventListener("touchmove", moveMagnifier);
        productImg_1.addEventListener("touchmove", moveMagnifier);
        function moveMagnifier(ev) {
            ev.preventDefault();
            magnifierGlass_1.style.display = 'unset';
            magnifierGlass_1.style.backgroundImage = "url('" + productImg_1.src + "')";
            magnifierGlass_1.style.backgroundRepeat = "no-repeat";
            magnifierGlass_1.style.backgroundSize = (productImg_1.width * zoom_1) + "px " + (productImg_1.height * zoom_1) + "px";
            var bw = 1.1;
            var w = magnifierGlass_1.offsetWidth / 2;
            var h = magnifierGlass_1.offsetHeight / 2;
            var pos = getCursorPos(ev);
            var x = pos.x, y = pos.y;
            if ((x > productImg_1.width - (w / zoom_1)) || (x < w / zoom_1) || (y > productImg_1.height - (h / zoom_1)) || (y < h / zoom_1))
                magnifierGlass_1.style.display = 'none';
            if (x > productImg_1.width - (w / zoom_1))
                x = productImg_1.width - (w / zoom_1);
            if (x < w / zoom_1)
                x = w / zoom_1;
            if (y > productImg_1.height - (h / zoom_1))
                y = productImg_1.height - (h / zoom_1);
            if (y < h / zoom_1)
                y = h / zoom_1;
            magnifierGlass_1.style.left = (x - w) + "px";
            magnifierGlass_1.style.top = (y - h) + "px";
            magnifierGlass_1.style.backgroundPosition = "-" + ((x * zoom_1) - w + bw) + "px -" + ((y * zoom_1) - h + bw) + "px";
        }
        function getCursorPos(ev) {
            var x = 0, y = 0;
            ev = ev || window.event;
            var a = productImg_1.getBoundingClientRect();
            x = ev.pageX - a.left;
            y = ev.pageY - a.top;
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
getProduct();
