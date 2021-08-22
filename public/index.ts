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

const loginForm: HTMLFormElement = document.querySelector('#admin-login-form');

loginForm.addEventListener('submit',adminLogin);

async function adminLogin(ev) {
    try {
        ev.preventDefault();
        let {email, password} = ev.target.elements;
        email = email.value;
        password = password.value;
        ev.target.reset();
        
        const loginUser = await axios.post('/user/admin/login', { email, password });
        console.log(loginUser);

        window.location.href = './admin-panel.html'
    
    } catch (error) {
        console.error(error.message);
    }
}