const updateQuantityAncestor: HTMLElement = document.querySelector('.products');

updateQuantityAncestor.addEventListener('click', ev => updateQuantity(ev));
updateQuantityAncestor.addEventListener('change', ev => updateQuantity(ev));

async function updateQuantity(ev: any) {
  try {
    if (((ev.target.getAttribute('id') !== 'add-to-cart') && (!ev.target.classList.contains('update-cart-qunatity')) && (!ev.target.classList.contains('remove-from-cart')))
   || ((ev.type === 'click') && (ev.target.classList.contains('update-cart-qunatity')))) return;

    let productQuantity: number;
    if (ev.target.getAttribute('id') === 'add-to-cart') productQuantity = 1;
    else if (ev.target.classList.contains('remove-from-cart')) productQuantity = 0;
    else productQuantity = ev.target.valueAsNumber;
    console.log(productQuantity, ev.type);
    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    const productUuid: string = productDiv.getAttribute('id');

    const updateCartProductQuantity = await axios.put('/user/cart', { productUuid, productQuantity });
    const { cartProducts, storeProducts } = updateCartProductQuantity.data;

    renderShopperCart(cartProducts);
    if (ev.target.getAttribute('id') === 'add-to-cart') renderStoreProducts(storeProducts, cartProducts, false);
    else renderCartProducts(storeProducts, cartProducts);
    
  } catch (error) {
      console.error(error.message);
  }
}