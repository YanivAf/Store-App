import { useState } from 'react'
import { AppContext } from "./components/AppContext"
import './styles/dist/style.min.css';
import Login from './components/Login'
import Store from './components/Store'

function App() {

  const [isLogin, setIsLogin] = useState(true)
  const [isCustomerSignUp, setIsCustomerSignUp] = useState(true)
  const [loggedInInfo, setLoggedInInfo] = useState(null)
  const [isStore, setIsStore] = useState (false)
  const [storeID, setStoreID] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState(null)

  const navLogin = () => {
    setIsLogin(true)
}



  return (
    <AppContext.Provider value={{
    isLogin, 
    setIsLogin,
    isCustomerSignUp, 
    setIsCustomerSignUp,
    loggedInInfo, 
    setLoggedInInfo,
    isStore, 
    setIsStore,
    isStore, 
    setIsStore,
    storeID, 
    setStoreID,
    isAdmin, 
    setIsAdmin,
    user, 
    setUser}}>
    <div>
    <nav class="header">
            <div class="header__item header__item--h1" onClick={navLogin}>Shop Shop Shop</div>
            {isStore && isAdmin && <> <div class="header__item header__item--store">
                <img src="./images/store.png" title="Your store" />
            </div>
            <div class="header__item header__item--purchased">
                <img src="./images/history-cart.png" title="Purchased carts" />
            </div>
            <div class="header__item header__item--add-product" id="add-product" title="Add new product">
            <img src="./images/add-product.png" title="Add new product" />
        </div></>}
            {isStore && <h4 class="header__item header__item--username"><i class="far fa-user"></i>{user.username}</h4>}
            {isStore && <button class="header__item header__item--logout" id="logout"><i class="fas fa-power-off"></i> logout</button>}
        </nav>


      {isStore ? <Store /> : <Login />}
  
    </div>
    </AppContext.Provider>
  );
}

export default App;
