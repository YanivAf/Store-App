"use strict";
exports.__esModule = true;
exports.productSchema = void 0;
exports.productSchema = {
    type: "object",
    properties: {
        storeUuid: { type: "string", minLength: 36, maxLength: 36 },
        productName: { type: "string", pattern: '^[a-zA-Z0-9&() ]{2,40}$' },
        productDescription: { type: "string", minLength: 10, maxLength: 500 },
        productPrice: { type: "number", minimum: 0, maximum: 5000 },
        productInStock: { type: "number", minimum: 0, maximum: 300 }
    },
    required: ["productName", "productDescription", "productPrice", "productInStock"],
    additionalProperties: false
};
