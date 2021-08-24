const registerForm: HTMLFormElement = document.querySelector('#register-form');

registerForm.addEventListener('submit',register);

async function register(ev) {
    try {
        ev.preventDefault();
        let {email, username, password} = ev.target.elements;
        email = email.value;
        username = username.value;
        password = password.value;
        const isAdmin: boolean = (window.location.href.indexOf('shopper') === -1) ? true : false;
        ev.target.reset();

        const registerUser = await axios.post('/user/register', {email, username, password, isAdmin});
        const { title, text, isRegistered } = registerUser.data;    

        if (isRegistered) {
            swal({
                title: title,
                text: text,
                icon: "success",
                button: "Lets go",
            })
            .then( () => { window.location.href = (isAdmin) ? './store.html' : './stores.html'; });
        } else {
            swal({
                title: `Ops.. ${title}`,
                text: text,
                icon: "warning",
                button: "Try again",
            });
        }

    } catch (error) {
        console.error(error.message);
    }
}