const updateProductAncestor: HTMLElement = document.querySelector('.products');

updateProductAncestor.addEventListener('click', ev => updateProduct(ev));

async function updateProduct(ev: any) {
  try {
    if ((ev.target.getAttribute('id') !== 'edit-on-store')) return;
    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    const productUuid: string = productDiv.getAttribute('id');
    const putProductQuantity = await axios.put('/store/cart', { productUuid, productName, mathSign });
    const { productQuantity } = putProductQuantity.data;
    const productQuantityElement: HTMLElement = productDiv.querySelector(('.product-buttons__item--cart-quantity'));
    productQuantityElement.innerText = productQuantity;
    renderStore(false);
    
  } catch (error) {
      console.error(error.message);
  }
}

const readURL = (input: any) => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
  
      reader.onload = (ev)=> {
       document.querySelector('#productImg').setAttribute("src", `${ev.target.result}`);
        return ev.target.result
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  