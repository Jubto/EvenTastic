import { useState, useContext } from 'react';
import AccountAPI from "../utils/AccountAPIHelper";
import { StoreContext } from '../utils/context'
import { FlexBox, PageContainer } from '../components/styles/layouts.styled'
// import CustomerRegisterModal from '../components/account/CustomerRegisterModal';
// import HostRegisterModal from '../components/account/HostRegisterModal';
import UndoIcon from '@mui/icons-material/Undo';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';

const api = new AccountAPI();

const ImageBanner = styled('div')`
  width: 35vw;
  margin-left: ${( {ml} ) => ml + 'rem'};
  margin-right: ${( {mr} ) => mr + 'rem'};
  margin-bottom: 1rem;
  background-image: url('../img/stock/stock-event-image.jpg');
  background-size: cover;
  background-position: ${({ pos }) => pos};

  ${({theme}) => theme.breakpoints.down("lg")} {
    margin-left: ${( {ml} ) => '1rem'};
    margin-right: ${( {mr} ) => '1rem'};
  }

  ${({theme}) => theme.breakpoints.down("md")} {
    display: none;
  }
`

const ToggleGrid = styled(Grid)`
  display: ${( {show} ) => show ? 'initial' : 'none'};
`

const RegisterPage = () => {
  const context = useContext(StoreContext); // access global states
  const [loggedIn, setLoggedIn] = context.login;
  const [email, setEmail] = context.email;
  const [userType, setUserType] = context.type;
  const [hostInputs, setHostInputs] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [formErrors, setformErrors] = useState({
    fine: true,
    firstName: null,
    lastName: null,
    email: null,
    password1: null,
    password2: null,
    org: null,
    orgLink: null,
    orgPos: null,
    mobile: null
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    formErrors.fine = true;
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName')
    const lastName = data.get('lastName')
    const email = data.get('email')
    const password1 = data.get('password1')
    const password2 = data.get('password2')
    const organisation = data.get('organisation')
    const orgLink = data.get('orgLink')
    const orgPosition = data.get('orgPosition')
    const mobile = data.get('mobile')

    if (!/\S+/.test(firstName)) {
      setformErrors(prevState => { return { ...prevState, firstName: true } })
      formErrors.fine = false
    }
    if (!/\S+/.test(lastName)) {
      setformErrors(prevState => { return { ...prevState, lastName: true } })
      formErrors.fine = false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setformErrors(prevState => { return { ...prevState, email: true } })
      formErrors.fine = false
    }
    if (!/\S+/.test(password1) || password1.length < 8) {
      setformErrors(prevState => { return { ...prevState, password1: true } })
      formErrors.fine = false
    }
    if (password1 !== password2) {
      setformErrors(prevState => { return { ...prevState, password2: true } })
      formErrors.fine = false
    }
    if (hostInputs) {
      if (!/\S+/.test(organisation)) {
        setformErrors(prevState => { return { ...prevState, organisation: true } })
        formErrors.fine = false
      }
      if (!/\S+/.test(orgLink)) {
        setformErrors(prevState => { return { ...prevState, orgLink: true } })
        formErrors.fine = false
      }
      if (!/\S+/.test(orgPosition)) {
        setformErrors(prevState => { return { ...prevState, orgPosition: true } })
        formErrors.fine = false
      }
      if (!/\S+/.test(mobile)) {
        setformErrors(prevState => { return { ...prevState, mobile: true } })
        formErrors.fine = false
      }
    }

    if (formErrors.fine) {
      const body = {
        "account_type": hostInputs ? 'host' : 'customer',
        "first_name": firstName,
        "last_name": lastName,
        "location": "unknown",
        "email": email,
        "password": password1,
        "mobile": mobile,
        "profile_pic": "None",
        "age": null,
        "reward_points": null,
        "tags": [
          {}
        ]
      }
      api.addAccount(body)
      .then((response) => console.log(`hey ${response}`))
      .catch((error) => console.log(`error ${error}`))
    }    

  };

  return (
    <PageContainer direction='row' justify='center' maxWidth='xl'>
      <ImageBanner pos='left' mr='3.5'/>
      <FlexBox direction='column'>
        <Typography variant='h3' align='center' sx={{ mt:10,
          color: 'evenTastic.title' }}>
          Create an account
        </Typography>
        <Typography variant='h6' align='center' sx={{ mb:5, color: 'evenTastic.title' }}>
          start having an evenTastic time!
        </Typography>
        <form component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{height:'40vh', maxWidth: '50vw', minWidth:'400px'}}>

            {/* Customer detail section */}

            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={() => {
                  formErrors.firstName && setformErrors(prevState => { return { ...prevState, firstName: false } })
                }}
                error={formErrors.firstName}
                helperText={formErrors.firstName ? 'Cannot be empty.' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                onChange={() => {
                  formErrors.lastName && setformErrors(prevState => { return { ...prevState, lastName: false } })
                }}
                error={formErrors.lastName}
                helperText={formErrors.lastName ? 'Cannot be empty.' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={() => {
                  formErrors.email && setformErrors(prevState => { return { ...prevState, email: false } })
                }}
                error={formErrors.email}
                helperText={formErrors.email ? 'Invalid email.' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password1"
                required
                fullWidth
                type="password"
                id="password1"
                label="Password"
                autoFocus
                onChange={() => {
                  formErrors.password1 && setformErrors(prevState => { return { ...prevState, password1: false } })
                }}
                error={formErrors.password1}
                helperText={formErrors.password1 ? 'Cannot be empty. Must contain at least 8 characters.' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password2"
                required={hostInputs ? true : false}
                fullWidth
                type="password"
                id="password2"
                label="Confirm password"
                autoFocus
                onChange={() => {
                  formErrors.password2 && setformErrors(prevState => { return { ...prevState, password2: false } })
                }}
                error={formErrors.password2}
                helperText={formErrors.password2 ? 'Passwords must match.' : ''}
              />
            </Grid>

            {/* Host detail section */}

            <ToggleGrid show={hostInputs} item xs={12} sm={6}>
              <FlexBox>
                <Typography variant='subtitle1' sx={{color: 'success.main', fontWeight:1000 }}>
                  Host details:
                </Typography>
                <Tooltip title="Nevermind" placement='right'>
                  <IconButton size='small' sx={{ml:'1rem'}} onClick={() => setHostInputs(false)}>
                    <UndoIcon/>
                  </IconButton>
                </Tooltip>
              </FlexBox>
              <TextField
                name="organisation"
                required={hostInputs ? true : false}
                fullWidth
                id="organisation"
                label="Organisation"
                autoFocus
                onChange={() => {
                  formErrors.org && setformErrors(prevState => { return { ...prevState, org: false } })
                }}
                error={formErrors.org}
                helperText={formErrors.org ? 'Cannot be empty.' : ''}
              />
            </ToggleGrid>
            <ToggleGrid show={hostInputs} item xs={12} sm={6}>
              <TextField
                name="orgLink"
                required={hostInputs ? true : false}
                fullWidth
                id="orgLink"
                label="Org link"
                autoFocus
                sx={{mt:{xs:0, sm:4.2}}}
                onChange={() => {
                  formErrors.orgLink && setformErrors(prevState => { return { ...prevState, orgLink: false } })
                }}
                error={formErrors.orgLink}
                helperText={formErrors.orgLink ? 'Cannot be empty.' : ''}
              />
            </ToggleGrid>
            <ToggleGrid show={hostInputs} item xs={12} sm={6}>
              <TextField
                name="orgPosition"
                required={hostInputs ? true : false}
                fullWidth
                id="orgPosition"
                label="Org position"
                autoFocus
                onChange={() => {
                  formErrors.orgPos && setformErrors(prevState => { return { ...prevState, orgPos: false } })
                }}
                error={formErrors.orgPos}
                helperText={formErrors.orgPos ? 'Cannot be empty.' : ''}
              />
            </ToggleGrid>
            <ToggleGrid show={hostInputs} item xs={12} sm={6}>
              <TextField
                name="mobile"
                required={hostInputs ? true : false}
                fullWidth
                id="mobile"
                label="Your mobile"
                autoFocus
                onChange={() => {
                  formErrors.mobile && setformErrors(prevState => { return { ...prevState, mobile: false } })
                }}
                error={formErrors.mobile}
                helperText={formErrors.mobile ? 'Cannot be empty.' : ''}
              />
            </ToggleGrid>

            {/* Submit button section */}

            {hostInputs
            ? <span/>
            : <FlexBox direction='column' sx={{ ml:3 }}>
                <Typography variant='subtitle1' sx={{color: 'success.main', fontWeight:1000 }}>
                  Want to host events?
                </Typography>
                <Button onClick={() => setHostInputs(true)} variant="contained" color='success'>
                  Add host details
                </Button>
              </FlexBox>
            }
            {hostInputs
            ? <Button type='submit' variant="contained" fullWidth sx={{ml:'1rem', mt:'1rem'}}>
                Register as host
              </Button>
            : <Button type='submit' variant="contained" fullWidth sx={{ml:'1rem', mt:'1rem'}}>
                Sign up
              </Button>
            }
          </Grid>
        </form>
      </FlexBox>
      <ImageBanner pos='right' ml='3.5'/>
    </PageContainer>
  )
}

export default RegisterPage