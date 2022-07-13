import { useContext, useEffect, useState, useRef } from 'react';
import { fileToDataUrl } from '../../../utils/helpers';
import { StoreContext } from '../../../utils/context';
import AccountAPI from '../../../utils/AccountAPIHelper';
import AccountUpdatedModal from '../modals/AccountUpdatedModal'
import { ScrollContainer } from '../../styles/layouts.styled';
import InfoHeader from '../styles/InfoHeader';
import {
  Button,
  Grid,
  TextField,
  styled
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const api = new AccountAPI();

const ImageHolder = styled(Button)`
  border: 1px solid black;
  cursor: pointer;
  height:100%;
  width:100%;
  max-height: 350px;
  max-width: 350px;
  ${({theme}) => theme.breakpoints.down("md")} {
    max-width: 100%;
  }
  background-color: ${({ theme }) => theme.palette.evenTastic.dull};
`

const Image = styled('img')`
  max-height: 100%;
  max-width: 100%;
`

const ToggleGrid = styled(Grid)`
  display: ${( {show} ) => show ? 'initial' : 'none'};
`

const AccountDetailsPage = ({ change, setChange }) => {
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const [card, setCard] = context.card;
  const ref = useRef(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [imgUpload, setImageUpload] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeCard, setChangeCard] = useState(false);
  const [formErrors, setFormErrors] = useState({
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

  const handleImage = async (event) => {
    const imageFile = event.target.files[0]
    const imageBlob = await fileToDataUrl(imageFile)
    console.log(imageBlob)
    console.log(URL.createObjectURL(imageFile))
    setImageUpload(imageBlob)
  }

  const scrollTo = () => {
    ref.current.scrollIntoView()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const blurb = data.get('blurb')
    const firstName = data.get('firstName')
    const lastName = data.get('lastName')
    const age = data.get('age')
    const mobile = data.get('mobile')
    const location = data.get('location')
    const email = data.get('email')
    const password1 = data.get('password1')
    const password2 = data.get('password2')
    const cardName = data.get('cardName')
    const cardNumber = data.get('cardNumber')
    const cardType = data.get('cardType')
    const cardExpiry = data.get('cardExpiry')

    formErrors.error = false;

    if (!/[a-zA-Z]+/.test(firstName)) {
      setFormErrors(prevState => { return { ...prevState, firstName: true } })
      formErrors.error = true
    }
    if (!/[a-zA-Z]+/.test(lastName)) {
      setFormErrors(prevState => { return { ...prevState, lastName: true } })
      formErrors.error = true
    }
    if (age && (/\d+/.test(age) && (0 > parseInt(age) || parseInt(age) > 120))) {
      setFormErrors(prevState => { return { ...prevState, age: true } })
      formErrors.error = true
    }
    if (mobile && (!/\d+/.test(mobile) || mobile.length < 9)) {
      setFormErrors(prevState => { return { ...prevState, mobile: true } })
      formErrors.error = true
    }
    if (changeEmail && !/\S+@\S+\.\S+/.test(email)) {
      setFormErrors(prevState => { return { ...prevState, email: true } })
      formErrors.error = true
    }
    if (changePassword) {
      if (password1.length < 8) {
        setFormErrors(prevState => { return { ...prevState, password1: true } })
        formErrors.error = true
      }
      if (password1 !== password2) {
        setFormErrors(prevState => { return { ...prevState, password2: true } })
        formErrors.error = true
      }
    }
    if (changeCard) {
      if (!/[a-zA-Z]+/.test(cardName)) {
        setFormErrors(prevState => { return { ...prevState, cardName: true } })
        formErrors.error = true
      }
      if (!/\d+/.test(cardNumber) || cardNumber.length < 16) {
        setFormErrors(prevState => { return { ...prevState, cardNumber: true } })
        formErrors.error = true
      }
      if (!/\S+/.test(cardType)) {
        setFormErrors(prevState => { return { ...prevState, cardType: true } })
        formErrors.error = true
      }
      if (!/\S+/.test(cardExpiry)) {
        setFormErrors(prevState => { return { ...prevState, cardExpiry: true } })
        formErrors.error = true
      }
    }

    if (!formErrors.error) {
      const body = {
        "user_desc": blurb ? blurb : account.user_desc,
        "age": age ? parseInt(age) : account.age ? parseInt(account.age) : 0,
        "email": email ? email : account.email,
        "first_name": firstName ? firstName : account.first_name,
        "last_name": lastName ? lastName : account.last_name,
        "location": location ? location : account.location,
        "mobile": mobile ? mobile : account.mobile,
        "password": password1 ? password1 : account.password,
        "profile_pic": imgUpload ? imgUpload : account.profile_pic
      }
      try {
        const accountRes = await api.putAccount(account.account_id, body)
        setAccount(prevState => { return { ...prevState, ...accountRes.data } })
        if (changeCard) {
          const Cardbody = {
            "card_expiry": cardExpiry,
            "card_name": cardName,
            "card_number": cardNumber,
            "card_type": cardType,
          }
          const cardRes = await api.putAccountCard(account.account_id, Cardbody)
          setCard(cardRes.data)
        }
        setChange(false)
        setChangeEmail(false)
        setChangePassword(false)
        setChangeCard(false)
      }
      catch (error) {
        console.error(error)
      }
      setOpenModal(true)
    }
  };

  useEffect(() => {
    Object.keys(card).length !== 0 && setAddCard(true)
    setChange(false)
  }, [])

  return (
    <ScrollContainer thin pr='1vw'>
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
              id="profilePicture" label="profilePicture" onChange={handleImage}
            />
            {(() => {
              if (account.profile_pic && !imgUpload) {
                return (
                  <Image
                    src={account.profile_pic}
                    alt="Account profile picture"
                  />
                )
              } else if (imgUpload) {
                return (
                  <Image
                    src={imgUpload}
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
          <InfoHeader title='Account blurb:' />
          <TextField
            name="blurb"
            fullWidth
            multiline
            rows={9}
            defaultValue={account.user_desc}
            id="blurb"
            label="Your blurb"
            onBlur={() => console.log("TODO blur event")}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <InfoHeader title='Account basics:' />
          <TextField
            name="firstName"
            required
            fullWidth
            defaultValue={account.first_name}
            id="firstName"
            label="First Name"
            onChange={() => {
              formErrors.firstName && setFormErrors(prevState => { return { ...prevState, firstName: false } })
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
            onChange={() => {
              formErrors.lastName && setFormErrors(prevState => { return { ...prevState, lastName: false } })
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
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            name="age"
            fullWidth
            defaultValue={account.age}
            id="age"
            label="Age"
            onChange={() => {
              formErrors.age && setFormErrors(prevState => { return { ...prevState, age: false } })
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
            onChange={() => {
              formErrors.mobile && setFormErrors(prevState => { return { ...prevState, mobile: false } })
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
          />
        </Grid>

        {/* Account email */}

        <Grid item sm={12} md={6}>
          <InfoHeader title='Account email:' />
          <TextField
            name="email"
            required
            fullWidth
            value={changeEmail ? undefined : account.email}
            id="email"
            label="Email"
            InputLabelProps={{ shrink: true }}
            disabled={!changeEmail}
            onChange={() => {
              formErrors.email && setFormErrors(prevState => { return { ...prevState, email: false } })
            }}
            error={formErrors.email}
            helperText={formErrors.email ? 'Must be a valid email.' : ''}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Button
            variant="contained"
            sx={{ mt: { sm: 0, md: 7 }, width: '191px',
            backgroundColor: changeEmail ? 'evenTastic.dull' : 'info.main' }}
            onClick={() => setChangeEmail(!changeEmail)}
          >
            {changeEmail ? 'Undo change' : 'Change email?'}
          </Button>
        </Grid>

        {/* Account password */}

        <Grid item sm={12} md={6}>
          <InfoHeader title='Account password:' />
          <TextField
            name="password1"
            fullWidth
            type="password"
            id="password1"
            label="Change password"
            autoComplete="new-password"
            disabled={!changePassword}
            onChange={() => {
              formErrors.password1 && setFormErrors(prevState => { return { ...prevState, password1: false } })
            }}
            error={formErrors.password1}
            helperText={formErrors.password1 ? 'Must contain at least 8 characters.' : ''}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Button
            variant="contained"
            sx={{ mt: { sm: 0, md: 7 }, width: '191px',
            backgroundColor: changePassword ? 'evenTastic.dull' : 'info.main'  }}
            onClick={() => setChangePassword(!changePassword)}
          >
            {changePassword ? 'Undo change' : 'Change password?'}
          </Button>
        </Grid>
        {changePassword
          ? <Grid item sm={12} sx={{ width: { md: '100%', lg: '59%' }}}>
            <TextField
              name="password2"
              required
              fullWidth
              type="password"
              id="password2"
              label="Confirm password"
              autoComplete="new-password"
              onChange={() => {
                formErrors.password2 && setFormErrors(prevState => { return { ...prevState, password2: false } })
              }}
              error={formErrors.password2}
              helperText={formErrors.password2 ? 'Passwords must match.' : ''}
              sx={{ width: { sm: '100%', md: '49%' }}}
            />
          </Grid>
          : ''
        }

        {/* Card details */}

        <Grid item sm={12} md={6}>
          <InfoHeader title='Credit card details:' />
          {Object.keys(card).length !== 0
            ? <Button
              variant="contained"
              sx={{ width: '191px', mb:1, backgroundColor: changeCard ? 'evenTastic.dull' : 'info.main'}}
              onClick={() => {
                setChangeCard(!changeCard)}
              }
            >
              {changeCard ? 'Undo change' : 'Change card?'}
            </Button>
            : <Button
            variant="contained"
            sx={{ width: '191px', mb:1, backgroundColor: changeCard ? 'evenTastic.dull' : 'info.main' }}
            onClick={() => {
              setTimeout(scrollTo, 50)
              setAddCard(!addCard)
              setChangeCard(!changeCard)}
            }
          >
            {addCard ? 'Cancel' : 'Add card?'}
          </Button>
          }
          <TextField
            name="cardName"
            required
            fullWidth
            value={changeCard ? undefined : card.card_name}
            id="cardName"
            label="Card holder name"
            InputLabelProps={{ shrink: true }}
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardName && setFormErrors(prevState => { return { ...prevState, cardName: false } })
            }}
            error={formErrors.cardName}
            helperText={formErrors.cardName ? 'Must be a valid card holder name.' : ''}
            sx={{display:addCard ? 'inherit' : 'none', mt:2}}
          />
        </Grid>
        <ToggleGrid show={addCard ? 1:0} item sm={12} md={6}>
          <TextField
            name="cardNumber"
            required
            fullWidth
            value={changeCard ? undefined : card.card_number}
            id="cardNumber"
            label="Card number"
            InputLabelProps={{ shrink: true }}
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardNumber && setFormErrors(prevState => { return { ...prevState, cardNumber: false } })
            }}
            error={formErrors.cardNumber}
            helperText={formErrors.cardNumber ? 'Must be a valid card number.' : ''}
            sx={{mt: { sm: 0, md: 13.2 }}}
          />
        </ToggleGrid>
        <ToggleGrid show={addCard ? 1:0} item sm={12} md={6}>
          <TextField
            name="cardType"
            required
            fullWidth
            value={changeCard ? undefined : card.card_type}
            id="cardType"
            label="Card type"
            InputLabelProps={{ shrink: true }}
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardType && setFormErrors(prevState => { return { ...prevState, cardType: false } })
            }}
            error={formErrors.cardType}
            helperText={formErrors.cardType ? 'Must be a valid card type.' : ''}
          />
        </ToggleGrid>
        <ToggleGrid show={addCard ? 1:0} item sm={12} md={6}>
          <TextField
            name="cardExpiry"
            ref={ref}
            required
            fullWidth
            value={changeCard ? undefined : card.card_expiry}
            id="cardExpiry"
            label="Card expiry"
            InputLabelProps={{ shrink: true }}
            disabled={!changeCard}
            onChange={() => {
              formErrors.cardExpiry && setFormErrors(prevState => { return { ...prevState, cardExpiry: false } })
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

export default AccountDetailsPage