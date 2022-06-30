import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const [card, setCard] = useState(null);
  const [hostDetails, setHostDetails] = useState(null);
  const [LogInModal, setLogInModal] = useState(false);

  const states = {
    login: [loggedIn, setLoggedIn],
    account: [account, setAccount],
    card: [card, setCard],
    host: [hostDetails, setHostDetails],
    logInModal: [LogInModal, setLogInModal]
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
