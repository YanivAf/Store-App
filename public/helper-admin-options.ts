let updateProductForm: HTMLFormElement;
let addProductForm: HTMLFormElement;
const url = new URL(window.location.href);
let productUuidParams;

if (whichHtmlFile === '/product.html') {
  productUuidParams = url.searchParams.get("productUuid");
  updateProductForm = document.querySelector('#edit-product-form');
  updateProductForm.addEventListener('submit', ev => updateProduct(ev));
} else if (whichHtmlFile === '/store.html') {
  addProductForm = document.querySelector('#add-product-form');
  addProductForm.addEventListener('submit', ev => addProduct(ev));
}

async function updateProduct(ev: any) {
  try {
    console.log(productUuidParams);
    console.log(typeof ev.target);
    
    ev.target.preventDefault();

    let { productName, productDescription, productPrice, productImage, productInStock } = ev.target.elements;
    productName = productName.value;
    productDescription = productDescription.value;
    productPrice = productPrice.value;
    productImage = productImage.value;
    productInStock = productInStock.value;
    const productUuid = productUuidParams;
    return;
    ev.target.reset();

    await axios.put(`/store/product/${productUuidParams}`, { storeUuid, productUuid, productName, productDescription, productPrice, productImage, productInStock });

    swal({
        title: 'Congrats!',
        text: `${productName} was updated successfully!`,
        icon: "success",
        button: "Cool",
    }).then(async () => { window.location.href = `./store.html?storeUuid=${storeUuid}` });

  } catch (error) {
      console.error(error.message);
  }
}

async function addProduct(ev) {
    try {
        ev.target.preventDefault();

        let { productName, productDescription, productPrice, productImage, productInStock } = ev.target.elements;
        productName = productName.value;
        productDescription = productDescription.value;
        productPrice = productPrice.valueAsNumber;
        productImage = productImage.value;
        productInStock = productInStock.valueAsNumber;

        ev.target.reset();
        
        const addProductToStore = await axios.post(`/store/addProduct`, { storeUuid, productName, productDescription, productPrice, productImage, productInStock });
        const { store } = addProductToStore.data;
        
        swal({
            title: 'Congrats!',
            text: `${productName} was added to your store!`,
            icon: "success",
            button: "Cool",
        });

        renderStore(store, true);

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