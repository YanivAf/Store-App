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
        if (isAdmin) renderProductForm();

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
                <a href="./product.html?productUuid=${product.productUuid}" title="Click for full description" class="product__item product__item--description">${product.productDescription}</a>
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


function renderProductForm() {
    try {
        const addProductForm: HTMLFormElement = document.querySelector('#add-product-form')
        addProductForm.style.display = 'grid';
        
        const formInnerHTML: string = `
        <h3 class="product-large__item product-large__item--title" >Add a new product</h3>
        <input class="product-large__item product-large__item--name" type="text" name="productName" minLength="2" maxLength="40" placeholder="Product Name" required />
        <div class="product-large__item product-large__item--img">
            <img id="product-preview" src="./images/cart-wp.png">
            <input id="product-image" class="button" type="file" name="productImage" accept="image/*" onchange="readURL(this)" />
        </div>
        <textarea class="product-large__item product-large__item--description" name="productDescription" minLength="10" maxLength="300" placeholder="Product Description (10-300 characters)" required></textarea>
        <input class="product-large__item product-large__item--price" type="number" name="productPrice" min="0" max="5000" placeholder="Price ($)" step=".01" pattern="^\\d+(?:\\.\\d{1,2})?$" required />
        <input class="product-large__item product-large__item--in-stock" type="number" name="productInStock" min="0" max="500" placeholder="In Stock" required />
        <input class="product-large__item product-large__item--submit button" type="submit" value="Add" />`;

        addProductForm.innerHTML = formInnerHTML;
    } catch (error) {
        console.error(error.message);
    }
}

getStore();