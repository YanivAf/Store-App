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
var updateProductForm;
var addProductForm;
var url = new URL(window.location.href);
var productUuidParams;
if (whichHtmlFile === '/product.html') {
    productUuidParams = url.searchParams.get("productUuid");
    updateProductForm = document.querySelector('#edit-product-form');
    updateProductForm.addEventListener('submit', function (ev) { return updateProduct(ev); });
}
else if (whichHtmlFile === '/store.html') {
    addProductForm = document.querySelector('#add-product-form');
    addProductForm.addEventListener('submit', function (ev) { return addProduct(ev); });
}
function updateProduct(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, productName, productDescription, productPrice, productInStock, fd, imageInput, productImage, productUuid, error_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    ev.preventDefault();
                    _a = ev.target.elements, productName = _a.productName, productDescription = _a.productDescription, productPrice = _a.productPrice, productInStock = _a.productInStock;
                    productName = productName.value;
                    productDescription = productDescription.value;
                    productPrice = productPrice.valueAsNumber;
                    productInStock = productInStock.valueAsNumber;
                    fd = new FormData();
                    imageInput = document.querySelector('#product-image');
                    productImage = imageInput.files[0];
                    if (productImage)
                        fd.append('productImage', productImage, "" + productImage.name);
                    fd.append('productName', productName);
                    fd.append('productDescription', productDescription);
                    fd.append('productPrice', productPrice);
                    fd.append('productInStock', productInStock);
                    fd.append('storeUuid', storeUuid);
                    productUuid = productUuidParams;
                    ev.target.reset();
                    return [4 /*yield*/, axios.put("/store/product/" + productUuid, fd)];
                case 1:
                    _b.sent();
                    swal({
                        title: 'Congrats!',
                        text: productName + " was updated successfully!",
                        icon: "success",
                        button: "Cool"
                    }).then(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        window.location.href = "./store.html?storeUuid=" + storeUuid;
                        return [2 /*return*/];
                    }); }); });
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
function addProduct(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, productName, productDescription, productPrice, productInStock, fd, imageInput, productImage, productUuid, addProductToStore, store, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    ev.preventDefault();
                    _a = ev.target.elements, productName = _a.productName, productDescription = _a.productDescription, productPrice = _a.productPrice, productInStock = _a.productInStock;
                    productName = productName.value;
                    productDescription = productDescription.value;
                    productPrice = productPrice.valueAsNumber;
                    productInStock = productInStock.valueAsNumber;
                    fd = new FormData();
                    imageInput = document.querySelector('#product-image');
                    productImage = imageInput.files[0];
                    if (productImage)
                        fd.append('productImage', productImage, "" + productImage.name);
                    fd.append('productName', productName);
                    fd.append('productDescription', productDescription);
                    fd.append('productPrice', productPrice);
                    fd.append('productInStock', productInStock);
                    fd.append('storeUuid', storeUuid);
                    productUuid = productUuidParams;
                    ev.target.reset();
                    return [4 /*yield*/, axios.post("/store/addProduct", fd)];
                case 1:
                    addProductToStore = _b.sent();
                    store = addProductToStore.data.store;
                    swal({
                        title: 'Congrats!',
                        text: productName + " was added to your store!",
                        icon: "success",
                        button: "Cool"
                    });
                    renderStore(store, true);
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
function deleteProduct(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var cancelDelete, productUuid, productNameElement, productName, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, swal({
                            title: "Delete from Store",
                            text: "Are you sure?",
                            icon: "warning",
                            dangerMode: true,
                            buttons: ['Nope', 'Yup']
                        })];
                case 1:
                    cancelDelete = _a.sent();
                    if (!cancelDelete)
                        return [2 /*return*/];
                    productUuid = productUuidParams;
                    productNameElement = document.querySelector('#product-name');
                    productName = productNameElement.innerText;
                    return [4 /*yield*/, axios["delete"]("/store/product/" + productUuid)];
                case 2:
                    _a.sent();
                    swal({
                        title: 'Done!',
                        text: productName + " was deleted from your store!",
                        icon: "success",
                        button: "Cool"
                    }).then(function () { window.location.href = "./store.html?storeUuid=" + storeUuid; });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (ev) {
            document.querySelector('#product-preview').setAttribute("src", "" + ev.target.result);
            return ev.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};
