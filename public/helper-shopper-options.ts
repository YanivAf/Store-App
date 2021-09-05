let updateQuantityAncestor: HTMLElement

if (window.location.pathname === '/store.html') {
  updateQuantityAncestor = document.querySelector('.products');
  updateQuantityAncestor.addEventListener('click', ev => updateQuantity(ev));
  updateQuantityAncestor.addEventListener('change', ev => updateQuantity(ev));
} else {
  updateQuantityAncestor = document.querySelector('.main');
  updateQuantityAncestor.addEventListener('click', ev => updateQuantity(ev));
  updateQuantityAncestor.addEventListener('change', ev => updateQuantity(ev));
}

async function updateQuantity(ev: any) {
  try {
    if (((ev.target.getAttribute('id') !== 'add-to-cart') && (!ev.target.classList.contains('update-cart-qunatity')) && (!ev.target.classList.contains('remove-from-cart')))
   || ((ev.type === 'click') && (ev.target.classList.contains('update-cart-qunatity')))) return;

    let productQuantity: number;
    if (ev.target.getAttribute('id') === 'add-to-cart') productQuantity = 1;
    else if (ev.target.classList.contains('remove-from-cart')) {
      const cancelDelete: boolean = await swal({
        title: `Remove from Cart`,
        text: `Are you sure?`,
        icon: `warning`,
        dangerMode: true,
        buttons: ['Nope', 'Yup'],
    });
      if (!cancelDelete) return;
      productQuantity = 0;
    }
    else productQuantity = ev.target.valueAsNumber;

    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    const productUuid: string = (window.location.pathname === '/product.html') ? productUuidParams : productDiv.getAttribute('id') ;

    const updateCartProductQuantity = await axios.put('/user/cart', { productUuid, productQuantity });
    const { cartProducts, storeProducts } = updateCartProductQuantity.data;

    await renderShopperCart(cartProducts);
    if (ev.target.getAttribute('id') === 'add-to-cart') renderStoreProducts(storeProducts, cartProducts, false);
    else if (window.location.pathname === '/product.html') getProduct();
    else renderCartProducts(storeProducts, cartProducts);
    
  } catch (error) {
      console.error(error.message);
  }
}

const whichHtmlFile: string = window.location.pathname;

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
          const updateCartProductQuantity = await axios.put('/user/cart/purchase');
          await swal({
            title: `Congrats!`,
            text: `You've completed the purchase`,
            icon: `success`,
            button: 'Cool',
          }).then(() => {
            window.location.href = './store.html?storeUuid=mall'
          });
        }
      });
      
  } catch (error) {
      console.error(error.message);
  }
}