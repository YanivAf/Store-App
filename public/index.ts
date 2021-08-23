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

loginForm.addEventListener('submit',login);

async function login(ev) {
    try {
        ev.preventDefault();
        let {email, password} = ev.target.elements;
        email = email.value;
        password = password.value;
        ev.target.reset();
        
        const login = await axios.post('/user/login', { email, password });
        const { isAdmin } = login.data;
        
        window.location.href = (isAdmin) ? './admin-panel.html' : './store.html'; 
    
    } catch (error) {
        console.error(error.message);
    }
}