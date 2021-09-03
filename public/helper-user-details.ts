async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        const { user, isAdmin } = userDetails.data;

        const isCartEmpty: boolean = renderUserDetails(user, isAdmin);

        if ((!isAdmin) && (isCartEmpty === false)) {
            swal({
                title: `You have items in your cart!`,
                text: `What do you wanna do?`,
                buttons: ["More Shopping", 'Go to Cart'],
            }).then((willGoToCart) => {
                if (willGoToCart) window.location.href = `./cart.html`;
            });
        }
                
    } catch (error) {
        console.error(error.message);
    }
}

getUserDetails();

let cartProductsToRender: Array<any>;

function renderUserDetails(user: any, isAdmin: boolean) {
    try {
        const usernameElement: HTMLElement = document.querySelector('.header__item--username');
        usernameElement.innerText = `Logged in as ${user.username}`;

        let additionalHeaderElementsHtml: string;
        let isCartEmpty: boolean;
        cartProductsToRender = user.cart;

        if (!isAdmin) {
            const shopperCart: any = renderShopperCart(cartProductsToRender);
            isCartEmpty = shopperCart.isCartEmpty;
        } else {
            additionalHeaderElementsHtml = `<div class="header__item header__item--add-product" title="Add new product">+</div>`;
            const headerTitleElement: HTMLElement = document.querySelector('.header__item--h1');
            headerTitleElement.insertAdjacentHTML("afterend",additionalHeaderElementsHtml);
        }

        return isCartEmpty;

    } catch (error) {
        console.error(error.message);
    }
}

function renderShopperCart(cartProducts: Array<any>) {
    try {

        const inCartSum: number = cartProducts.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
        const isCartEmpty: boolean = (inCartSum > 0) ? false : true;

        const whichHtmlFile: string = window.location.pathname;
        const navBar: any = {
            purchased: { aOrDiv: 'a', href: ' href="./purchased.html"' },
            cart: { aOrDiv: 'a', href: ' href="./cart.html"', },
            stores: { aOrDiv: 'a', href: ' href="./stores.html"' }
        }

        navBar.cart.innerHTML = (inCartSum > 0) ?
        `<img id="cart" src="./images/full-cart.png" title="cart" />
        <div id="in-cart">
            ${inCartSum}
        </div>`
        :
        `<img id="cart" src="./images/empty-cart.png" title="cart" />`;

        switch (whichHtmlFile) {
            case '/purchased.html':
                navBar.purchased.aOrDiv = 'div';
                navBar.purchased.href = '';
                break;
            case '/cart.html':
                navBar.cart.aOrDiv = 'div';
                navBar.cart.href = '';
                break;
            case '/stores.html':
                navBar.stores.aOrDiv = 'div';
                navBar.stores.href = '';
                break;
        }

        const shopperHeaderElementsHtml: string =
        `<${navBar.cart.aOrDiv}${navBar.cart.href} class="header__item header__item--cart">
            ${navBar.cart.innerHTML}
        </${navBar.cart.aOrDiv}>

        <${navBar.purchased.aOrDiv}${navBar.purchased.href} class="header__item header__item--history">
            <img src="./images/history-cart.png" title="purchase history" />
        </${navBar.purchased.aOrDiv}>
        
        <${navBar.stores.aOrDiv}${navBar.stores.href} class="header__item header__item--mall">
            <img src="./images/mall.png" title="virtual mall" />
        </${navBar.stores.aOrDiv}>`;
        console.log(shopperHeaderElementsHtml);
        const headerCartElement: HTMLElement = document.querySelector('.header__item--cart');
        if (headerCartElement) {
            headerCartElement.innerHTML = `${navBar.cart.innerHTML}`;
        } else {
            const headerTitleElement: HTMLElement = document.querySelector('.header__item--h1');
            headerTitleElement.insertAdjacentHTML("afterend",shopperHeaderElementsHtml);
        }

        return { isCartEmpty };

    } catch (error) {
        console.error(error.message);
    }
}

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
