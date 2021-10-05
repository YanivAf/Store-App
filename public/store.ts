async function getStore() {
    try {
        const getStoreDetails = await axios.get(`/store/${storeUuid}`);
        const { stores, store } = getStoreDetails.data;
        
        renderStore(stores, store, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

function renderStore(stores: any, store: any, isAdmin: boolean) {
    try {
        let storeName: string, products: Array<any>;

        if (stores) {
            storeName = 'Virtual Mall';
            products = [];
            stores.stores.forEach(store => {products = products.concat(store.products)});
        } else {
            storeName = store.storeName;
            products = store.products;
        }

        const storeNameElement: HTMLElement = document.querySelector('.main__item--store-name');
        storeNameElement.innerText = storeName;
        
        const pageTitle: HTMLElement = document.querySelector('title');
        pageTitle.innerText = storeName;
        
        renderStoreProducts(products, cartProductsToRender, lovedProducts, isAdmin);
        if ((!isAdmin) && (store)) {
            const contactStoreElement: HTMLElement = document.querySelector('#contact');
            contactStoreElement.setAttribute('href', `mailto:${store.contactEmail}?subject=${store.storeName} - General Inquiry`)
            contactStoreElement.innerHTML = `<i class="far fa-envelope" title="Contact us!"></i>`;
        }

    } catch (error) {
        console.error(error.message);
    }
}

function renderStoreProducts(products: Array<any>, cartProducts: Array<any>, lovedProducts: Array<string>, isAdmin: boolean) {
    try {
        const productsElement: HTMLElement = document.querySelector('.products');
        let productsHtml: string;
        
        const AreThereProducts: boolean = (products.length > 0) ? true : false;
        productsHtml = (!AreThereProducts) ? 'no products to show!'
        :
        products.map((product) => {
            let buttonsByRole: string = ``;
            if (isAdmin) buttonsByRole =``;
            else {
                if (storeUuid) buttonsByRole = `
                <a href="./store.html?storeUuid=${product.storeUuid}" class="product-buttons__item product-buttons__item--store">
                    <i class="fas fa-store" title="Go to ${product.productName}'s store"></i>
                </a>`;

                const lovedProductIndex: number = lovedProducts.findIndex(lovedProduct => lovedProduct === product.productUuid);
                const isLoved: boolean = (lovedProductIndex !== -1) ? true : false;
                const lovedBtnHtml: string = (isLoved) ? `<i class="product-buttons__item product-buttons__item--product-loved fas fa-heart product-loved" title="Unlove ${product.productName}"></i>` : `<i class="product-buttons__item product-buttons__item--love-product far fa-heart love-product" title="Love ${product.productName}"></i>`;

                const cartProductIndex = cartProducts.findIndex(cartProduct => cartProduct.productUuid === product.productUuid);
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
            
            let inStockText: string;
            let inStockColor: string;
            const isInStock: boolean = (product.inStock > 0) ? true : false;
            if (isInStock) {
                if (isAdmin) inStockText = `${product.inStock} left`;
                else inStockText = (product.inStock > 5) ? `In Stock` : `Running Out!`;
                inStockColor = (product.inStock > 5) ? 'green' : 'orange';
            } else {
                inStockText = 'Out of Stock';
                inStockColor = 'red';
            }

            let saleTagHtml: string = ``;
            let salePriceHtml: string = ``;
            const isOnSale: boolean = (product.precentsOff > 0) ? true : false;
            if (isOnSale) {
                saleTagHtml = `<h5 class="product__item product__item--sale">${product.precentsOff}% off!</h5>`;
                salePriceHtml = `<br /><span style="font-size: 12px; color: lightgrey; text-decoration: line-through;">${(Math.round(product.productPrice * 100) / 100).toFixed(2)}$</span>`;
            }

            const soldHtml: string = ((product.sold < 10) && (!isAdmin)) ? '<div class="sold">New product!</div>' : `<div class="sold">${product.sold} sold</div>`;
            const lovedHtml: string = (!isAdmin) ? '' : `<div class="loved">${product.loved} <i class="fas fa-heart"></i></div>`;

            const productHtml: string = ((!isAdmin) && (!isInStock)) ? ''
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

    } catch (error) {
        console.error(error.message);
    }
}

const modalElement: HTMLElement = document.querySelector('#add-product-modal');

if (isAdmin) {
    const addProductElement: HTMLElement = document.querySelector("#add-product");
    addProductElement.addEventListener('click', ev => renderProductForm(ev));

    const closeModalElement: HTMLElement = document.querySelector(".close");
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
        
        const formInnerHTML: string = `
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