const updateProductAncestor: HTMLElement = document.querySelector('.product');

updateProductAncestor.addEventListener('submit', ev => updateProduct(ev));

async function updateProduct(ev: any) {
  try {
    
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
  