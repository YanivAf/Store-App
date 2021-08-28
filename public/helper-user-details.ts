
async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        console.log(userDetails);
        const { username, cart, purchased } = userDetails.data;
        const usernameElement: HTMLElement = document.querySelector('.header__item--h4');
        usernameElement.innerText = `Logged in as ${username}`;
        
        const headerTitleElement: HTMLElement = document.querySelector('.header__item--h1');
        const whichHtmlFile: string = window.location.pathname;
        let aOrDivPurchased: string = 'a';
        let aOrDivCart: string = 'a';
        let hrefPurchased: string = ' href="./purchased.html"';
        let hrefCart: string = ' href="./cart.html"';
        switch (whichHtmlFile) {
            case '/purchased.html':
                aOrDivPurchased = 'div';
                hrefPurchased = '';
                break;
            case '/cart.html':
                aOrDivCart = 'div';
                hrefCart = '';
                break;
        } 

        const additionalHeaderElementsHtml: string = (!cart) ? 
        `<div class="header__item header__item--add-product" title="Add new product">+</div>`
        :
        `<${aOrDivCart}${hrefCart} class="header__item header__item--cart">
            <img src="./images/full-cart.png" title="cart" />
            <div>
                1
            </div>
        </${aOrDivCart}>

        <${aOrDivPurchased}${hrefPurchased} class="header__item header__item--history">
            <img src="./images/history-cart.png" title="purchase history" />
        </${aOrDivPurchased}>`;
        headerTitleElement.insertAdjacentHTML("afterend",additionalHeaderElementsHtml);
        
    } catch (error) {
        console.error(error.message);
    }
}

getUserDetails();