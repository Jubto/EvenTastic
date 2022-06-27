import { useState, useContext } from 'react';
import AccountAPI from '../../utils/AccountAPIHelper';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../utils/context';
import ModalTitle from '../modal/ModalTitle';
import { FlexBox } from '../styles/layouts.styled';
import {
  Button,
  Dialog,
  TextField,
  Typography,
} from '@mui/material';

const api = new AccountAPI();

const LogInModal = () => {
  const context = useContext(StoreContext);
  const [, setLoggedIn] = context.login;
  const [, setEmail] = context.email;
  const [, setUserType] = context.type;
  const [, setuserDp] = context.dp;
  const [open, setOpen] = context.logInModal;
  const [formErrors, setformErrors] = useState({
    error: false,
    email: null,
    password: null,
  })

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')

    formErrors.error = false;

    if (!/\S+/.test(email)) {
      setformErrors(prevState => { return { ...prevState, email: true } })
      formErrors.error = true
    }
    if (!/\S+/.test(password)) {
      setformErrors(prevState => { return { ...prevState, password: true } })
      formErrors.error = true
    }

    if (!formErrors.error) {

      const param = {
        'email': email
      }

      api.getAccounts(param)
      .then((response) => console.log(`success ${response}`))
      .catch((error) => console.log(`error ${error}`))
      
      setLoggedIn(true);
      setEmail(email);
      setUserType(null);
      setuserDp(null);
      handleClose()
    }    

  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title='Log into EvenTastic!' close={handleClose}/>
      <FlexBox justify='space-around' align='center'>
        <FlexBox 
          component="form" noValidate onSubmit={handleSubmit}
          direction='column' sx={{width:'50%'}}
        >
          <TextField
              name="email"
              required
              label="Account email"
              sx={{m: 2, width: '100%'}}
              autoFocus
              onChange={() => {
                formErrors.email && setformErrors(prevState => { return { ...prevState, email: false } })
              }}
              error={formErrors.email}
              helperText={formErrors.email ? 'Cannot be empty.' : ''}
          />
          <TextField
              name="password"
              required
              label="Password"
              type="password"
              sx={{m: 2, width: '100%'}}
              autoFocus
              onChange={() => {
                formErrors.password && setformErrors(prevState => { return { ...prevState, password: false } })
              }}
              error={formErrors.password}
              helperText={formErrors.password ? 'Cannot be empty.' : ''}
          />
          <Button type='submit' variant="contained" sx={{m:2, mb:4}}>
            Log in        
          </Button>
        </FlexBox>
        <FlexBox direction='column'>
          <Typography>
            No account?
          </Typography>
          <Button 
            component={Link} to={'/register'}
            variant="contained" color="success" onClick={handleClose}
          >
            Sign up
          </Button>
        </FlexBox>

      </FlexBox>
    </Dialog>
  )
}

export default LogInModal