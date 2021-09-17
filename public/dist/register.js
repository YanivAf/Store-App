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
var registerForm = document.querySelector("#register-form");
registerForm.addEventListener("submit", register);
function register(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, username, password, passwordVerify, adminRegisterForm_1, passRegExRule, passRegEx, registerUser, _b, title, text, storeUuid_1, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    ev.preventDefault();
                    _a = ev.target.elements, email = _a.email, username = _a.username, password = _a.password, passwordVerify = _a.passwordVerify;
                    email = email.value;
                    username = username.value;
                    password = password.value;
                    passwordVerify = passwordVerify.value;
                    adminRegisterForm_1 = window.location.href.indexOf("shopper") === -1 ? true : false;
                    passRegExRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    passRegEx = new RegExp(passRegExRule, "gm");
                    if (!passRegEx.test(password)) {
                        swal({
                            title: 'Password Not Secured Enough',
                            text: "Your password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character. Please try again",
                            icon: "warning",
                            button: "Try again"
                        });
                        throw new Error('Password Not Secured Enough, please try again');
                    }
                    if (password != passwordVerify) {
                        swal({
                            title: 'Password Verification Issue',
                            text: "Your entered different passwords, please try again",
                            icon: "warning",
                            button: "Try again"
                        });
                        throw new Error('Password Verification Issue, please try again');
                    }
                    ev.target.reset();
                    return [4 /*yield*/, axios.post("/user/register", {
                            email: email,
                            username: username,
                            password: password,
                            adminRegisterForm: adminRegisterForm_1
                        })];
                case 1:
                    registerUser = _c.sent();
                    _b = registerUser.data, title = _b.title, text = _b.text, storeUuid_1 = _b.storeUuid;
                    swal({
                        title: title,
                        text: text,
                        icon: "success",
                        button: "Lets go"
                    }).then(function () {
                        window.location.href = adminRegisterForm_1
                            ? "./store.html?storeUuid=" + storeUuid_1
                            : "./store.html?storeUuid=all";
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
