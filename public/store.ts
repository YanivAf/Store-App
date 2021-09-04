const url = new URL(window.location.href);
const storeUuid = url.searchParams.get("storeUuid");

async function getStore() {
    try {
        const getStoreDetails = await axios.get(`/store/${storeUuid}`);
        const { store, isAdmin } = getStoreDetails.data;
        
        renderStore(store, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

function renderStore(store: any, isAdmin: boolean) {
    try {
        const { storeName, products } = store;

        const storeNameElement: HTMLElement = document.querySelector('.main__item--store-name');
        storeNameElement.innerText = storeName;
        
        const pageTitle: HTMLElement = document.querySelector('title');
        pageTitle.innerText= storeName;
        
        renderStoreProducts(products, cartProductsToRender, isAdmin);
        if (isAdmin) renderAddProductForm();

    } catch (error) {
        console.error(error.message);
    }
}

function renderStoreProducts(products: Array<any>, cartProducts: Array<any>, isAdmin: boolean) {
    try {

        const productsElement: HTMLElement = document.querySelector('.products');
        let productsHtml: string;
        
        const AreThereProducts: boolean = (products.length > 0) ? true : false;
        productsHtml = (!AreThereProducts) ? 'no products to show!'
        :
        products.map((product) => {
            let buttonsByRole: string;
            if (isAdmin) buttonsByRole =`
                <a href="./product.html?productUuid=${product.productUuid}" class="product-buttons__item product-buttons__item--info fas fa-info" >
                    <i title="View & change ${product.productName}"></i>
                </a>`;
            else {
                const cartProductIndex = cartProducts.findIndex(cartProduct => cartProduct.productUuid === product.productUuid);
                if (cartProductIndex === -1) buttonsByRole = `<i class="product-buttons__item product-buttons__item--cart-add fas fa-cart-plus" id="add-to-cart" title="Add ${product.productName} to cart"></i>`;
                else buttonsByRole = `<a href="./cart.html" class="product-buttons__item product-buttons__item--cart-added"><i class="fas fa-shopping-cart" title="See ${product.productName} in your cart"></i></a>`;
            }
            
            let inStockText: string;
            let inStockColor: string;
            const isInStock: boolean = (product.inStock > 0) ? true : false;
            if (product.inStock > 0) {
                inStockText = `${product.inStock} left`;
                inStockColor = (product.inStock > 5) ? 'green' : 'orange';
            } else {
                inStockText = 'Out of Stock';
                inStockColor = 'red';
            }
            const productHtml: string = ((!isAdmin) && (!isInStock)) ? ''
            :
            `<div class="products__item product" id="${product.productUuid}">
                <h3 class="product__item product__item--name">${product.productName}</h3>
                <a href="./product.html?productUuid=${product.productUuid}" class="product__item product__item--img">
                    <img src="${product.productImage}" title="${product.productName}"/>
                </a>
                <a href="./product.html?productUuid=${product.productUuid}" title="${product.productDescription}" class="product__item product__item--description">${product.productDescription}</a>
                <h4 class="product__item product__item--price">${(Math.round(product.productPrice * 100) / 100).toFixed(2)}$</h4>
                <div class="product__item product__item--stock" style="color:${inStockColor}">${inStockText}</div>
                <div class="product__item product-buttons">${buttonsByRole}</div>
                
            </div>`;
            return productHtml;
        }).join('');

        productsElement.innerHTML = productsHtml;

    } catch (error) {
        console.error(error.message);
    }
}

function renderAddProductForm() {
    const productsElement: HTMLElement = document.querySelector('.products');
    const formHTML: string = `
    <form class="main__item main__item--add-product-form product-large" id="add-product-form">
        <h3 class="product-large__item product-large__item--title" >Add a new product</h3>
        <input class="product-large__item product-large__item--name" type="text" minLength="2" maxLength="40" placeholder="Product Name" />
        <div class="product-large__item product-large__item--img">
            <img id="productImg" src="./images/cart-wp.png">
            <input class="product-large__item product-large__item--img" type="file" name="image" onchange="readURL(this)" />
        </div>
        <textarea class="product-large__item product-large__item--description" minLength="10" maxLength="500" placeholder="Product Description"></textarea>
        <input class="product-large__item product-large__item--price" type="number" min="0" max="5000" placeholder="Price ($)" />
        <input class="product-large__item product-large__item--in-stock" type="number" min="0" max="500" placeholder="In Stock" />
        <input class="product-large__item product-large__item--submit" type="submit" value="Add" />
    </form>`;

    productsElement.insertAdjacentHTML('afterend',formHTML);
}

getStore();