"use strict";
exports.__esModule = true;
exports.validateBody = void 0;
var Ajv = require("ajv");
var ajv = new Ajv();
var addFormats = require("ajv-formats");
addFormats(ajv);
function validateBody(schema) {
    try {
        return function (req, res, next) {
            try {
                var valid = ajv.validate(schema, req.body);
                if (!valid) {
                    res.status(409).send("The data you enter doesn't comply with the requirements. Please verify and try again.");
                    return;
                }
                next();
            }
            catch (error) {
                console.error(error.message);
                res.status(500).send(error.message);
            }
        };
    }
    catch (error) {
        console.error(error.message);
    }
}
exports.validateBody = validateBody;
