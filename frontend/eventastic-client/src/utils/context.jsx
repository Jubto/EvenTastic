import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userType, setUserType] = React.useState('');

  const states = {
    login: [loggedIn, setLoggedIn],
    email: [email, setEmail],
    type: [userType, setUserType]
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
export const useAppContext = () => React.useContext(StoreContext)
