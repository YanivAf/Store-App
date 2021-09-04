"use strict";
exports.__esModule = true;
exports.userSchema = void 0;
exports.userSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: 'email' },
        username: { type: "string", pattern: '^[a-zA-Z ]{2,40}$' },
        password: { type: "string", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" },
        adminRegisterForm: { type: "boolean" },
        adminLoginForm: { type: "boolean" }
    },
    required: ["email", "password"],
    additionalProperties: false
};
