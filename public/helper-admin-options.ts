const updateProductAncestor: HTMLElement = document.querySelector('.products');

updateProductAncestor.addEventListener('click', ev => updateProduct(ev));

async function updateProduct(ev: any) {
  try {
    if ((ev.target.className !== 'product-buttons__item product-buttons__item--edit fas fa-edit')) return;
    const productDiv: HTMLElement = ev.target.parentElement.parentElement;
    const productUuid: string = productDiv.getAttribute('id');
    const productNameElement: HTMLElement = productDiv.querySelector('.product__item--name');
    const productName: string = productNameElement.innerText;
    const mathSign: string = ev.target.innerText;
    const putProductQuantity = await axios.put('/user/cart', { productUuid, productName, mathSign });
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
  
      reader.onload = (e)=> {
       document.querySelector('#productImg').setAttribute("src", `${e.target.result}`);
        return e.target.result
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  