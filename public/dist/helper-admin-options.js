var readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector('#productImg').setAttribute("src", "" + e.target.result);
            return e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};
