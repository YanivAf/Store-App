const registerForm: HTMLFormElement = document.querySelector('#register-form');

registerForm.addEventListener('submit',register);

async function register(ev) {
    try {
        ev.preventDefault();
        let {email, username, password} = ev.target.elements;
        email = email.value;
        username = username.value;
        password = password.value;
        const adminRegisterForm: boolean = (window.location.href.indexOf('shopper') === -1) ? true : false;
        ev.target.reset();

        const registerUser = await axios.post('/user/register', {email, username, password, adminRegisterForm});
        const { title, text, storeUuid, isRegistered } = registerUser.data;    

        swal({
            title: title,
            text: text,
            icon: "success",
            button: "Lets go",
        })
        .then( () => { window.location.href = (adminRegisterForm) ? `./store.html?storeUuid=${storeUuid}` : './stores.html'; });

    } catch (error) {
        console.error(error.message);
    }
}