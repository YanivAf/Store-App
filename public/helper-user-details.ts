async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        const { username, cart, purchased } = userDetails.data;
        const usernameElement: HTMLElement = document.querySelector('.header__item--username');
        usernameElement.innerText = `Logged in as ${username}`;
        
        const headerTitleElement: HTMLElement = document.querySelector('.header__item--h1');
        const whichHtmlFile: string = window.location.pathname;
        let aOrDivPurchased: string = 'a';
        let aOrDivCart: string = 'a';
        let aOrDivStores: string = 'a';
        let hrefPurchased: string = ' href="./purchased.html"';
        let hrefCart: string = ' href="./cart.html"';
        let hrefStores: string = ' href="./stores.html"';
        switch (whichHtmlFile) {
            case '/purchased.html':
                aOrDivPurchased = 'div';
                hrefPurchased = '';
                break;
            case '/cart.html':
                aOrDivCart = 'div';
                hrefCart = '';
                break;
            case '/stores.html':
                aOrDivStores = 'div';
                hrefStores = '';
                break;
        } 

        const additionalHeaderElementsHtml: string = (!cart) ? 
        `<div class="header__item header__item--add-product" title="Add new product">+</div>`
        :
        `<${aOrDivCart}${hrefCart} class="header__item header__item--cart">
            <img id="cart" src="./images/full-cart.png" title="cart" />
            <div id="in-cart">
                1
            </div>
        </${aOrDivCart}>

        <${aOrDivPurchased}${hrefPurchased} class="header__item header__item--history">
            <img src="./images/history-cart.png" title="purchase history" />
        </${aOrDivPurchased}>
        
        <${aOrDivStores}${hrefStores} class="header__item header__item--mall">
            <img src="./images/mall.png" title="all stores" />
        </${aOrDivStores}>`;

        headerTitleElement.insertAdjacentHTML("afterend",additionalHeaderElementsHtml);
        
    } catch (error) {
        console.error(error.message);
    }
}

getUserDetails();

const logoutBtn: HTMLElement = document.querySelector('#logout');

logoutBtn.addEventListener('click', ev => logout(ev));

function logout(ev: any) {
  try {
      swal({
          title: `Bye!`,
          text: `Hope to see you again soon!`,
          buttons: ["Stay", "Byeee"],
          dangerMode: true
        }).then( async (willLogout) => {
            if (willLogout) {
                const doLogout = await axios.get('/user/logout');
                const { username } = doLogout.data;
                swal(`${username}, you are now logged out 🖐`, {
                    icon: "success",
                    button: "🖐"
                }).then( () => {window.location.href = '/';});
            }
        });

    } catch (error) {
    console.error(error.message);
    }
}
