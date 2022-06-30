import { useContext, useEffect, useState, useRef } from 'react';
import { StoreContext } from '../../../utils/context';
import AccountAPI from '../../../utils/AccountAPIHelper';
import AccountUpdatedModal from '../modal/AccountUpdatedModal'
import { FlexBox } from '../../styles/layouts.styled';
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

const ScrollContainer = styled('div')`
  overflow-y: auto;
  padding-right: 4rem;
  width: 100%;
  height: 93%;
`

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

const ToggleGrid = styled(Grid)`
  display: ${( {show} ) => show ? 'initial' : 'none'};
`

const DetailHeaders = ({ title }) => {
  return (
    <div>
      <Typography variant='subtitle1' sx={{ color: 'grey.600', fontWeight: 1000 }}>
        {title}
      </Typography>
      <Divider variant="middle" sx={{ mb: 2 }} />
    </div>
  )
}

const AccountDetailsScreen = ({ change, setChange }) => {
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const [card, setCard] = context.card;
  const [OpenModal, setOpenModal] = useState(false);
  const [imgUpload, setImageUpload] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeCard, setChangeCard] = useState(false);
  const [formErrors, setformErrors] = useState({
    error: false,
    firstName: null,
    lastName: null,
    age: null,
    mobile: null,
    email: null,
    password1: null,
    password2: null,
    cardName: null,
    cardNumber: null,
    cardType: null,
    cardExpiry: null
  })

  const displayImage = async (event) => {
    const fileName = event.target.files[0].name
    console.log(URL.createObjectURL(event.target.files[0]))
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
    if (lastName && !/[a-zA-Z]+/.test(lastName)) {
      setformErrors(prevState => { return { ...prevState, lastName: true } })
      formErrors.error = true
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setformErrors(prevState => { return { ...prevState, email: true } })
      formErrors.error = true
    }
    if (password1 && password1.length < 8) {
      setformErrors(prevState => { return { ...prevState, password1: true } })
      formErrors.error = true
    }
    if (password1 && password1 !== password2) {
      setformErrors(prevState => { return { ...prevState, password2: true } })
      formErrors.error = true
    }
    if (age && !/\d+/.test(age)) {
      setformErrors(prevState => { return { ...prevState, age: true } })
      formErrors.error = true
    }
    if (mobile && (!/\d+/.test(mobile) || mobile.length < 9)) {
      setformErrors(prevState => { return { ...prevState, mobile: true } })
      formErrors.error = true
    }
    if (cardDetails && (!/\d+/.test(cardDetails) || cardDetails.length < 9)) {
      setformErrors(prevState => { return { ...prevState, cardDetails: true } })
      formErrors.error = true
    }

    console.log(email)

    if (!formErrors.error) {
      console.log("NO ERROR")
      // const body = {
      //   "first_name": firstName ? firstName : account.first_name,
      //   "last_name": lastName ? lastName : account.last_name,
      //   "age": age ? parseInt(age) : parseInt(account.age),
      //   "mobile": mobile ? mobile : account.mobile,
      //   "email": email ? email : account.email,
      //   "location": location ? location : account.location,
      //   "password": password1 ? password1 : account.password,
      //   "cardDetails": cardDetails ? cardDetails : account.cardDetails,
      //   "profile_pic": imgUpload ? imgUpload : account.profile_pic
      // }
      // console.log('body is:')
      // console.log(body)
      // api.putAccount(account.account_id, body)
      //   .then((response) => {
      //     setChange(false)
      //     console.log('account before:')
      //     console.log(account)
      //     setAccount(prevState => { return { ...prevState, ...body } })
      //     setOpenModal(true)
      //     console.log(response)
      //     console.log('account now: ')
      //     console.log(account)
      //   })
      //   .catch((error) => console.log(error))
    }
  };

  useEffect(() => {
    console.log('========================details screen')
    console.log('ACCOUNT:')
    console.log(account)
    console.log('card:')
    console.log(card)
    setChange(false)
  }, [])

  return (
    <ScrollContainer>
      <Grid
        onChange={() => !change && setChange(true)}
        id='accountForm' component="form" noValidate onSubmit={handleSubmit}
        container spacing={2} sx={{ mt: 0 }}
      >

        {/* Account image upload */}

        <Grid item sm={12} md={5}>
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

        {/* Account basic details */}

        <Grid item sm={12} md={7}>
          <DetailHeaders title='Account blurb:' />
          <TextField
            name="blurb"
            fullWidth
            multiline
            rows={9}
            defaultValue={'None'}
            id="blurb"
            label="Your blurb"
            autoFocus
            onBlur={() => console.log("TODO blur event")}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <DetailHeaders title='Account basics:' />
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
        <Grid item sm={12} md={6} sx={{ mt: { sm: 0, md: 5.6 } }} >
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
        <Grid item sm={12} md={6}>
          <TextField
            name="gender"
            fullWidth
            defaultValue={'none'}
            id="gender"
            label="Gender"
            autoFocus
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            name="age"
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
        <Grid item sm={12} md={6}>
          <TextField
            name="mobile"
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
        <Grid item sm={12} md={6}>
          <TextField
            name="location"
            fullWidth
            defaultValue={account.location}
            id="location"
            label="Location"
            autoFocus
          />
        </Grid>

        {/* Account email */}

        <Grid item sm={12} md={6}>
          <DetailHeaders title='Account email:' />
          <TextField
            name="email"
            required
            fullWidth
            defaultValue={account.email}
            value={changeEmail ? null : account.email}
            id="email"
            label="Email"
            InputLabelProps={{ shrink: true }}
            autoFocus
            disabled={!changeEmail}
            onChange={() => {
              formErrors.email && setformErrors(prevState => { return { ...prevState, email: false } })
            }}
            error={formErrors.email}
            helperText={formErrors.email ? 'Must be a valid email.' : ''}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Button
            variant="contained" sx={{ mt: { sm: 0, md: 7 }, width: '191px', backgroundColor: 'info.main' }}
            onClick={() => setChangeEmail(!changeEmail)}
          >
            {changeEmail ? 'Undo change' : 'Change email?'}
          </Button>
        </Grid>

        {/* Account password */}

        <Grid item sm={12} md={6}>
          <DetailHeaders title='Account password:' />
          <TextField
            name="password1"
            fullWidth
            type="password"
            id="password1"
            label="Change password"
            autoFocus
            autoComplete="new-password"
            disabled={!changePassword}
            onChange={() => {
              formErrors.password1 && setformErrors(prevState => { return { ...prevState, password1: false } })
            }}
            error={formErrors.password1}
            helperText={formErrors.password1 ? 'Must contain at least 8 characters.' : ''}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Button
            variant="contained" sx={{ mt: { sm: 0, md: 7 }, width: '191px', backgroundColor: 'info.main' }}
            onClick={() => setChangePassword(!changePassword)}
          >
            {changePassword ? 'Undo change' : 'Change password?'}
          </Button>
        </Grid>
        {changePassword
          ? <Grid item md={12}>
            <TextField
              name="password2"
              required
              fullWidth
              type="password"
              id="password2"
              label="Confirm password"
              autoFocus
              autoComplete="new-password"
              onChange={() => {
                formErrors.password2 && setformErrors(prevState => { return { ...prevState, password2: false } })
              }}
              error={formErrors.password2}
              helperText={formErrors.password2 ? 'Passwords must match.' : ''}
              sx={{ width: '49%' }}
            />
          </Grid>
          : ''
        }

        {/* Card details */}

        <Grid item sm={12} md={6}>
          <DetailHeaders title='Credit card details:' />
          {Object.keys(card).length !== 0
            ? <Button
              variant="contained" sx={{ width: '191px', backgroundColor: 'info.main' }}
              onClick={() => setChangeCard(!changeCard)}
            >
              {changeCard ? 'Undo change' : 'Change card?'}
            </Button>
            : <Button
            variant="contained" sx={{ width: '191px', backgroundColor: 'info.main' }}
            onClick={() => setAddCard(!addCard)}
          >
            {addCard ? 'Cancel' : 'Add card?'}
          </Button>
          }
          <TextField
            name="cardName"
            required
            fullWidth
            defaultValue={card.cardName}
            value={changeCard ? null : card.cardName}
            id="cardName"
            label="Card holder name"
            autoFocus
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardName && setformErrors(prevState => { return { ...prevState, cardName: false } })
            }}
            error={formErrors.cardName}
            helperText={formErrors.cardName ? 'Must be a valid card holder name.' : ''}
            sx={{display:addCard ? 'inherit' : 'none', mt:2}}
          />
        </Grid>
        <ToggleGrid show={addCard} item sm={12} md={6}>
          <TextField
            name="cardNumber"
            required
            fullWidth
            defaultValue={card.cardNumber}
            value={changeCard ? null : card.cardNumber}
            id="cardNumber"
            label="Card number"
            autoFocus
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardNumber && setformErrors(prevState => { return { ...prevState, cardNumber: false } })
            }}
            error={formErrors.cardNumber}
            helperText={formErrors.cardNumber ? 'Must be a valid card number.' : ''}
            sx={{mt: { sm: 0, md: 12.2 }}}
          />
        </ToggleGrid>
        <ToggleGrid show={addCard} item sm={12} md={6}>
          <TextField
            name="cardType"
            required
            fullWidth
            defaultValue={card.cardType}
            value={changeCard ? null : card.cardType}
            id="cardType"
            label="Card type"
            autoFocus
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardType && setformErrors(prevState => { return { ...prevState, cardType: false } })
            }}
            error={formErrors.cardType}
            helperText={formErrors.cardType ? 'Must be a valid card type.' : ''}
          />
        </ToggleGrid>
        <ToggleGrid show={addCard} item sm={12} md={6}>
          <TextField
            name="cardExpiry"
            required
            fullWidth
            defaultValue={card.cardExpiry}
            value={changeCard ? null : card.cardExpiry}
            id="cardExpiry"
            label="Card expiry"
            autoFocus
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardExpiry && setformErrors(prevState => { return { ...prevState, cardExpiry: false } })
            }}
            error={formErrors.cardExpiry}
            helperText={formErrors.cardExpiry ? 'Must be a valid card expiry date.' : ''}
          />
        </ToggleGrid>
      </Grid>
      <AccountUpdatedModal open={OpenModal} setOpen={setOpenModal} />
    </ScrollContainer>
  )
}

export default AccountDetailsScreen