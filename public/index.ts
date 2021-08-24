async function welcome() {
    try {
    const userWelcome: any = await axios.get(`/user/welcome`);
    const { h1Text, message } = userWelcome.data;
    const h1: HTMLElement = document.querySelector('.header__item--h1');
    h1.innerHTML = h1Text;
    swal({
        title: `Welcome to ${h1Text}!`,
        text: message,
        button: "Start Shopping!",
    });

    } catch (error) {
        console.error(error.message);
    }
}

welcome();

const adminLoginForm: HTMLFormElement = document.querySelector('#admin-login-form');
const shopperLoginForm: HTMLFormElement = document.querySelector('#shopper-login-form');

adminLoginForm.addEventListener('submit',login);
shopperLoginForm.addEventListener('submit',login);

async function login(ev) {
    try {
        ev.preventDefault();
        let {email, password} = ev.target.elements;
        email = email.value;
        password = password.value;
        const isAdmin: boolean = (ev.target.getAttribute('id').indexOf('shopper') === -1) ? true : false;
        ev.target.reset();
        
        const loginAdminUser = await axios.post('/user/login', { email, password, isAdmin });
        const { title, text, isLoggedIn } = loginAdminUser.data;
        
        if (isLoggedIn) {
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