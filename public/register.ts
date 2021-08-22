const registerForm: HTMLFormElement = document.querySelector('#register-form');

registerForm.addEventListener('submit',register);

async function register(ev) {
    try {
        ev.preventDefault();
        let {username, password} = ev.target.elements;
        username = username.value;
        password = password.value;
        ev.target.reset();
    
        const registerUser = await axios.post('/user/admin/register', {username, password});
        console.log(registerUser);    

    } catch (error) {
        console.error(error.message);
    }
}