const registerForm: HTMLFormElement = document.querySelector("#register-form");

registerForm.addEventListener("submit", register);

async function register(ev) {
  try {
    ev.preventDefault();
    let { email, username, password, passwordVerify } = ev.target.elements;
    email = email.value;
    username = username.value;
    password = password.value;
    passwordVerify = passwordVerify.value;
    const adminRegisterForm: boolean =
      window.location.href.indexOf("shopper") === -1 ? true : false;

    const passRegExRule =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passRegEx = new RegExp(passRegExRule, "gm");
    if (!passRegEx.test(password)) {
        swal({
            title: 'Password Not Secured Enough',
            text: "Your password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character. Please try again",
            icon: "warning",
            button: "Try again",
          });
          throw new Error('Password Not Secured Enough, please try again')
    }

    if (password != passwordVerify) {
        swal({
            title: 'Password Verification Issue',
            text: "Your entered different passwords, please try again",
            icon: "warning",
            button: "Try again",
          });
          throw new Error('Password Verification Issue, please try again')
    }

    ev.target.reset();

    const registerUser = await axios.post("/user/register", {
      email,
      username,
      password,
      adminRegisterForm,
    });
    const { title, text, storeUuid } = registerUser.data;

    swal({
      title: title,
      text: text,
      icon: "success",
      button: "Lets go",
    }).then(() => {
      window.location.href = adminRegisterForm
        ? `./store.html?storeUuid=${storeUuid}`
        : "./store.html?storeUuid=all";
    });
  } catch (error) {
    console.error(error.message);
  }
}