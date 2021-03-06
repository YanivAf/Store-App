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
var updateAncestor = (whichHtmlFile === '/store.html') ? document.querySelector('.products') : document.querySelector('.main');
updateAncestor.addEventListener('click', function (ev) { return updateQuantity(ev); });
updateAncestor.addEventListener('change', function (ev) { return updateQuantity(ev); });
updateAncestor.addEventListener('click', function (ev) { return updateSaved(ev); });
updateAncestor.addEventListener('click', function (ev) { return updateLoved(ev); });
function updateQuantity(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var productQuantity, cancelDelete, productDiv, storeA, allStoresInfo, updateCartProductQuantity, _a, cartProducts, storeProducts, savedProducts, lovedProducts, shippingAddress, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    if (((!ev.target.classList.contains('add-to-cart')) && (!ev.target.classList.contains('remove-from-cart')) && (!ev.target.classList.contains('save-for-later')) && (!ev.target.classList.contains('update-cart-qunatity')))
                        || ((ev.type === 'click') && (ev.target.classList.contains('update-cart-qunatity'))))
                        return [2 /*return*/];
                    productQuantity = void 0;
                    if (!ev.target.classList.contains('add-to-cart')) return [3 /*break*/, 1];
                    productQuantity = 1;
                    return [3 /*break*/, 4];
                case 1:
                    if (!ev.target.classList.contains('remove-from-cart')) return [3 /*break*/, 3];
                    return [4 /*yield*/, swal({
                            title: "Remove from Cart",
                            text: "Are you sure?",
                            icon: "warning",
                            dangerMode: true,
                            buttons: {
                                later: 'Save for Later',
                                cancel: 'Nope',
                                confirm: 'Yup'
                            }
                        })];
                case 2:
                    cancelDelete = _b.sent();
                    if (!cancelDelete)
                        return [2 /*return*/];
                    else if (cancelDelete === 'later')
                        productQuantity = -2; // remove from cart & add to saved products
                    else
                        productQuantity = -1; // remove from cart
                    return [3 /*break*/, 4];
                case 3:
                    if ((ev.target.classList.contains('save-for-later')) && (!ev.target.classList.contains('product-buttons__item')))
                        productQuantity = -2; // // remove from cart & add to saved products (only for cart.html)
                    else
                        productQuantity = ev.target.valueAsNumber;
                    _b.label = 4;
                case 4:
                    productDiv = ev.target.parentElement.parentElement;
                    productUuid = url.searchParams.get("productUuid");
                    productUuid = productUuid !== null && productUuid !== void 0 ? productUuid : productDiv.getAttribute('id');
                    storeA = productDiv.querySelector('.product__item--img');
                    if (whichHtmlFile === '/product.html')
                        storeA = productDiv.querySelector('.product-large__item--img');
                    else if (whichHtmlFile === '/cart.html')
                        storeA = productDiv.querySelector('.product-row__item--img');
                    storeUuid = url.searchParams.get("storeUuid");
                    allStoresInfo = ((storeUuid === 'mall') || (whichHtmlFile === '/cart.html')) ? true : false;
                    storeUuid = ((!storeUuid) || (storeUuid === 'mall')) ? storeA.getAttribute('href').replace(/^(.)*storeUuid=/g, '').replace(/[&](.)*$/g, '') : storeUuid;
                    return [4 /*yield*/, axios.put('/user/cart', { allStoresInfo: allStoresInfo, storeUuid: storeUuid, productUuid: productUuid, productQuantity: productQuantity })];
                case 5:
                    updateCartProductQuantity = _b.sent();
                    _a = updateCartProductQuantity.data, cartProducts = _a.cartProducts, storeProducts = _a.storeProducts, savedProducts = _a.savedProducts, lovedProducts = _a.lovedProducts, shippingAddress = _a.shippingAddress;
                    return [4 /*yield*/, renderShopperCart(cartProducts)];
                case 6:
                    _b.sent();
                    if ((ev.target.classList.contains('add-to-cart')) && (whichHtmlFile === '/store.html'))
                        renderStoreProducts(storeProducts, cartProducts, lovedProducts, false);
                    else if (whichHtmlFile === '/product.html')
                        getProduct();
                    else if (whichHtmlFile === '/cart.html')
                        renderCartPageProducts(storeProducts, cartProducts, savedProducts, shippingAddress);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function updateSaved(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var productDiv, updateSavedList, _a, cartProducts, storeProducts, savedProducts, shippingAddress, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if ((!ev.target.classList.contains('remove-from-saved')))
                        return [2 /*return*/];
                    productDiv = ev.target.parentElement.parentElement;
                    productUuid = productDiv.getAttribute('id');
                    return [4 /*yield*/, axios.put('/user/saved', { productUuid: productUuid })];
                case 1:
                    updateSavedList = _b.sent();
                    _a = updateSavedList.data, cartProducts = _a.cartProducts, storeProducts = _a.storeProducts, savedProducts = _a.savedProducts, shippingAddress = _a.shippingAddress;
                    renderCartPageProducts(storeProducts, cartProducts, savedProducts, shippingAddress);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.error(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateLoved(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var productDiv, storeA, allStoresInfo, updateLovedList, _a, cartProducts, storeProducts, lovedProducts, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if ((!ev.target.classList.contains('love-product')) && (!ev.target.classList.contains('product-loved')))
                        return [2 /*return*/];
                    productDiv = ev.target.parentElement.parentElement;
                    productUuid = url.searchParams.get("productUuid");
                    productUuid = productUuid !== null && productUuid !== void 0 ? productUuid : productDiv.getAttribute('id');
                    storeA = (whichHtmlFile === '/store.html') ? productDiv.querySelector('.product__item--img') : productDiv.querySelector('.product-large__item--img');
                    storeUuid = url.searchParams.get("storeUuid");
                    allStoresInfo = (storeUuid === 'mall') ? true : false;
                    storeUuid = (storeUuid === 'mall') ? storeA.getAttribute('href').replace(/^(.)*storeUuid=/g, '').replace(/[&](.)*$/g, '') : storeUuid;
                    return [4 /*yield*/, axios.put('/user/loved', { allStoresInfo: allStoresInfo, storeUuid: storeUuid, productUuid: productUuid })];
                case 1:
                    updateLovedList = _b.sent();
                    _a = updateLovedList.data, cartProducts = _a.cartProducts, storeProducts = _a.storeProducts, lovedProducts = _a.lovedProducts;
                    return [4 /*yield*/, renderShopperCart(cartProducts)];
                case 2:
                    _b.sent();
                    if (whichHtmlFile === '/store.html')
                        renderStoreProducts(storeProducts, cartProducts, lovedProducts, false);
                    else if (whichHtmlFile === '/product.html')
                        getProduct(lovedProducts);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error(error_3.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
if (whichHtmlFile === '/cart.html') {
    var payBtn = document.querySelector('#pay');
    payBtn.addEventListener('click', function (ev) { return purchaseCart(ev); });
}
function purchaseCart(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, swal({
                            title: "Paying for Cart",
                            text: "Do you wish to proceed?",
                            icon: "warning",
                            buttons: ['Nope', 'Yup']
                        }).then(function (willPurchase) { return __awaiter(_this, void 0, void 0, function () {
                            var payForCart, purchaseCart_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!willPurchase) return [3 /*break*/, 3];
                                        return [4 /*yield*/, axios.put('/user/cart/purchase', { storeUuid: 'all cart products stores', productUuid: 'all cart products' })];
                                    case 1:
                                        payForCart = _a.sent();
                                        purchaseCart_1 = payForCart.data.purchaseCart;
                                        if (!(purchaseCart_1 === true)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, swal({
                                                title: "Congrats!",
                                                text: "You've completed the purchase",
                                                icon: "success",
                                                button: 'Cool'
                                            }).then(function () {
                                                window.location.href = './store.html?storeUuid=mall';
                                            })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
