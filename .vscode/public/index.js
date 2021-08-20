ansync;
var exampleGetFunction = function () {
    try {
        var exampleGet = yield axios.get("/example/");
    }
    catch (error) {
    }
};
