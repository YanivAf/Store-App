async function exampleGetFunction() {
    try {
    const exampleGet: any = await axios.get(`/`);
    const { h1Text, message } = exampleGet.data;
    const h1: HTMLElement = document.querySelector('main-heading');
    h1.innerHTML = h1Text;
    alert(message);

    } catch (error) {
        console.error(error.message);
    }
}

exampleGetFunction();