const url = new URL(window.location.href);
const productUuid = url.searchParams.get("productUuid");

async function getProduct() {
    try {
        const getProductDetails = await axios.get(`/store/product/${productUuid}`);
        const { storeProduct, cartProduct, isAdmin } = getProductDetails.data;

        renderProduct(storeProduct, cartProduct, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

async function renderProduct(storeProduct: any, cartProduct: any, isAdmin: boolean) {
    try {
        const productElement: HTMLElement = document.querySelector('.product');
        let productHtml: string;
        
            let buttonsByRole: string;
            if (isAdmin) buttonsByRole =`
            <i class="product-buttons__item product-buttons__item--delete fas fa-trash" id="delete-from-store" title="Delete ${storeProduct.productName}"></i>`;
            else {
                if (cartProduct === undefined) buttonsByRole = `<i class="product-buttons__item product-buttons__item--cart-add fas fa-cart-plus" id="add-to-cart" title="Add ${storeProduct.productName} to cart"></i>`;
                else buttonsByRole = `<a href="./cart.html" class="product-buttons__item product-buttons__item--cart-added"><i class="fas fa-shopping-cart" title="See ${storeProduct.productName} in your cart"></i></a>`;
            }
            
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
            productHtml = `
            <form class="main__item main__item--edit-product-form product-large" id="edit-product-form">
                <input class="product-large__item product-large__item--name" type="text" minLength="2" maxLength="40" placeholder="Product Name" value="${storeProduct.productName}" />
                <div class="product-large__item product-large__item--img">
                    <img id="productImg" src="${storeProduct.productImage}" title="${storeProduct.productName}">
                    <input class="product-large__item product-large__item--img" type="file" name="image" onchange="readURL(this)" />
                </div>
                <textarea class="product-large__item product-large__item--description" minLength="10" maxLength="500" placeholder="Product Description">${storeProduct.productDescription}</textarea>
                <input class="product-large__item product-large__item--price" type="number" min="0" max="5000" placeholder="Price ($)" value="${(Math.round(storeProduct.productPrice * 100) / 100).toFixed(2)}" />
                <input class="product-large__item product-large__item--in-stock" type="number" min="0" max="500" placeholder="In Stock" value="${storeProduct.inStock}" />
                <input class="product-large__item product-large__item--submit" type="submit" value="Update" />
            </form>`
            
            const sadsad = `<div class="products__item product" id="${storeProduct.productUuid}">
                <h1 class="product__item product__item--name">${storeProduct.productName}</h1>
                <img src="${storeProduct.productImage}" title="${storeProduct.productName} class="product__item product__item--img" />
                <p class="product__item product__item--description">${storeProduct.productDescription}</p>
                <h4 class="product__item product__item--price">${(Math.round(storeProduct.productPrice * 100) / 100).toFixed(2)}$</h4>
                <div class="product__item product__item--stock" style="color:${inStockColor}">${inStockText}</div>
                <div class="product__item product-buttons">${buttonsByRole}</div>
            </div>`;        

        productElement.innerHTML = productHtml;

    } catch (error) {
        console.error(error.message);
    }
}

getProduct();

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

// <i class="product-buttons__item product-buttons__item--delete fas fa-trash" id="delete-from-store" title="Delete ${product.productName}"></i>
// <i class="product-buttons__item product-buttons__item--edit fas fa-edit" id="edit-on-store" title="Edit ${product.productName}"></i>