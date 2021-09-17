const whichHtmlFile: string = window.location.pathname;
const url = new URL(window.location.href);

let storeUuid: string;
let productUuid = url.searchParams.get("productUuid");
let isAdmin: boolean;
let shippingAddress: string;

async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        const { user, isUserAdmin } = userDetails.data;

        isAdmin = isUserAdmin;
        storeUuid = (isAdmin) ? user.stores[0] : url.searchParams.get("storeUuid");
        shippingAddress = user.shippingAddress;
        renderUserDetails(user, isAdmin);
                
    } catch (error) {
        console.error(error.message);
    }
}

getUserDetails();

let isCartEmpty: boolean = true;
let cartProductsToRender: Array<any>;
let purchasedCartsToRender: Array<any>;

function renderUserDetails(user: any, isAdmin: boolean) {
    try {
        const usernameElement: HTMLElement = document.querySelector('.header__item--username');
        usernameElement.innerText = `Logged in as ${user.username}`;

        let additionalHeaderElementsHtml: string = '';
        cartProductsToRender = user.cart;
        purchasedCartsToRender = user.purchasedCarts;

        if (!isAdmin) {
            renderShopperCart(cartProductsToRender);
            isCartEmpty = (user.cart.length === 0) ? true : false;
        } else {
            const navBar: any = { store: { aOrDiv: 'a', href: ` href="./store.html?storeUuid=${storeUuid}"` } }
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

    } catch (error) {
        console.error(error.message);
    }
}

function renderShopperCart(cartProducts: Array<any>) {
    try {

        const inCartSum: number = cartProducts.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);

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
                if (storeUuid === 'mall') {
                    navBar.mall.aOrDiv = 'div';
                    navBar.mall.href = '';
                }
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

    } catch (error) {
        console.error(error.message);
    }
}

const logoutBtn: HTMLElement = document.querySelector('#logout');

logoutBtn.addEventListener('click', ev => logout(ev));

function logout(ev: any) {
    try {
        if (isCartEmpty === true) {
            bye();
        } else {
            swal({
                title: `You have items in your cart!`,
                text: `What do you wanna do?`,
                buttons: ['Logout anyway', 'Go to Cart'],
            }).then((willGoToCart) => {
                if (willGoToCart) window.location.href = `./cart.html`;
                else {
                    bye();
                }
            });
        }
    
    } catch (error) {
    console.error(error.message);
    }
}

function bye() {
    try {
        swal({
            title: `Bye!`,
            text: `Hope to see you again soon!`,
            buttons: ["Mmm... Stay", "Byeee"],
            dangerMode: true
        }).then( async (willLogout) => {
            if (willLogout) {
                const doLogout = await axios.get('/user/logout');
                const { username } = doLogout.data;
                swal(`${username}, you are now logged out 🖐`, {
                    icon: "success",
                    button: "🖐"
                }).then( () => { window.location.href = '/'; });
            }
        })

    } catch (error) {
        console.error(error.message);
    }
}

const asyncScripts: HTMLCollection = document.getElementsByClassName('async-script');

for (const asyncScript of asyncScripts){
    asyncScript.setAttribute('src', asyncScript.getAttribute('data-src'));
    asyncScript.removeAttribute('data-src');
 }