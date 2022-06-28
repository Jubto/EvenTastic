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
  const [loggedIn, setLoggedIn] = context.login;
  const [account, setAccount] = context.account;
  const [, setHostDetails] = context.host;
  const [, setLogInModal] = context.logInModal;
  const [anchor, setAnchor] = useState(null);

  // TODO: useHistory - to hide this when on register pageS

  const handleOpenMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleLogInModal = (event) => {
    handleCloseMenu();
    setLogInModal(event.target.id);
  };

  const handleLogout = () => {
    handleCloseMenu();
    setLoggedIn(null);
    setAccount(null);
    setHostDetails(null);
  };

  return (
    <>
    <Tooltip title="Open account menu" enterDelay={10}>
      <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
        <Avatar src={loggedIn && account.profile_pic}/>
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '25px' }}
      id="appbar-menu"
      keepMounted
      anchorEl={anchor}
      paperwidth={13}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={Boolean(anchor)}
      onClose={handleCloseMenu}
    >
      {loggedIn
        ? <div>
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
        : <div>
            <MenuItem id='logIn' onClick={handleLogInModal}>
              Log in
            </MenuItem>
            <MenuItem component={Link} to={'/register'} onClick={handleCloseMenu}>
              Sign Up
            </MenuItem>
            <Tooltip title="log in to create event" placement="left">
              <MenuItem id='createEvent' onClick={handleLogInModal}>
                Create an Event
              </MenuItem>
            </Tooltip>
            <Tooltip title="log in to access account" placement="left">
              <MenuItem id='myAccount' onClick={handleLogInModal}>
                My Account
              </MenuItem>
            </Tooltip>
          </div>
      }
    </Menu>
    </>
  )
}

export default AccountMenu