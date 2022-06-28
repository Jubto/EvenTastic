import { useContext, useState, useRef } from 'react';
import { StoreContext } from '../../../utils/context';
import AccountAPI from '../../../utils/AccountAPIHelper';
import AccountUpdatedModal from '../modal/AccountUpdatedModal'
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  styled
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const api = new AccountAPI();

const ImageHolder = styled(Button)`
  border: 1px solid black;
  cursor: pointer;
  height:0;
  width:100%;
  padding-bottom:100%;
  background-color: ${({ theme }) => theme.palette.evenTastic.dull};
`

const Image = styled('img')`
  margin-top: auto;
  width: 100%;
`

const AccountDetailsScreen = () => {
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const typeTrack = useRef();
  const [OpenModal, setOpenModal] = useState(null);
  const [imgUpload, setImageUpload] = useState(null);
  const [formErrors, setformErrors] = useState({
    error: false,
    firstName: null,
    lastName: null,
    age: null,
    mobile: null,
    email: null,
    cardDetails: null,
    password1: null,
    password2: null,
  })

  const displayImage = async (event) => {
    const fileName = event.target.files[0].name
    setImageUpload(fileName)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const blurb = data.get('blurb')
    const firstName = data.get('firstName')
    const lastName = data.get('lastName')
    const age = data.get('age')
    const mobile = data.get('mobile')
    const email = data.get('email')
    const location = data.get('location')
    const cardDetails = data.get('cardDetails')
    const password1 = data.get('password1')
    const password2 = data.get('password2')

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
    if (/\S+/.test(password1) && password1.length < 8) {
      setformErrors(prevState => { return { ...prevState, password1: true } })
      formErrors.error = true
    }
    if (/\S+/.test(password1) && password1 !== password2) {
      setformErrors(prevState => { return { ...prevState, password2: true } })
      formErrors.error = true
    }
    if (!/\d+/.test(age)) {
      setformErrors(prevState => { return { ...prevState, age: true } })
      formErrors.error = true
    }
    if (!/\d+/.test(mobile) || mobile.length < 9) {
      setformErrors(prevState => { return { ...prevState, mobile: true } })
      formErrors.error = true
    }
    if (!/\d+/.test(cardDetails) || cardDetails.length < 9) {
      setformErrors(prevState => { return { ...prevState, cardDetails: true } })
      formErrors.error = true
    }

    if (!formErrors.error) {
      const body = {
        "first_name": firstName ? firstName : account.first_name,
        "last_name": lastName ? lastName : account.last_name,
        "age": age ? parseInt(age) : parseInt(account.age),
        "mobile": mobile ? mobile : account.mobile,
        "email": email ? email : account.email,
        "location": location ? location : account.location,
        "password": password1 ? password1 : account.password,
        "cardDetails": cardDetails ? cardDetails : account.cardDetails,
        "profile_pic": imgUpload ? imgUpload : account.profile_pic
      }
      console.log('body is:')
      console.log(body)
      api.putAccount(account.account_id, body)
      .then((response) => {
        setAccount(prevState => { return { ...prevState, ...body } })
        setOpenModal(true)
        console.log(response)
      })
      .catch((error) => console.log(error))
    }
  };

  return (
    <div>
      <Typography variant='h6'>
        Account details
      </Typography>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <Grid component="form" noValidate onSubmit={handleSubmit} container spacing={2}>
        <Grid item xs={12} sm={5}>
          <ImageHolder component='label'>
            <input
              hidden type="file" name="profilePicture"
              id="profilePicture" label="profilePicture" onChange={displayImage}
            />
            {(() => {
              if (account.profile_pic && !imgUpload) {
                return (
                  <Image
                    src={`${process.env.PUBLIC_URL}/img/profile-dp/${account.profile_pic}`}
                    alt="Account profile picture"
                  />
                )
              } else if (imgUpload) {
                return (
                  <Image
                    src={`${process.env.PUBLIC_URL}/img/profile-dp/${imgUpload}`}
                    alt="Account profile picture"
                  />
                )
              } else {
                return (
                  <AddAPhotoIcon fontSize='large' color='disabled' sx={{ mt: '100%' }} />
                )
              }
            })()}

          </ImageHolder>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            name="blurb"
            required
            fullWidth
            multiline
            rows={9}
            defaultValue={'None'}
            id="blurb"
            label="Your blurb"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            required
            fullWidth
            defaultValue={account.first_name}
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
            defaultValue={account.last_name}
            id="lastName"
            label="Last Name"
            autoFocus
            onChange={() => {
              formErrors.lastName && setformErrors(prevState => { return { ...prevState, lastName: false } })
            }}
            error={formErrors.lastName}
            helperText={formErrors.lastName ? 'Must be a valid lastName.' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="gender"
            required
            fullWidth
            defaultValue={'none'}
            id="gender"
            label="Gender"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="age"
            required
            fullWidth
            defaultValue={account.age}
            id="age"
            label="Age"
            autoFocus
            onChange={() => {
              formErrors.age && setformErrors(prevState => { return { ...prevState, age: false } })
            }}
            error={formErrors.age}
            helperText={formErrors.age ? 'Must be a valid age.' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="mobile"
            required
            fullWidth
            type="tel"
            defaultValue={account.mobile}
            id="mobile"
            label="Mobile"
            autoFocus
            onChange={() => {
              formErrors.mobile && setformErrors(prevState => { return { ...prevState, mobile: false } })
            }}
            error={formErrors.mobile}
            helperText={formErrors.mobile ? 'Must be a valid mobile.' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            required
            fullWidth
            defaultValue={account.email}
            id="email"
            label="Email"
            autoFocus
            onChange={() => {
              formErrors.email && setformErrors(prevState => { return { ...prevState, email: false } })
            }}
            error={formErrors.email}
            helperText={formErrors.email ? 'Must be a valid email.' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="location"
            required
            fullWidth
            defaultValue={account.location}
            id="location"
            label="Location"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="cardDetails"
            required
            fullWidth
            defaultValue={account.cardDetails}
            id="cardDetails"
            label="Card details"
            autoFocus
            onChange={() => {
              formErrors.cardDetails && setformErrors(prevState => { return { ...prevState, cardDetails: false } })
            }}
            error={formErrors.cardDetails}
            helperText={formErrors.cardDetails ? 'Must be a valid cardDetails.' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="password1"
            required
            fullWidth
            type="password"
            id="password1"
            label="Change password"
            autoFocus
            autoComplete='off'
            onChange={() => {
              formErrors.password1 && setformErrors(prevState => { return { ...prevState, password1: false } })
            }}
            error={formErrors.password1}
            helperText={formErrors.password1 ? 'Must contain at least 8 characters.' : ''}
          />
        </Grid>
        {formErrors.password1
          ? <Grid item xs={12} sm={6}>
            <TextField
              name="password2"
              required
              fullWidth
              type="password"
              id="password2"
              label="Confirm password"
              autoFocus
              autoComplete='off'
              onChange={() => {
                formErrors.password2 && setformErrors(prevState => { return { ...prevState, password2: false } })
              }}
              error={formErrors.password2}
              helperText={formErrors.password2 ? 'Passwords must match.' : ''}
            />
          </Grid>
          : ''
        }
        <Grid item xs={12} sm={6}>
          <Button type='submit' variant="contained" fullWidth>
            Save changes
          </Button>
        </Grid>
      </Grid>
      <AccountUpdatedModal open={OpenModal} setOpen={setOpenModal}/>
    </div>
  )
}

export default AccountDetailsScreen