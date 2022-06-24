import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userDp, setuserDp] = useState(null);
  const [logInModal, setLogInModal] = useState(null);

  const states = {
    login: [loggedIn, setLoggedIn],
    email: [email, setEmail],
    type: [userType, setUserType],
    dp: [userDp, setuserDp],
    logInModal: [logInModal, setLogInModal]
  };

  return (
    <StoreContext.Provider value={states}>
      {children}
    </StoreContext.Provider>
  )
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
