import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../utils/context';
import {
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';

const AccountMenu = () => {
  const context = useContext(StoreContext);
  const [, setRedirect] = context.redirect;
  const [loggedIn, setLoggedIn] = context.login;
  const [account, setAccount] = context.account;
  const [, setAccountGroups] = context.groups;
  const [, setCard] = context.card;
  const [, setHostDetails] = context.host;
  const [, setLogInModal] = context.logInModal;
  const [anchor, setAnchor] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleLogInModal = (redirect) => {
    handleCloseMenu();
    setRedirect(redirect)
    setLogInModal(true);
  };

  const handleLogout = () => {
    handleCloseMenu();
    setLoggedIn(false);
    setAccount(false);
    setAccountGroups({})
    setCard({});
    setHostDetails(false);
  };

  return (
    <>
      <Tooltip title="Open account menu" enterDelay={10}>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0, mr:{ xs:'0.25rem', md:'1rem' } }}>
          <Avatar 
            src={account.profile_pic}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '25px' }}
        id="appbar-menu"
        keepMounted
        anchorEl={anchor}
        paperwidth={13}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchor)}
        onClose={handleCloseMenu}
      >
        {(() => {
          if (!loggedIn) {
            return (
              <div>
                <MenuItem id='logIn' onClick={() => handleLogInModal(false)}>
                  Log in
                </MenuItem>
                <MenuItem component={Link} to={'/register'} onClick={handleCloseMenu}>
                  Sign Up
                </MenuItem>
                <Tooltip title="log in to create event" placement="left">
                  <MenuItem id='createEvent' onClick={() => handleLogInModal('/create-event')}>
                    Create an Event
                  </MenuItem>
                </Tooltip>
                <Tooltip title="log in to access account" placement="left">
                  <MenuItem id='myAccount' onClick={() => handleLogInModal('/account')}>
                    My Account
                  </MenuItem>
                </Tooltip>
              </div>
            )
          }
          else if (account.admin) {
            return (
              <div>
                <MenuItem component={Link} to={'/'} onClick={handleLogout}>
                  Admin logout
                </MenuItem>
              </div>
            )
          }
          else {
            return (
              <div>
                <MenuItem component={Link} to={'/create-event'} onClick={handleCloseMenu}>
                  Create an Event
                </MenuItem>
                <MenuItem component={Link} to={'/account'} onClick={handleCloseMenu}>
                  My Account
                </MenuItem>
                <MenuItem component={Link} to={'/'} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </div>
            )
          }
        })()}
      </Menu>
    </>
  )
}

export default AccountMenu