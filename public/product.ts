
async function getProduct() {
    try {
        const url = new URL(window.location.href);
        const productUuidParams = url.searchParams.get("productUuid");
        console.log('productUuidParams',productUuidParams);
        
        const getProductDetails = await axios.get(`/store/product/${productUuidParams}`);
        const { storeProduct, cartProduct, isAdmin } = getProductDetails.data;

        renderProduct(storeProduct, cartProduct, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

async function renderProduct(storeProduct: any, cartProduct: any, isAdmin: boolean) {
    try {
        const updateProductForm: HTMLFormElement = document.querySelector('#edit-product-form')
        const productNameElement: HTMLElement = document.querySelector('#product-name');
        productNameElement.innerHTML = storeProduct.productName;
        
        let productHtml: string;
        
        let buttonsByRole: string;
        let cartProductQuantity: number;
        if (isAdmin) {
            updateProductForm.style.display = 'unset';
            buttonsByRole =`<i class="product-buttons__item product-buttons__item--delete fas fa-trash" id="delete-from-store" title="Delete ${storeProduct.productName}"></i>`;
            productHtml = `
            <div class="product-large__item product-large__item--buttons product-buttons">${buttonsByRole}</div>
            <input class="product-large__item product-large__item--name" type="text" name="productName" minLength="2" maxLength="40" placeholder="Product Name" value="${storeProduct.productName}" required />
            <div class="product-large__item product-large__item--img">
                <img id="productImg" src="${storeProduct.productImage}" title="${storeProduct.productName}">
                <input class="button" type="file" name="productImage" onchange="readURL(this)" />
            </div>
            <textarea class="product-large__item product-large__item--description" name="productDescription" minLength="10" maxLength="300" placeholder="Product Description (10-300 characters)" required>${storeProduct.productDescription}</textarea>
            <div class="product-large__item product-large__item--price">
                <label for="productPrice">Price ($)</label>
                <input type="number" name="productPrice" min="0" max="5000" placeholder="Price ($)" step=".01" pattern="^\\d+(?:\\.\\d{1,2})?$" value="${(Math.round(storeProduct.productPrice * 100) / 100).toFixed(2)}" required />
            </div>
            <div lass="product-large__item product-large__item--in-stock">
                <label for="productInStock">In Stock</label>
                <input type="number" name="productInStock" min="0" max="500" placeholder="In Stock" value="${storeProduct.inStock}" required />
            </div>
            <input class="product-large__item product-large__item--submit" type="submit" value="Update" required />`;

            updateProductForm.innerHTML = productHtml;

        } else {
            updateProductForm.remove();

            cartProductQuantity = cartProduct.quantity;
            let inStockText: string;
            let inStockColor: string;
            const isInStock: boolean = (storeProduct.inStock > 0) ? true : false;
            if (isInStock) {
                inStockText = `${storeProduct.inStock} left`;
                inStockColor = (storeProduct.inStock > 5) ? 'green' : 'orange';
            } else {
                inStockText = 'Out of Stock';
                inStockColor = 'red';
            }

            if (cartProduct === undefined) {
                buttonsByRole = `<i class="product-buttons__item product-buttons__item--cart-add fas fa-cart-plus" id="add-to-cart" title="Add ${storeProduct.productName} to cart"></i>`;
                cartProductQuantity = 0;
            } else {
                buttonsByRole = `
                <a href="./cart.html" class="product-buttons__item product-buttons__item--cart-added">
                    <i class="fas fa-shopping-cart" title="See ${storeProduct.productName} in your cart"></i>
                </a>`;
            }

            productHtml = `
            <div class="main__item main__item--product-details product-large">
            <div class="product-large__item product-large__item--buttons product-buttons">${buttonsByRole}</div>
            <div class="product-large__item product-large__item--img">
                <img id="productImg" src="${storeProduct.productImage}" title="${storeProduct.productName}">
            </div>
            <article class="product-large__item product-large__item--description" title="Product Description">${storeProduct.productDescription}</article>
            <div class="product-large__item product-large__item--price">
                <h3>${(Math.round(storeProduct.productPrice * 100) / 100).toFixed(2)}$</h3>
                <p>per unit</p>
            </div>
            <p class="product-large__item product-large__item--in-stock" title="In Stock" style="color:${inStockColor}">${inStockText}</p>
            <div class="product-large__item product-large__item--quantity">
                <input type="number" class="update-cart-qunatity" min="0" max="${cartProductQuantity + storeProduct.inStock}" value="${cartProductQuantity}" />
            </div>
            </div>`;

            const productsElement: HTMLElement = document.querySelector('.product-large');
            if (productsElement) productsElement.remove();

            const mainElement: HTMLElement = document.querySelector('.main');
            mainElement.insertAdjacentHTML('beforeend', productHtml);
        }
        


    } catch (error) {
        console.error(error.message);
    }
}

getProduct();