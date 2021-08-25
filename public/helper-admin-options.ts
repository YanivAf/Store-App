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
  