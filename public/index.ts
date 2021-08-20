async function serverAPIs() {
    try {
    const userWelcome: any = await axios.get(`/user/welcome`);
    const { h1Text, message } = userWelcome.data;
    const h1: HTMLElement = document.querySelector('#main-heading');
    h1.innerHTML = h1Text;
    swal("Welcome!", message, "success");

    } catch (error) {
        console.error(error.message);
    }
}

serverAPIs();

const registerForm: HTMLFormElement = document.querySelector('#register-form');
const loginForm: HTMLFormElement = document.querySelector('#login-form');

registerForm.addEventListener('submit',register);
loginForm.addEventListener('submit',login);

async function login(ev) {
    try {
        ev.preventDefault();
        let {username, password} = ev.target.elements;
        username = username.value;
        password = password.value;
        ev.target.reset();
        
        const loginUser = await axios.post('/user/login', { username, password });
        console.log(loginUser);

        window.location.href = './admin-panel.html'
    
    } catch (error) {
        console.error(error.message);
    }
}

async function register(ev) {
    try {
        ev.preventDefault();
        let {username, password} = ev.target.elements;
        username = username.value;
        password = password.value;
        ev.target.reset();
    
        const registerUser = await axios.post('/user/register', {username, password});
        console.log(registerUser);    

    } catch (error) {
        console.error(error.message);
    }
}