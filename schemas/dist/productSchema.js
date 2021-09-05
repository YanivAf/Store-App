"use strict";
exports.__esModule = true;
exports.userSchema = void 0;
exports.userSchema = {
    type: "object",
    properties: {
        storeUuid: { type: "string", minLength: 36, maxLength: 36 },
        productName: { type: "string", pattern: '^[a-zA-Z&() ]{2,40}$' },
        productDescription: { type: "string", minLength: 10, maxLength: 500 },
        productPrice: { type: "number", min: 0, max: 5000 },
        productImage: { type: "string" },
        productInStock: { type: "number", min: 0, max: 300 }
    },
    required: ["productName", "productDescription", "productPrice", "productImage", "inStock"],
    additionalProperties: false
};
