import { useState, useContext } from 'react'
import { AppContext } from "../components/AppContext"
import '../styles/dist/style.min.css';
import SignUpManager from './SignUpManager'
import SignUpCustomer from './SignUpCustomer'


function SignUp() {

const { isLogin, setIsLogin, isCustomerSignUp, setIsCustomerSignUp } = useContext(AppContext)


  
  return (
   
    <div>
       
        { isCustomerSignUp ? <SignUpCustomer /> :
        <SignUpManager />}
       
    </div>
   
  );
}

export default SignUp;