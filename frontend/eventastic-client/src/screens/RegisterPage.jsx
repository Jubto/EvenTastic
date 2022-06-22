import React from 'react'
import { StoreContext } from '../utils/context'

const RegisterPage = () => {
  const context = React.useContext(StoreContext); // access global states
  const [loggedIn, setLoggedIn] = context.login;
  const [email, setEmail] = context.email;
  const [userType, setUserType] = context.type;

  return (
    <div>RegisterPage</div>
  )
}

export default RegisterPage