const updateQuantityAncestor: HTMLElement = document.querySelector('.products');

updateQuantityAncestor.addEventListener('click', ev => updateQuantity(ev));

async function updateQuantity(ev: any) {
  try {
    if ((ev.target.getAttribute('id') !== 'add-to-cart') && (ev.target.className !== 'update-cart-qunatity') && (ev.target.className !== 'delete-from-cart')) return;
    let productQuantity: number;
    switch (ev.target.getAttribute('id')) { // TODO add 0 (remove) or specific number (+) depending on ev.target.className (from product/cart page)
      default:
        const cartProductQuantityInput: HTMLElement = document.querySelector('#cart-qunatity');
        productQuantity = cartProductQuantityInput.valueAsNumber;
        break;

      case 'add-to-cart':
        productQuantity = 1;
        break;
      
      case 'delete-from-cart':
        productQuantity = 0;
        break;

    } 
    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    const productUuid: string = productDiv.getAttribute('id');
    const updateCartProductQuantity = await axios.put('/user/cart', { productUuid, productQuantity });
    const { cartProducts, storeProducts } = updateCartProductQuantity.data;
    renderShopperCart(cartProducts);
    renderStoreProducts(storeProducts, cartProducts, false);
    
  } catch (error) {
      console.error(error.message);
  }
}