import { useContext, useState } from 'react'
import { AppContext } from "./AppContext"
import '../styles/dist/style.min.css';
import SignUp from './SignUp'
import axios from 'axios'

function Login() {


    const { isLogin, setIsLogin, isCustomerSignUp, setIsCustomerSignUp, loggedInInfo, setLoggedInInfo, isStore, setIsStore, storeID, setStoreID } = useContext(AppContext)

    const [adminEmail, setAdminEmail] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [customerPassword, setCustomerPassword] = useState('')

    const handleAdminEmail = (e) =>{
        setAdminEmail(e.target.value)
    }
    const handleAdminPassword = (e) =>{
        setAdminPassword(e.target.value)
    }
    const handleCustomerEmail = (e) =>{
        setCustomerEmail(e.target.value)
    }
    const handleCustomerPassword = (e) =>{
        setCustomerPassword(e.target.value)
    }




    // async function welcome() {
    //     try {
    //     const userWelcome = await axios.get(`/user/welcome`);
    //     const { isAdmin, storeUuid, h1Text, message } = userWelcome.data;
    //     const h1  = document.querySelector('.header__item--h1');
    //     h1.innerHTML = h1Text;
    //     swal({
    //         title: `"${h1Text}" virtual mall`,
    //         text: message,
    //         button: "Great, lets go!",
    //     }).then(() => {
    //         if (isAdmin) window.location.href = `./store.html?storeUuid=${storeUuid}`;
    //         else window.location.href = './store.html?storeUuid=mall';
    //     });
    
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }

    async function loginAdmin(e) {
        try {
            e.preventDefault();
            const adminLoginForm = true
            
            const loginAdminUser = await axios.post('http://localhost:555/user/login', { 
                email: adminEmail, 
                password: adminPassword, 
                adminLoginForm: adminLoginForm });
    
            const { title, text, storeUuid, isLoggedIn } = loginAdminUser.data;
            
            if (isLoggedIn) {
                swal({
                    title: title,
                    text: text,
                    icon: "success",
                    button: "Lets go",
                })
                .then( () => { 
                    setIsStore(true)
                    setStoreID(storeUuid)
                });
            } else {
                swal({
                    title: `Ops.. ${title}`,
                    text: text,
                    icon: "warning",
                    button: "Try again",
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    async function loginCustomer(e) {
        try {
            e.preventDefault();
            const adminLoginForm = false
            const loginCustomerUser = await axios.post('http://localhost:555/user/login', { 
                email: customerEmail, 
                password: customerPassword, 
                adminLoginForm: adminLoginForm });
    
            const { title, text, isLoggedIn } = loginCustomerUser.data;
            
            if (isLoggedIn) {
                swal({
                    title: title,
                    text: text,
                    icon: "success",
                    button: "Lets go",
                })
                .then( () => { 
                    setIsStore(true)
                    setStoreID('mall')
                });
            } else {
                swal({
                    title: `Ops.. ${title}`,
                    text: text,
                    icon: "warning",
                    button: "Try again",
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    }

  const navManagersRegistration = () =>{
        setIsLogin(false)
        setIsCustomerSignUp(false)

  }

  const navCustomerRegistration = () => {
        setIsLogin(false)
        setIsCustomerSignUp(true)
  }


  return (
    <div>
    {isLogin ? <>
    <header class="header">
        <h1 class="header__item header__item--h1">Shop Shop Shop</h1>

        <h4 class="header__item header__item--h4">Store Managers Login</h4>
                
        <form onSubmit={loginAdmin} class="header__item header__item--admin-login-form" id="admin-login-form">
            <div class="form-inputs">
                <input class="form-inputs__item" value={adminEmail} onChange={handleAdminEmail} type="email" name="email"  placeholder="Email address" required />
                <input class="form-inputs__item" value={adminPassword} onChange={handleAdminPassword} type="password" name="password" placeholder="Password" required />
            </div>
            <input class="button" type="submit" value="Login" />
        </form>
        
        <p class="header__item header__item--call-to-register">Join us!</p>
        
        <div class="header__item header__item--register button" onClick={navManagersRegistration}>Managers registration</div>
    </header>

    <main class="main">
        <h1>Login and Unleash The Shopper Within You!</h1>
    
        <form onSubmit={loginCustomer} id="shopper-login-form">
            <div class="form-inputs">
                <label for="email">Email address</label>
                <input type="text" value={customerEmail} onChange={handleCustomerEmail} name="email" placeholder="Email address" required />
                <label for="password">Password</label>
                <input type="password" value={customerPassword} onChange={handleCustomerPassword} name="password" placeholder="Password" required />
            </div>
            <input class="button" type="submit" value="Start Shopping" />
        </form>

        <p>Not a member yet? <span onClick={navCustomerRegistration}>Click here</span> to fix that!</p>
    </main></> : <SignUp/>}
    </div>

  );
}

export default Login;