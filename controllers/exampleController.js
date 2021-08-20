"use strict";
exports.__esModule = true;
exports.exampleControllerFunction = void 0;
function exampleControllerFunction(req, res) {
    try {
        res.send({ message: "hello world" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.exampleControllerFunction = exampleControllerFunction;
