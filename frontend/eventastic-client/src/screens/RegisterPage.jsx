import { useState, useContext } from 'react';
import { StoreContext } from '../utils/context'
import { PageContainer } from '../components/styles/layouts.styled'

const RegisterPage = () => {
  const context = useContext(StoreContext); // access global states
  const [loggedIn, setLoggedIn] = context.login;
  const [email, setEmail] = context.email;
  const [userType, setUserType] = context.type;

  return (
    <PageContainer maxWidth='lg'>
      <div>RegisterPage</div>
    </PageContainer>
  )
}

export default RegisterPage