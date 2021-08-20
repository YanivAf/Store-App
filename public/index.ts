async function serverAPIs() {
    try {
    const userWelcome: any = await axios.get(`/user/welcome`);
    const { h1Text, message } = userWelcome.data;
    const h1: HTMLElement = document.querySelector('#main-heading');
    h1.innerHTML = h1Text;
    alert(message);

    const userRegister: any = await axios.post(`/user/register`);
    const { register } = userRegister.data;
    alert(`register: ${register}`);

    } catch (error) {
        console.error(error.message);
    }
}

serverAPIs();