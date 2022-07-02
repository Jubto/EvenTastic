import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountAPI from '../../../utils/AccountAPIHelper';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../../utils/context';
import ModalTitle from '../../modal/ModalTitle';
import { ModalBody } from '../../modal/ModalBody.styled';
import { FlexBox } from '../../styles/layouts.styled';
import {
  Button,
  Dialog,
  TextField,
  Typography,
} from '@mui/material';

const api = new AccountAPI();

const LogInModal = () => {
  const navigate = useNavigate();
  const context = useContext(StoreContext);
  const [nextPage] = context.redirect;
  const [, setLoggedIn] = context.login;
  const [, setAccount] = context.account;
  const [, setCard] = context.card;
  const [, setHostDetails] = context.host;
  const [open, setOpen] = context.logInModal;
  const [logInFail, setLogInFail] = useState(null);
  const [formErrors, setformErrors] = useState({
    error: false,
    email: null,
    password: null,
  })

  const handleClose = () => {
    setOpen(false);
  }

  const redirect = () => {
    navigate(nextPage)
    handleClose()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')

    formErrors.error = false;

    if (!/\S+@\S+\.\S+/.test(email)) {
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
      try {
        const accountRes = await api.getAccounts(param)
        const account = accountRes.data[0];
        if (!account || account.password !== password) {
          setLogInFail(true)
        }
        else {
          setAccount(account)
          const cardDetails = await api.getAccountCard(account.account_id)
          setCard(cardDetails.data)
          const hostRes = await api.getHost(account.account_id) 
          const hostDetails = hostRes.data
          Object.keys(hostDetails).length === 0 ? setHostDetails(false) : setHostDetails(hostDetails)
          setLoggedIn(true);
          console.log('================================LOGGED IN================================')
          console.log(account)
          console.log(cardDetails.data)
          console.log(hostDetails)
          redirect()
        }
      }
      catch(error) {
        console.error(error)
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title='Log into EvenTastic!' close={handleClose} />
      <ModalBody component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          name="email"
          required
          label="Account email"
          sx={{ mb: 4, mr:2, width: '100%', maxWidth: '300px' }}
          autoFocus
          onChange={() => {
            formErrors.email && setformErrors(prevState => { return { ...prevState, email: false } })
            logInFail && setLogInFail(false)
          }}
          error={formErrors.email}
          helperText={formErrors.email ? 'Must be a valid email.' : ''}
        />
        <TextField
          name="password"
          required
          label="Password"
          type="password"
          sx={{ mb: 2, mr:2, width: '100%', maxWidth: '300px' }}
          autoFocus
          onChange={() => {
            formErrors.password && setformErrors(prevState => { return { ...prevState, password: false } })
            logInFail && setLogInFail(false)
          }}
          error={formErrors.password}
          helperText={formErrors.password ? 'Cannot be empty.' : ''}
        />
        {logInFail
          ? <Typography variant='subtitle2' sx={{ color: 'error.main', mt: -3 }}>
            Incorrect password or email .. Please try again
          </Typography>
          : ''
        }
        <FlexBox justify='space-between' align='end'>
          <Button type='submit' variant="contained">
            Log in
          </Button>
          <FlexBox direction='column' sx={{ mr: 2 }}>
            <Typography variant='subtitle2' sx={{ color: 'success.main' }} >
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
      </ModalBody>
    </Dialog>
  )
}

export default LogInModal