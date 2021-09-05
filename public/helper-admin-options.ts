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
    
    ev.preventDefault();

    let { productName, productDescription, productPrice, productInStock } = ev.target.elements;
    productName = productName.value;
    productDescription = productDescription.value;
    productPrice = productPrice.valueAsNumber;
    productInStock = productInStock.valueAsNumber;

    const fd:FormData = new FormData();
    const imageInput = document.querySelector('#product-image');
    const productImage: any = imageInput.files[0];
    if (productImage) fd.append('productImage', productImage, `${productImage.name}`);
    fd.append('productName', productName);
    fd.append('productDescription', productDescription);
    fd.append('productPrice', productPrice);
    fd.append('productInStock', productInStock);
    fd.append('storeUuid', storeUuid);

    const productUuid = productUuidParams;
    ev.target.reset();

    await axios.put(`/store/product/${productUuid}`, fd);

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
        ev.preventDefault();

        let { productName, productDescription, productPrice, productInStock } = ev.target.elements;
        productName = productName.value;
        productDescription = productDescription.value;
        productPrice = productPrice.valueAsNumber;
        productInStock = productInStock.valueAsNumber;

        const fd:FormData = new FormData();
        const imageInput = document.querySelector('#product-image');
        const productImage: any = imageInput.files[0];
        if (productImage) fd.append('productImage', productImage, `${productImage.name}`);
        fd.append('productName', productName);
        fd.append('productDescription', productDescription);
        fd.append('productPrice', productPrice);
        fd.append('productInStock', productInStock);
        fd.append('storeUuid', storeUuid);

        const productUuid = productUuidParams;

        ev.target.reset();
        
        const addProductToStore = await axios.post(`/store/addProduct`, fd);
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

async function deleteProduct(ev: any) {
  try {
      const cancelDelete: boolean = await swal({
        title: `Delete from Store`,
        text: `Are you sure?`,
        icon: `warning`,
        dangerMode: true,
        buttons: ['Nope', 'Yup'],
      });
      if (!cancelDelete) return;
    
      const productUuid: string = productUuidParams;
      const productNameElement: HTMLElement = document.querySelector('#product-name');
      const productName: string = productNameElement.innerText;

      await axios.delete(`/store/product/${productUuid}`);

      swal({
        title: 'Done!',
        text: `${productName} was deleted from your store!`,
        icon: "success",
        button: "Cool",
      }).then(() => { window.location.href = `./store.html?storeUuid=${storeUuid}` });

    
  } catch (error) {
      console.error(error.message);
  }
}

const readURL = (input: any) => {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = (ev)=> {
     document.querySelector('#product-preview').setAttribute("src", `${ev.target.result}`);
      return ev.target.result
    }
    reader.readAsDataURL(input.files[0]);
  }
}