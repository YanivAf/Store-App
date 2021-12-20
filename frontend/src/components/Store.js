import { useState, useContext, useEffect } from 'react'
import { AppContext } from "../components/AppContext"
import '../styles/dist/style.min.css';
import axios from 'axios'



function Store() {

const [storeName, setStoreName] = useState('')
const [products, setProducts] = useState([])


const [store, setStore] = useState({})
const [stores, setStores] = useState({})
const [cartProductsToRender, setCartProductsToRender] = useState([])
const [shopperPurchasedCartsToRender, setShopperPurchasedCartsToRender] = useState([])
const [isCartEmpty, setIsCartEmpty] = useState(true)
const [savedProducts, setSavedProducts] = useState([])
const [lovedProducts, setLovedProducts] = useState([])
const [cartSum, setCartSum] = useState(0)

const { isLogin, setIsLogin, isCustomerSignUp, setIsCustomerSignUp, storeID, isAdmin, setIsAdmin, user, setUser } = useContext(AppContext)



async function getUserDetails() {
    try {
        const userDetails = await axios.get('/user/details');
        const { user, isUserAdmin } = userDetails.data;
        setUser(user)
        setIsAdmin(isUserAdmin);
        setCartProductsToRender(user.cart)


        if (!isUserAdmin) {
            setIsCartEmpty((user.cart.length === 0) ? true : false);
            setShopperPurchasedCartsToRender(user.purchasedCarts);

            const inCartSum= cartProductsToRender.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
            setCartSum(inCartSum)

            const navBar= {
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
    
            <${navBar.purchased.aOrDiv}${navBar.purchased.href} class="header__item header__item--purchased">
                <img src="./images/history-cart.png" title="Purchased carts" />
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


            setSavedProducts(user.savedForLater);
            setLovedProducts(user.loved);
        } 
        


                        renderUserDetails(user, isAdmin);
                
    } catch (error) {
        console.error(error.message);
    }
}




function renderShopperCart(cartProductsToRender) {
    try {

        const inCartSum= cartProductsToRender.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);

        const navBar= {
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

        <${navBar.purchased.aOrDiv}${navBar.purchased.href} class="header__item header__item--purchased">
            <img src="./images/history-cart.png" title="Purchased carts" />
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
                text: `Your cart will be saved, but we can't promise the products will stay in stock`,
                icon: "warning",
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











async function getStore() { 
    try {
        const getStoreDetails = await axios.get(`http://localhost:555/store/${storeID}`);
        const { stores, store } = getStoreDetails.data;
        setStores(stores)
        setStore(store)

        if (stores) {
            setStoreName('Virtual Mall');
            const productsLoading = [];
            await stores.stores.forEach(store => {productsLoading = productsLoading.concat(store.products)});
            setProducts(productsLoading)
        } else {
            setStoreName(store.storeName);
            setProducts(store.products);
        }
        
        renderStore(stores, store, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

useEffect(()=>{
    getStore()
},[])



function renderStore(stores, store, isAdmin) {
    try {

        // if (stores) {
        //     setStoreName('Virtual Mall');
        //     products = [];
        //     stores.stores.forEach(store => {products = products.concat(store.products)});
        // } else {
        //     storeName = store.storeName;
        //     products = store.products;
        // }

        // const storeNameElement = document.querySelector('.main__item--store-name');
        // storeNameElement.innerText = storeName;
        
        // const pageTitle = document.querySelector('title');
        // pageTitle.innerText = storeName;
        
        renderStoreProducts(products, cartProductsToRender, lovedProducts, isAdmin);

        const productsElement = document.querySelector('.products');
        let productsHtml;
        
        const AreThereProducts= (products.length > 0) ? true : false;
        productsHtml = (!AreThereProducts) ? 'no products to show!'
        :
        products.map((product) => {
            let buttonsByRole= ``;
            if (isAdmin) buttonsByRole =``;
            else {
                if (storeUuid) buttonsByRole = `
                <a href="./store.html?storeUuid=${product.storeUuid}" class="product-buttons__item product-buttons__item--store">
                    <i class="fas fa-store" title="Go to ${product.productName}'s store"></i>
                </a>`;

                const lovedProductIndex= lovedProducts.findIndex(lovedProduct => lovedProduct === product.productUuid);
                const isLoved = (lovedProductIndex !== -1) ? true : false;
                const lovedBtnHtml= (isLoved) ? `<i class="product-buttons__item product-buttons__item--product-loved fas fa-heart product-loved" title="Unlove ${product.productName}"></i>` : `<i class="product-buttons__item product-buttons__item--love-product far fa-heart love-product" title="Love ${product.productName}"></i>`;

                const cartProductIndex = cartProductsToRender.findIndex(cartProduct => cartProduct.productUuid === product.productUuid);
                if (cartProductIndex === -1) buttonsByRole =
                `<i class="product-buttons__item product-buttons__item--cart-add fas fa-cart-plus add-to-cart" title="Add ${product.productName} to cart"></i>
                ${lovedBtnHtml}
                ${buttonsByRole}`;
                else buttonsByRole = `
                <a href="./cart.html" class="product-buttons__item product-buttons__item--cart-added">
                    <i class="fas fa-shopping-cart" title="See ${product.productName} in your cart"></i>
                </a>
                ${lovedBtnHtml}
                ${buttonsByRole}`;
            }
            
            let inStockText;
            let inStockColor;
            const isInStock = (product.inStock > 0) ? true : false;
            if (isInStock) {
                if (isAdmin) inStockText = `${product.inStock} left`;
                else inStockText = (product.inStock > 5) ? `In Stock` : `Running Out!`;
                inStockColor = (product.inStock > 5) ? 'green' : 'orange';
            } else {
                inStockText = 'Out of Stock';
                inStockColor = 'red';
            }

            let saleTagHtml = ``;
            let salePriceHtml= ``;
            const isOnSale= (product.precentsOff > 0) ? true : false;
            if (isOnSale) {
                saleTagHtml = `<h5 class="product__item product__item--sale">${product.precentsOff}% off!</h5>`;
                salePriceHtml = `<br /><span style="font-size: 12px; color: lightgrey; text-decoration: line-through;">${(Math.round(product.productPrice * 100) / 100).toFixed(2)}$</span>`;
            }

            const soldHtml = ((product.sold < 10) && (!isAdmin)) ? '<div class="sold">New product!</div>' : `<div class="sold">${product.sold} sold</div>`;
            const lovedHtml= (!isAdmin) ? '' : `<div class="loved">${product.loved} <i class="fas fa-heart"></i></div>`;

            const productHtml= ((!isAdmin) && (!isInStock)) ? ''
            :
            `<div class="products__item product" id="${product.productUuid}">
                ${saleTagHtml}
                <h3 class="product__item product__item--name">${product.productName}</h3>
                <a href="./product.html?storeUuid=${product.storeUuid}&productUuid=${product.productUuid}" class="product__item product__item--img">
                    <img src="${product.productImage}" title="${product.productName}"/>
                </a>
                <a href="./product.html?storeUuid=${product.storeUuid}&productUuid=${product.productUuid}" title="Click for full description" class="product__item product__item--description">${product.productDescription}</a>
                <h4 class="product__item product__item--price">${(Math.round((product.productPrice - product.productPrice * (product.precentsOff / 100)) * 100) / 100).toFixed(2)}$${salePriceHtml}</h4>
                <div class="product__item product__item--stats">
                    ${soldHtml}
                    ${lovedHtml}
                </div>
                <div class="product__item product__item--stock" style="color:${inStockColor}">${inStockText}</div>
                <div class="product__item product-buttons">${buttonsByRole}</div>
                
            </div>`;
            return productHtml;
        }).join('');

        productsElement.innerHTML = productsHtml;


        // if ((!isAdmin) && (store)) {
        //     const contactStoreElement: HTMLElement = document.querySelector('#contact');
        //     contactStoreElement.setAttribute('href', `mailto:${store.contactEmail}?subject=${store.storeName} - General Inquiry`)
        //     contactStoreElement.innerHTML = `<i class="far fa-envelope" title="Contact us!"></i>`;
        // }

    } catch (error) {
        console.error(error.message);
    }
}

function renderStoreProducts(products, cartProductsToRender, lovedProducts, isAdmin) {
    try {
       

    } catch (error) {
        console.error(error.message);
    }
}

const modalElement= document.querySelector('#add-product-modal');

if (isAdmin) {
    const addProductElement = document.querySelector("#add-product");
    addProductElement.addEventListener('click', ev => renderProductForm(ev));

    const closeModalElement = document.querySelector(".close");
    closeModalElement.addEventListener('click', ev => modalElement.style.display = "none");

    window.onclick = ev => {
        if (ev.target == modalElement) {
            modalElement.style.display = "none";
        }
      }
}

function renderProductForm(ev) {
    try {
        modalElement.style.display = 'flex';
        
        const formInnerHTML = `
        <div class="product-large__item product-large__item--img">
            <img id="product-preview" src="./images/cart-wp.png">
            <input id="product-image" class="button" type="file" name="productImage" accept="image/*" onchange="readURL(this)" />
        </div>
        <div class="product-large__item details">
            <input class="details__item details__item--name" type="text" name="productName" minLength="2" maxLength="40" placeholder="Product Name" required />
            <div class="details__item details__item--sale">
                <input type="number" name="precentsOff" min="0" max="100" placeholder="% Off" />
                <label for="precentsOff">% Off</label>
            </div>
            <textarea class="details__item details__item--description" name="productDescription" minLength="10" maxLength="300" placeholder="Product Description (10-300 characters)" required></textarea>
            <div class="details__item details__item--price">
                <input type="number" name="productPrice" min="0" max="5000" placeholder="Price ($)" step=".01" pattern="^\\d+(?:\\.\\d{1,2})?$" required />
                <label for="productPrice">Price ($)</label>
            </div>
            <div class="details__item details__item--in-stock">
                <input type="number" name="productInStock" min="0" max="500" placeholder="In Stock" required />
                <label for="productInStock">In Stock</label>
            </div>        
            <input class="details__item details__item--submit button" type="submit" value="Add" />
        </div>`;

        addProductForm.innerHTML = formInnerHTML;
    } catch (error) {
        console.error(error.message);
    }
}

getStore();


  
  return (
   
    <div>
   

    <main class="main">
        <h1 class="main__item main__item--store-name">{storeName}</h1>
        <h2 class="main__item">Products</h2>

        <div class="main__item products">
            
        </div>

        <div class="main__item main__item--add-product-modal" id="add-product-modal">
            <div class="modal-content">
                <p class="close">&times;</p>
                <form enctype="multipart/form-data" class="product-large" id="add-product-form">
                </form>
            </div>
        </div> 

    </main>
    
    <div id="contact">
    {!isAdmin && store && <p>mailto:${store.contactEmail}?subject=${store.storeName} - General Inquiry </p>}  
    {!isAdmin && store && <i class="far fa-envelope" title="Contact us!"></i>}
    </div>
       
    </div>
   
  );
}

export default Store;