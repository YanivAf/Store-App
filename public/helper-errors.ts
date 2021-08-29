window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let title: string;
    let text: string = error.response.data.message;

    switch (error.response.status) {
        case 401:
            title = "Authorization Issue";
            break;
        case 403:
            title = "Permissions Issue";
            break;
        case 404:
            title = "Not Found";
            break;
        case 409:
            title = "Registration Issue";
            break;    
        case 500:
            title = "Server Request Issue";
            text = error.response.data;
            break;
    }
    if (error.response.status) {
        if ((error.response.status === 401) && ((window.location.pathname === '/') || (window.location.pathname === '/index.html'))) return;
        if (error.response.status !== 409) {
            swal({
                title,
                text,
                icon: "warning",
                button: "Back Home",
                closeModal: false
            }).then(() => {
                window.location.href = './';
            });
        } else {
            swal({
                title: `Ops.. ${title}`,
                text,
                icon: "warning",
                button: "Try again",
            });
        }
    } else {
        return Promise.reject(error);
    }
});