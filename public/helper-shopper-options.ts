const updateQuantityAncestor: HTMLElement = document.querySelector('.products');

updateQuantityAncestor.addEventListener('click', ev => updateQuantity(ev));

async function updateQuantity(ev: any) {
  try {
    if ((ev.target.className !== 'product-buttons__item product-buttons__item--cart-reduce') || (ev.target.className !== 'product-buttons__item product-buttons__item--cart-add')) return;

    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    const productUuid: string = productDiv.getAttribute('id');
    const productNameElement: HTMLElement = productDiv.querySelector('.product__item--name');
    const productName: string = productNameElement.innerText;
    const mathSign: string = ev.target.innerText;
    const postProductQuantity = await axios.put('/cart', productUuid, productName, mathSign);

    console.log('hi');


  } catch (error) {
      console.error(error.message);
  }
}

async function addToCart(productUuid: string, productName: string) {
  try {
    console.log('hi2');

  } catch (error) {
      console.error(error.message);
  }
}