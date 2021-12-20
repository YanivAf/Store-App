import { useState, useContext } from 'react'
import { AppContext } from "../components/AppContext"
import '../styles/dist/style.min.css';
import axios from 'axios'



function SignUpManager() {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')

const { isLogin, setIsLogin, isCustomerSignUp, setIsCustomerSignUp, setIsStore, setStoreID } = useContext(AppContext)

const handleEmail = (e) => {
  setEmail(e.target.value)
}
const handleUsername = (e) => {
  setUsername(e.target.value)
}
const handlePassword = (e) => {
  setPassword(e.target.value)
}
const handlePasswordVerify = (e) => {
  setPasswordVerify(e.target.value)
}

async function register(ev) {
  try {
    ev.preventDefault();
    
    const adminRegisterForm = true

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

    const registerUser = await axios.post("http://localhost:555/user/register", {
      email: email,
      username: username,
      password: password,
      adminRegisterForm: adminRegisterForm,
    });
    const { title, text, storeUuid } = registerUser.data;

    swal({
      title: title,
      text: text,
      icon: "success",
      button: "Lets go",
    }).then(() => {
      setIsStore(true)
      setStoreID(storeUuid)
    });
  } catch (error) {
    console.error(error.message);
  }
}

  
  return (
   
    <div>
       
    <main class="main">
        <h1>Become an Admin in Our Beta Store!</h1>
    
        <form onSubmit={register} id="register-form">
            <div class="form-inputs">
                <label for="email">Email address</label>
                <input type="email" value={email} onChange={handleEmail} name="email" placeholder="Email address" required />
                <label for="username">Username</label>
                <input type="text" value={username} onChange={handleUsername} name="username" placeholder="Username" title="Your username must be between 2-20 characters and may contain only letters, digits and spaces." minlength="2" maxlength="20" required />
                <label for="password">Password</label>
                <input type="password" value={password} onChange={handlePassword} name="password" placeholder="Password" title="Your password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character." minLength="8" required />
                <label for="password">Password Verification</label>
                <input type="password" value={passwordVerify} onChange={handlePasswordVerify} name="passwordVerify" placeholder="Password" title="Your password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character." minLength="8" required />
            </div>
            <input class="button" type="submit" value="Register" />
        </form>
    </main>

      
       
    </div>
   
  );
}

export default SignUpManager;