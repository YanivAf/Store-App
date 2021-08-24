window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var title;
    var text;
    switch (error.response.status) {
        case 401:
            title = "Authorization Issue";
            text = error.response.data.message;
            break;
        case 500:
            title = "Server Request Issue";
            text = error.response.data;
            break;
    }
    if (error.response.status) {
        swal({
            title: title,
            text: text,
            icon: "warning",
            button: "Back Home",
            closeModal: false
        }).then(function () {
            window.location.href = './';
        });
    }
    else {
        return Promise.reject(error);
    }
});
