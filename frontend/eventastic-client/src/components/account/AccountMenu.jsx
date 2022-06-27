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
  const [, setEmail] = context.email;
  const [, setUserType] = context.type;
  const [userDp] = context.dp;
  const [, setLogInModal] = context.logInModal;
  const [anchor, setAnchor] = useState(null);

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
    setLoggedIn(null);
    setEmail(null);
    setUserType(null);
  };

  console.log(`ACCOUNT MENU ${loggedIn}`)

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