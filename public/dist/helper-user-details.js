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
var whichHtmlFile = window.location.pathname;
var url = new URL(window.location.href);
var storeUuid;
var productUuid = url.searchParams.get("productUuid");
var isAdmin;
function getUserDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var userDetails, _a, user, isUserAdmin, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('/user/details')];
                case 1:
                    userDetails = _b.sent();
                    _a = userDetails.data, user = _a.user, isUserAdmin = _a.isUserAdmin;
                    isAdmin = isUserAdmin;
                    storeUuid = (isAdmin) ? user.stores[0] : url.searchParams.get("storeUuid");
                    renderUserDetails(user, isAdmin);
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
var isCartEmpty = true;
var cartProductsToRender;
var shopperPurchasedCartsToRender;
var savedProducts;
var lovedProducts;
function renderUserDetails(user, isAdmin) {
    try {
        var usernameElement = document.querySelector('.header__item--username');
        usernameElement.innerHTML = "<i class=\"far fa-user\"></i> " + user.username;
        var additionalHeaderElementsHtml = '';
        if (!isAdmin) {
            isCartEmpty = (user.cart.length === 0) ? true : false;
            cartProductsToRender = user.cart;
            shopperPurchasedCartsToRender = user.purchasedCarts;
            renderShopperCart(cartProductsToRender);
            savedProducts = user.savedForLater;
            lovedProducts = user.loved;
        }
        else {
            var navBar = {
                purchased: { aOrDiv: 'a', href: " href=\"./purchased.html\"" },
                store: { aOrDiv: 'a', href: " href=\"./store.html?storeUuid=" + storeUuid + "\"" }
            };
            var addProductHtml = '';
            switch (whichHtmlFile) {
                case '/purchased.html':
                    navBar.purchased.aOrDiv = 'div';
                    navBar.purchased.href = '';
                    break;
                case '/store.html':
                    addProductHtml = "\n                    <a href=\"#add-product-form\" class=\"header__item header__item--add-product\" title=\"Add new product\">\n                        <img src=\"./images/add-product.png\" title=\"Add new product\" />\n                    </a>";
                    navBar.store.aOrDiv = 'div';
                    navBar.store.href = '';
                    break;
            }
            additionalHeaderElementsHtml = "\n            <" + navBar.store.aOrDiv + navBar.store.href + " class=\"header__item header__item--store\">\n                <img src=\"./images/store.png\" title=\"Your store\" />\n            </" + navBar.store.aOrDiv + ">\n            <" + navBar.purchased.aOrDiv + navBar.purchased.href + " class=\"header__item header__item--purchased\">\n                <img src=\"./images/history-cart.png\" title=\"Purchased carts\" />\n            </" + navBar.purchased.aOrDiv + ">\n            " + addProductHtml;
        }
        var headerTitleElement = document.querySelector('.header__item--h1');
        headerTitleElement.insertAdjacentHTML("afterend", additionalHeaderElementsHtml);
    }
    catch (error) {
        console.error(error.message);
    }
}
function renderShopperCart(cartProducts) {
    try {
        var inCartSum = cartProducts.reduce(function (previousValue, currentValue) { return previousValue + currentValue.quantity; }, 0);
        var navBar = {
            purchased: { aOrDiv: 'a', href: ' href="./purchased.html"' },
            cart: { aOrDiv: 'a', href: ' href="./cart.html"' },
            storesList: { aOrDiv: 'a', href: ' href="./stores.html"' },
            mall: { aOrDiv: 'a', href: ' href="./store.html?storeUuid=mall"' }
        };
        navBar.cart.innerHTML = (inCartSum > 0) ?
            "<img id=\"cart\" src=\"./images/full-cart.png\" title=\"Cart\" />\n        <div id=\"in-cart\">\n            " + inCartSum + "\n        </div>"
            :
                "<img id=\"cart\" src=\"./images/empty-cart.png\" title=\"Cart\" />";
        switch (whichHtmlFile) {
            case '/purchased.html':
                navBar.purchased.aOrDiv = 'div';
                navBar.purchased.href = '';
                break;
            case '/cart.html':
                navBar.cart.aOrDiv = 'div';
                navBar.cart.href = '';
                break;
            case '/stores.html':
                navBar.storesList.aOrDiv = 'div';
                navBar.storesList.href = '';
                break;
            case '/store.html':
                if (storeUuid === 'mall') {
                    navBar.mall.aOrDiv = 'div';
                    navBar.mall.href = '';
                }
                break;
        }
        var shopperHeaderElementsHtml = "<" + navBar.cart.aOrDiv + navBar.cart.href + " class=\"header__item header__item--cart\">\n            " + navBar.cart.innerHTML + "\n        </" + navBar.cart.aOrDiv + ">\n\n        <" + navBar.purchased.aOrDiv + navBar.purchased.href + " class=\"header__item header__item--purchased\">\n            <img src=\"./images/history-cart.png\" title=\"Purchased carts\" />\n        </" + navBar.purchased.aOrDiv + ">\n        \n        <" + navBar.mall.aOrDiv + navBar.mall.href + " class=\"header__item header__item--mall\">\n            <img src=\"./images/mall.png\" title=\"Virtual mall\" />\n        </" + navBar.mall.aOrDiv + ">\n        \n        <" + navBar.storesList.aOrDiv + navBar.storesList.href + " class=\"header__item header__item--stores-list\">\n            <img src=\"./images/stores-list.png\" title=\"Stores list\" />\n        </" + navBar.storesList.aOrDiv + ">";
        var headerCartElement = document.querySelector('.header__item--cart');
        if (headerCartElement) {
            headerCartElement.innerHTML = "" + navBar.cart.innerHTML;
        }
        else {
            var headerTitleElement = document.querySelector('.header__item--h1');
            headerTitleElement.insertAdjacentHTML("afterend", shopperHeaderElementsHtml);
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
var logoutBtn = document.querySelector('#logout');
logoutBtn.addEventListener('click', function (ev) { return logout(ev); });
function logout(ev) {
    try {
        if (isCartEmpty === true) {
            bye();
        }
        else {
            swal({
                title: "You have items in your cart!",
                text: "Your cart will be saved, but we can't promise the products will stay in stock",
                icon: "warning",
                buttons: ['Logout anyway', 'Go to Cart']
            }).then(function (willGoToCart) {
                if (willGoToCart)
                    window.location.href = "./cart.html";
                else {
                    bye();
                }
            });
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
function bye() {
    var _this = this;
    try {
        swal({
            title: "Bye!",
            text: "Hope to see you again soon!",
            buttons: ["Mmm... Stay", "Byeee"],
            dangerMode: true
        }).then(function (willLogout) { return __awaiter(_this, void 0, void 0, function () {
            var doLogout, username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!willLogout) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios.get('/user/logout')];
                    case 1:
                        doLogout = _a.sent();
                        username = doLogout.data.username;
                        swal(username + ", you are now logged out \uD83D\uDD90", {
                            icon: "success",
                            button: "🖐"
                        }).then(function () { window.location.href = '/'; });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    catch (error) {
        console.error(error.message);
    }
}
var asyncScripts = document.getElementsByClassName('async-script');
function asyncScriptFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, asyncScripts_1, asyncScript, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUserDetails()];
                case 1:
                    _a.sent();
                    for (_i = 0, asyncScripts_1 = asyncScripts; _i < asyncScripts_1.length; _i++) {
                        asyncScript = asyncScripts_1[_i];
                        asyncScript.setAttribute('src', asyncScript.getAttribute('data-src'));
                        asyncScript.removeAttribute('data-src');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
asyncScriptFiles();
