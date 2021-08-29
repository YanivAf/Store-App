

export const userSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: 'email' },
        username: { type: "string", minLength: 2, maxLength: 20 },
        password: { type: "string", minLength: 6, maxLength: 8 },
        adminRegisterForm: { type: "boolean" },
        adminLoginForm: { type: "boolean" },
    },
    required: ["email", "password"],
    additionalProperties: false
}
