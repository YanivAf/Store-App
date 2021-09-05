const whichHtmlFile: string = window.location.pathname;

async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        const { user, isAdmin } = userDetails.data;

        const isCartEmpty: boolean = renderUserDetails(user, isAdmin);

        if ((!isAdmin) && (isCartEmpty === false) && (whichHtmlFile === '/store.html')) {
            swal({
                title: `You have items in your cart!`,
                text: `What do you wanna do?`,
                buttons: ['More Shopping', 'Go to Cart'],
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

        let additionalHeaderElementsHtml: string = '';
        let isCartEmpty: boolean;
        cartProductsToRender = user.cart;

        if (!isAdmin) {
            const shopperCart: any = renderShopperCart(cartProductsToRender);
            isCartEmpty = shopperCart.isCartEmpty;
        } else {
            const navBar: any = { store: { aOrDiv: 'a', href: ` href="./store.html?storeUuid=${user.stores[0]}"` } }
            let addProductHtml: string = '';
            
            if (whichHtmlFile === '/store.html') {
                addProductHtml = `
                <a href="#add-product-form" class="header__item header__item--add-product" title="Add new product">
                    <img src="./images/add-product.png" title="Add new product" />
                </a>`;
                navBar.store.aOrDiv = 'div';
                navBar.store.href = '';
            }
    
            additionalHeaderElementsHtml = `
            <${navBar.store.aOrDiv}${navBar.store.href} class="header__item header__item--store">
                <img src="./images/store.png" title="Your store" />
            </${navBar.store.aOrDiv}>
            ${addProductHtml}`;
            }
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

        const navBar: any = {
            purchased: { aOrDiv: 'a', href: ' href="./purchased.html"' },
            cart: { aOrDiv: 'a', href: ' href="./cart.html"', },
            storesList: { aOrDiv: 'a', href: ' href="./stores.html"' },
            mall: { aOrDiv: 'a', href: ' href="./store.html?storeUuid=mall"' }
        }

        navBar.cart.innerHTML = (inCartSum > 0) ?
        `<img id="cart" src="./images/full-cart.png" title="Cart" />
        <div id="in-cart">
            ${inCartSum}
        </div>`
        :
        `<img id="cart" src="./images/empty-cart.png" title="Cart" />`;

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
                navBar.storesList.aOrDiv = 'div';
                navBar.storesList.href = '';
                break;
            case '/store.html':
                navBar.mall.aOrDiv = 'div';
                navBar.mall.href = '';
                break;
        }

        const shopperHeaderElementsHtml: string =
        `<${navBar.cart.aOrDiv}${navBar.cart.href} class="header__item header__item--cart">
            ${navBar.cart.innerHTML}
        </${navBar.cart.aOrDiv}>

        <${navBar.purchased.aOrDiv}${navBar.purchased.href} class="header__item header__item--history">
            <img src="./images/history-cart.png" title="Purchase history" />
        </${navBar.purchased.aOrDiv}>
        
        <${navBar.mall.aOrDiv}${navBar.mall.href} class="header__item header__item--mall">
            <img src="./images/mall.png" title="Virtual mall" />
        </${navBar.mall.aOrDiv}>
        
        <${navBar.storesList.aOrDiv}${navBar.storesList.href} class="header__item header__item--stores-list">
            <img src="./images/stores-list.png" title="Stores list" />
        </${navBar.storesList.aOrDiv}>`;

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
