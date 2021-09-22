async function getProduct() {
    try {
        const getProductDetails = await axios.get(`/store/${storeUuid}/product/${productUuid}`);
        const { storeProduct, cartProduct } = getProductDetails.data;

        renderProduct(storeProduct, cartProduct, isAdmin);

    } catch (error) {
        console.error(error.message);
    }
}

function renderProduct(storeProduct: any, cartProduct: any, isAdmin: boolean) {
    try {
        const updateProductForm: HTMLFormElement = document.querySelector('#edit-product-form');
        const pageTitle: HTMLElement = document.querySelector('title');
        const productNameElement: HTMLElement = document.querySelector('#product-name');
        
        pageTitle.innerText = storeProduct.productName;
        productNameElement.innerHTML = storeProduct.productName;
        
        let productHtml: string;
        
        let buttonsByRole: string;
        let cartProductQuantity: number;
        if (isAdmin) {
            updateProductForm.style.display = 'flex';
            buttonsByRole =`<i class="product-buttons__item product-buttons__item--delete fas fa-trash" id="delete-from-store" onclick="deleteProduct(event)" title="Delete ${storeProduct.productName}"></i>`;
            productHtml = `
            <div class="product-large__item product-large__item--img">
                <img id="productImg" src="${storeProduct.productImage}" title="${storeProduct.productName}">
                <input id="product-image" class="button" type="file" name="productImage" accept="image/*" onchange="readURL(this)" />
            </div>
            <div class="product-large__item details">
                <input class="details__item details__item--name" type="text" name="productName" minLength="2" maxLength="40" placeholder="Product Name" value="${storeProduct.productName}" required />
                <div class="details__item details__item--buttons product-buttons">${buttonsByRole}</div>
                <div class="details__item details__item--sale">
                    <input type="number" name="precentsOff" min="0" max="100" placeholder="% Off" value="${storeProduct.precentsOff}" />
                    <label for="precentsOff">% Off</label>
                </div>
                <textarea class="details__item details__item--description" name="productDescription" minLength="10" maxLength="300" placeholder="Product Description (10-300 characters)" required>${storeProduct.productDescription}</textarea>
                <div class="details__item details__item--price">
                    <input type="number" name="productPrice" min="0" max="5000" placeholder="Price ($)" step=".01" pattern="^\\d+(?:\\.\\d{1,2})?$" value="${(Math.round(storeProduct.productPrice * 100) / 100).toFixed(2)}" required />
                    <label for="productPrice">Price ($)</label>
                </div>
                <div class="details__item details__item--in-stock">
                    <input type="number" name="productInStock" min="0" max="500" placeholder="In Stock" value="${storeProduct.inStock}" required />
                    <label for="productInStock">In Stock</label>
                </div>
                <input class="details__item details__item--submit button" type="submit" value="Update" />
            </div>`;

            updateProductForm.innerHTML = productHtml;

        } else {
            if (updateProductForm) updateProductForm.remove();

            let inStockText: string;
            let inStockColor: string;
            const isInStock: boolean = (storeProduct.inStock > 0) ? true : false;
            if (isInStock) {
                if (isAdmin) inStockText = `${storeProduct.inStock} left`;
                else inStockText = (storeProduct.inStock > 5) ? `In Stock` : `Running Out!`;
                inStockColor = (storeProduct.inStock > 5) ? 'green' : 'orange';
            } else {
                inStockText = 'Out of Stock';
                inStockColor = 'red';
            }

            if (cartProduct === undefined) {
                buttonsByRole = `
                <i class="product-buttons__item product-buttons__item--cart-add fas fa-cart-plus add-to-cart" title="Add ${storeProduct.productName} to cart"></i>
                <a href="./store.html?storeUuid=${storeProduct.storeUuid}" class="product-buttons__item product-buttons__item--store">
                    <i class="fas fa-store" title="Go to ${storeProduct.productName}'s store"></i>
                </a>`;
                cartProductQuantity = 0;
            } else {
                cartProductQuantity = cartProduct.quantity;
                buttonsByRole = `
                <a href="./cart.html" class="product-buttons__item product-buttons__item--cart-added">
                    <i class="fas fa-shopping-cart" title="See ${storeProduct.productName} in your cart"></i>
                </a>
                <a href="./store.html?storeUuid=${storeProduct.storeUuid}" class="product-buttons__item product-buttons__item--store">
                    <i class="fas fa-store" title="Go to ${storeProduct.productName}'s store"></i>
                </a>`;
            }

            let saleTagHtml: string = ``;
            let salePriceHtml: string = ``;
            const isOnSale: boolean = (storeProduct.precentsOff > 0) ? true : false;
            if (isOnSale) {
                saleTagHtml = `<h5 class="details__item details__item--sale">${storeProduct.precentsOff}% off!</h5>`;
                salePriceHtml = `<br /><span style="font-size: 14px; color: lightgrey; text-decoration: line-through;">${(Math.round(storeProduct.productPrice * 100) / 100).toFixed(2)}$</span>`;
            }

            productHtml = `
            <div class="main__item product-large">
                <div class="product-large__item product-large__item--img">
                    <img id="productImg" src="${storeProduct.productImage}" title="${storeProduct.productName}">
                </div>
                <div class="product-large__item details">
                    <h3 class="details__item details__item--name">Product Details</h3>
                    <div class="details__item details__item--buttons product-buttons">${buttonsByRole}</div>
                    ${saleTagHtml}
                    
                    <article class="details__item details__item--description" title="Product Description">${storeProduct.productDescription}</article>
                    <div class="details__item details__item--price">
                        <h3>${(Math.round((storeProduct.productPrice - storeProduct.productPrice * (storeProduct.precentsOff / 100)) * 100) / 100).toFixed(2)}$<span style="font-size: 12px; font-weight: normal;"> per unit</span>${salePriceHtml}</h3>
                    </div>
                    <p class="details__item details__item--in-stock" title="In Stock" style="color:${inStockColor}">${inStockText}</p>
                    <div class="details__item details__item--quantity">
                        <input type="number" class="update-cart-qunatity" name="cartQuantity" min="0" max="${storeProduct.inStock}" value="${cartProductQuantity}" />
                        <label for="cartQuantity"> in your cart</label>
                    </div>
                </div>
            </div>`;

            const productElement: HTMLElement = document.querySelector('.product-large');
            if (productElement) productElement.remove();
            
            const mainElement: HTMLElement = document.querySelector('.main');
            mainElement.insertAdjacentHTML('beforeend', productHtml);

            magnifyImg();
        }
        
    } catch (error) {
        console.error(error.message);
    }
}

