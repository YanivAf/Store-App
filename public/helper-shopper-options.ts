const updateAncestor: HTMLElement = (whichHtmlFile === '/store.html') ? document.querySelector('.products') : document.querySelector('.main');

updateAncestor.addEventListener('click', ev => updateQuantity(ev));
updateAncestor.addEventListener('change', ev => updateQuantity(ev));
updateAncestor.addEventListener('click', ev => updateSaved(ev));
updateAncestor.addEventListener('click', ev => updateLoved(ev));

async function updateQuantity(ev: any) {
  try {
    if (((!ev.target.classList.contains('add-to-cart')) && (!ev.target.classList.contains('remove-from-cart')) && (!ev.target.classList.contains('save-for-later')) && (!ev.target.classList.contains('update-cart-qunatity')))
   || ((ev.type === 'click') && (ev.target.classList.contains('update-cart-qunatity')))) return;

    let productQuantity: number;
    if (ev.target.classList.contains('add-to-cart')) productQuantity = 1;
    else if (ev.target.classList.contains('remove-from-cart')) {
      const cancelDelete: boolean|string = await swal({
        title: `Remove from Cart`,
        text: `Are you sure?`,
        icon: `warning`,
        dangerMode: true,
        buttons: {
          later: 'Save for Later',
          cancel: 'Nope',
          confirm: 'Yup',
        },
    });
      if (!cancelDelete) return;
      else if (cancelDelete === 'later') productQuantity = -2; // remove from cart & add to saved products
      else productQuantity = -1; // remove from cart
    }
    else if ((ev.target.classList.contains('save-for-later')) && (!ev.target.classList.contains('product-buttons__item'))) productQuantity = -2; // // remove from cart & add to saved products (only for cart.html)
    else productQuantity = ev.target.valueAsNumber;

    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    
    productUuid = url.searchParams.get("productUuid");
    productUuid = productUuid ?? productDiv.getAttribute('id');

    let storeA: HTMLElement = productDiv.querySelector('.product__item--img');
    if (whichHtmlFile === '/product.html') storeA = productDiv.querySelector('.product-large__item--img');
    else if (whichHtmlFile === '/cart.html') storeA = productDiv.querySelector('.product-row__item--img');
    
    storeUuid = url.searchParams.get("storeUuid");
    const allStoresInfo: boolean = ((storeUuid === 'mall') || (whichHtmlFile === '/cart.html')) ? true : false;
    storeUuid = ((!storeUuid) || (storeUuid === 'mall')) ? storeA.getAttribute('href').replace(/^(.)*storeUuid=/g, '').replace(/[&](.)*$/g, '') : storeUuid;

    const updateCartProductQuantity = await axios.put('/user/cart', { allStoresInfo, storeUuid, productUuid, productQuantity });
    const { cartProducts, storeProducts, savedProducts, lovedProducts, shippingAddress } = updateCartProductQuantity.data;
    await renderShopperCart(cartProducts);
    if ((ev.target.classList.contains('add-to-cart')) && (whichHtmlFile === '/store.html')) renderStoreProducts(storeProducts, cartProducts, lovedProducts, false);
    else if (whichHtmlFile === '/product.html') getProduct();
    else if  (whichHtmlFile === '/cart.html') renderCartPageProducts(storeProducts, cartProducts, savedProducts, shippingAddress);
    
  } catch (error) {
      console.error(error.message);
  }
}

async function updateSaved(ev: any) {
  try {
    if ((!ev.target.classList.contains('remove-from-saved'))) return;

    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    productUuid = productDiv.getAttribute('id');

    const updateSavedList = await axios.put('/user/saved', { productUuid });
    const { cartProducts, storeProducts, savedProducts, shippingAddress } = updateSavedList.data;
    renderCartPageProducts(storeProducts, cartProducts, savedProducts, shippingAddress);
    
  } catch (error) {
      console.error(error.message);
  }
}

async function updateLoved(ev: any) {
  try {
    if ((!ev.target.classList.contains('love-product')) && (!ev.target.classList.contains('product-loved'))) return;

    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    
    productUuid = url.searchParams.get("productUuid");
    productUuid = productUuid ?? productDiv.getAttribute('id');

    const storeA: HTMLElement = (whichHtmlFile === '/store.html') ? productDiv.querySelector('.product__item--img') : productDiv.querySelector('.product-large__item--img');
    
    storeUuid = url.searchParams.get("storeUuid");
    const allStoresInfo: boolean = (storeUuid === 'mall') ? true : false;
    storeUuid = (storeUuid === 'mall') ? storeA.getAttribute('href').replace(/^(.)*storeUuid=/g, '').replace(/[&](.)*$/g, '') : storeUuid;

    const updateLovedList = await axios.put('/user/loved', { allStoresInfo, storeUuid, productUuid });
    const { cartProducts, storeProducts, lovedProducts } = updateLovedList.data;
    await renderShopperCart(cartProducts);
    if (whichHtmlFile === '/store.html') renderStoreProducts(storeProducts, cartProducts, lovedProducts, false);
    else if (whichHtmlFile === '/product.html') getProduct(lovedProducts);
    
  } catch (error) {
      console.error(error.message);
  }
}

if (whichHtmlFile === '/cart.html') {
  const payBtn: HTMLButtonElement = document.querySelector('#pay');
  
  payBtn.addEventListener('click', ev=> purchaseCart(ev));
}

async function purchaseCart(ev: any) {
  try {
      await swal({
        title: `Paying for Cart`,
        text: `Do you wish to proceed?`,
        icon: `warning`,
        buttons: ['Nope', 'Yup'],
      }).then(async (willPurchase) => {
        if (willPurchase) {
          const payForCart = await axios.put('/user/cart/purchase', { storeUuid: 'all cart products stores', productUuid: 'all cart products' });
          const { purchaseCart } = payForCart.data;
          if (purchaseCart === true) {
            await swal({
              title: `Congrats!`,
              text: `You've completed the purchase`,
              icon: `success`,
              button: 'Cool',
            }).then(() => {
              window.location.href = './store.html?storeUuid=mall'
            });
          }
        }
      });
      
  } catch (error) {
      console.error(error.message);
  }
}