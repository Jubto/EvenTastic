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
  const [loggedIn] = context.login;
  const [userDp] = context.dp;
  const [, setLogInModal] = context.logInModal;
  const [anchor, setAnchor] = useState(null);

  // TODO: API handling
  // TODO: useHistory

  const handleOpenMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleLogInModal = () => {
    handleCloseMenu();
    setLogInModal(true);
  };

  const handleLogout = () => {
    const [, setLoggedIn] = context.login;
    const [, setEmail] = context.login;
    const [, setUserType] = context.login;
    setLoggedIn(null);
    setEmail(null);
    setUserType(null);
  };

  return (
    <>
    <Tooltip title="Open account menu" enterDelay={10}>
      <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
        <Avatar src={loggedIn && userDp}/>
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
            <MenuItem component={Link} to={'/create-event'}>
              Create an Event
            </MenuItem>
            <MenuItem component={Link} to={'/account'}>
              My Account
            </MenuItem>
            <MenuItem component={Link} to={'/'} onClick={handleLogout}>
              Logout
            </MenuItem>
          </div>
        : <div>
            <MenuItem onClick={handleLogInModal}>
              Log in
            </MenuItem>
            <MenuItem component={Link} to={'/register'} onClick={handleCloseMenu}>
              Sign Up
            </MenuItem>
            <Tooltip title="log in to create event" placement="left">
              <MenuItem onClick={handleLogInModal}>
                Create an Event
              </MenuItem>
            </Tooltip>
            <Tooltip title="log in to access account" placement="left">
              <MenuItem onClick={handleLogInModal}>
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