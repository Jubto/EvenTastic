import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AccountAPI from "../utils/AccountAPIHelper";
import { StoreContext } from '../utils/context'
import { FlexBox, PageContainer } from '../components/styles/layouts.styled'
import CustomerRegisterModal from '../components/account/modal/CustomerRegisterModal';
import HostRegisterModal from '../components/account/modal/HostRegisterModal';
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
  display: ${( {show} ) => show === 'Host' ? 'initial' : 'none'};
`

const RegisterPage = () => {
  const navigate = useNavigate();
  const context = useContext(StoreContext);
  const [openCustomerModal, setCustomerModal] = useState(null);
  const [openHostModal, setHostModal] = useState(null);
  const [loggedIn, setLoggedIn] = context.login;
  const [, setAccount] = context.account;
  const [, setHostDetails] = context.host;
  const [hostInputs, setHostInputs] = useState('Customer');
  const [formErrors, setformErrors] = useState({
    error: false,
    firstName: null,
    lastName: null,
    email: null,
    password1: null,
    password2: null,
    organisation: null,
    orgLink: null,
    orgPosition: null,
    mobile: null
  })

  const handleSubmit = (event) => {
    event.preventDefault();
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

    formErrors.error = false;

    if (!/[a-zA-Z]+/.test(firstName)) {
      setformErrors(prevState => { return { ...prevState, firstName: true } })
      formErrors.error = true
    }
    if (!/[a-zA-Z]+/.test(lastName)) {
      setformErrors(prevState => { return { ...prevState, lastName: true } })
      formErrors.error = true
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setformErrors(prevState => { return { ...prevState, email: true } })
      formErrors.error = true
    }
    if (!/\S+/.test(password1) || password1.length < 8) {
      setformErrors(prevState => { return { ...prevState, password1: true } })
      formErrors.error = true
    }
    if (password1 !== password2) {
      setformErrors(prevState => { return { ...prevState, password2: true } })
      formErrors.error = true
    }
    if (hostInputs === 'Host') {
      if (!/\S+/.test(organisation)) {
        setformErrors(prevState => { return { ...prevState, organisation: true } })
        formErrors.error = true
      }
      if (!/\S+/.test(orgLink)) {
        setformErrors(prevState => { return { ...prevState, orgLink: true } })
        formErrors.error = true
      }
      if (!/\S+/.test(orgPosition)) {
        setformErrors(prevState => { return { ...prevState, orgPosition: true } })
        formErrors.error = true
      }
      if (!/\d+/.test(mobile) || mobile.length < 9) {
        setformErrors(prevState => { return { ...prevState, mobile: true } })
        formErrors.error = true
      }
    }

    if (!formErrors.error) {
      const body = {
        "account_type": hostInputs,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password1,
        "mobile": mobile,
      }
      api.addAccount(body)
      .then((response) => {
        setLoggedIn(true)
        setAccount(response.data)
        if (hostInputs === 'Host') {
          const accountID = response.data.account_id
          const hostDetails = {
            host_contact_no: mobile,
            isVerified: false,
            host_status: 'Pending',
            job_title: orgPosition,
            org_desc: orgLink,
            org_name: organisation,
          }
          api.updateHost(accountID, hostDetails)
          .then((response) => {
            setHostDetails(response.data)
            setHostModal(true)
          })
          .catch((error) => console.log(error))
        }
        else {
          setCustomerModal(true)
        }
      })
      .catch((error) => console.log(error))
    }
  };

  useEffect(() => {
    if (loggedIn && (!openCustomerModal && !openHostModal)) {
      navigate('/'); // send user to home if they close modal without selecting 'tags' or 'skip'
    }
  }, [openCustomerModal, openHostModal])

  console.log(hostInputs)

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
                helperText={formErrors.firstName ? 'Must be a valid firstname.' : ''}
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
                helperText={formErrors.lastName ? 'Must be a valid lastname.' : ''}
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
                  <IconButton size='small' sx={{ml:'1rem'}} onClick={() => setHostInputs('Customer')}>
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
                  formErrors.organisation && setformErrors(prevState => { return { ...prevState, organisation: false } })
                }}
                error={formErrors.organisation}
                helperText={formErrors.organisation ? 'Cannot be empty.' : ''}
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
                  formErrors.orgPosition && setformErrors(prevState => { return { ...prevState, orgPosition: false } })
                }}
                error={formErrors.orgPosition}
                helperText={formErrors.orgPosition ? 'Cannot be empty.' : ''}
              />
            </ToggleGrid>
            <ToggleGrid show={hostInputs} item xs={12} sm={6}>
              <TextField
                name="mobile"
                required={hostInputs ? true : false}
                fullWidth
                id="mobile"
                label="Your mobile"
                type="tel"
                autoFocus
                onChange={() => {
                  formErrors.mobile && setformErrors(prevState => { return { ...prevState, mobile: false } })
                }}
                error={formErrors.mobile}
                helperText={formErrors.mobile ? 'Must be a valid mobile number.' : ''}
              />
            </ToggleGrid>

            {/* Submit button section */}

            {hostInputs === 'Host'
            ? <span/>
            : <FlexBox direction='column' sx={{ ml:3 }}>
                <Typography variant='subtitle1' sx={{color: 'success.main', fontWeight:1000 }}>
                  Want to host events?
                </Typography>
                <Button onClick={() => setHostInputs('Host')} variant="contained" color='success'>
                  Add host details
                </Button>
              </FlexBox>
            }
            {hostInputs === 'Host'
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
      <CustomerRegisterModal open={openCustomerModal} setOpen={setCustomerModal}/>
      <HostRegisterModal open={openHostModal} setOpen={setHostModal}/>
    </PageContainer>
  )
}

export default RegisterPage