function magnifyImg() {
    try {
        const productImg: HTMLImageElement = document.querySelector('#productImg');
        const zoom: number = 3;
        const magnifierGlass: HTMLElement = document.createElement('div');
        magnifierGlass.setAttribute('class', 'img-magnifier-glass');
    
        productImg.parentElement.insertBefore(magnifierGlass, productImg);
    
        magnifierGlass.addEventListener("mousemove", moveMagnifier);
        productImg.addEventListener("mousemove", moveMagnifier);
        magnifierGlass.addEventListener("touchmove", moveMagnifier);
        productImg.addEventListener("touchmove", moveMagnifier);

        function moveMagnifier(ev) {
            ev.preventDefault();
            magnifierGlass.style.display = 'unset';
            
            magnifierGlass.style.backgroundImage = `url('${productImg.src}')`;
            magnifierGlass.style.backgroundRepeat = "no-repeat";
            magnifierGlass.style.backgroundSize = `${(productImg.width * zoom)}px ${(productImg.height * zoom)}px`;
            const bw: number = 1.1;
            const w: number = magnifierGlass.offsetWidth / 2;
            const h: number = magnifierGlass.offsetHeight / 2;

            const pos: any = getCursorPos(ev);
            let x = pos.x, y = pos.y;
            
            if ((x > productImg.width - (w / zoom)) || (x < w / zoom) || (y > productImg.height - (h / zoom)) || (y < h / zoom)) magnifierGlass.style.display = 'none';
            
            if (x > productImg.width - (w / zoom)) x = productImg.width - (w / zoom);
            if (x < w / zoom) x = w / zoom;
            if (y > productImg.height - (h / zoom)) y = productImg.height - (h / zoom);
            if (y < h / zoom) y = h / zoom;

            magnifierGlass.style.left = `${(x - w)}px`;
            magnifierGlass.style.top = `${(y - h)}px`;

            magnifierGlass.style.backgroundPosition = `-${((x * zoom) - w + bw)}px -${((y * zoom) - h + bw)}px`;
        }
    
        function getCursorPos(ev) {
            let x: number = 0, y: number = 0;
            ev = ev || window.event;

            const a: any = productImg.getBoundingClientRect();

            x = ev.pageX - a.left;
            y = ev.pageY - a.top;

            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x , y };
        }

    } catch (error) {
        console.error(error.message);
    }
}

getProduct();