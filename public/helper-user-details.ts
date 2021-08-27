
async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        console.log(userDetails);
        const { username, cart, purchased } = userDetails.data;
        const usernameElement: HTMLElement = document.querySelector('.header__item--h4');
        usernameElement.innerText = username;
        
        const whichHtmlFile: string = window.location.pathname;
        switch (whichHtmlFile) {
            case '/store.html':
                renderStoreDetails();
                if (!cart) { // ADMIN
                    // on top - render add product button 
                } else { // SHOPPER
                    // on top - render cart logo
                }
                break;
            case '/stores.html':

                break;
        } 
        
    } catch (error) {
        console.error(error.message);
    }
}

getUserDetails();