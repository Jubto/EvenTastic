import { useContext, useEffect, useState } from 'react';
import { ScrollContainer } from "../../styles/layouts.styled"
import { Button, TextField } from "@mui/material"
import { styled } from '@mui/material/styles';
import { StoreContext } from '../../../utils/context';
import AccountAPI from "../../../utils/AccountAPIHelper"
import EventAPI from "../../../utils/EventAPIHelper"
import EmailAPI from '../../../utils/EmailAPIHelper';

const accountAPI = new AccountAPI()
const eventAPI = new EventAPI()
const emailAPI = new EmailAPI();
const evenTasticEmail = 'eventastic.comp9900@gmail.com' 


const MainBox = styled('div')`
  width: 100%;
  margin-left: 50px;
`;

const ContentBox = styled('div')`
  width: 60%;
  height: 70%;
  min-height: 350px;
`;

const ButtonBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const SeatsBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const CardDetails = ({ open, setOpen, setPage, setSuccessModal, totalCost, eventID, generalSeats, frontSeats, middleSeats, backSeats }) => {

  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardType, setCardType] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [formErrors, setFormErrors] = useState({
    cardName: false,
    cardNumber: false,
    cardType: false,
    cardExpiry: false
  })

  const getCardDetils = async (account_id) => {
    try {
      const cardDetails = await accountAPI.getAccountCard(account_id)
      //console.log(cardDetails.data)
      setCardName(cardDetails.data.card_name)
      setCardNumber(cardDetails.data.card_number)
      setCardType(cardDetails.data.card_type)
      setCardExpiry(cardDetails.data.card_expiry)
    }    
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getCardDetils(account.account_id)
  }, [open])

  const isLetters = (str) => /^[A-Za-z]*$/.test(str);
  const isNumbers = (str) => /^[0-9]*$/.test(str);
  
  const changeCardName = (e) => {
    if (isLetters(e.target.value)) {
      setCardName(e.target.value);
      setFormErrors(prevState => { return { ...prevState, cardName: false } })
    }
  }  
  const changeCardType = (e) => {
    if (isLetters(e.target.value)) {
      setCardType(e.target.value);
      setFormErrors(prevState => { return { ...prevState, cardType: false } })
    }
  }
  const changeCardNumber = (e) => {
    if (isNumbers(e.target.value)) {
      setCardNumber(e.target.value);
      setFormErrors(prevState => { return { ...prevState, cardNumber: false } })
    }
  }
  const changeCardExpiry = (e) => {
    if (isNumbers(e.target.value)) {
      setCardExpiry(e.target.value);
      setFormErrors(prevState => { return { ...prevState, cardExpiry: false } })
    }
  }

  const submitBooking = async () => {
    try {
      if (cardName.length == 0){
        setFormErrors(prevState => { return { ...prevState, cardName: true } })
      }
      if (cardNumber.length != 16){
        setFormErrors(prevState => { return { ...prevState, cardNumber: true } })
      }
      if (cardType.length == 0){
        setFormErrors(prevState => { return { ...prevState, cardType: true } })
      }
      if (cardExpiry.length != 4){
        setFormErrors(prevState => { return { ...prevState, cardExpiry: true } })
      } else {
        const bookingParams = {
          account_id: parseInt(account.account_id),
          event_id: parseInt(eventID),
          ticket_details: {
            General: generalSeats,
            Front: frontSeats,
            Middle: middleSeats,
            Back: backSeats,
          },
          total_cost: parseFloat(totalCost)
        }
        //console.log(bookingParams)
        const makeBooking = await eventAPI.addBooking(bookingParams)
        setOpen(false)
        setPage('selection')
        setSuccessModal(true)

        const bookedParams = {
          booking_id: makeBooking.data.booking_id
        }
        const ticketList = await eventAPI.getTickets(bookedParams)
        let seats = ''
        for (let i=0; i<ticketList.data.length; i++) {
          seats += ticketList.data[i].ticket_ref
          if (i < ticketList.data.length-2)
            seats += ', '
          if (i == ticketList.data.length-2)
            seats += ' and '
        }
  
        const message = "Your seats for this booking are "+seats+"."
        const emailTo = [{email_address : account.email}]
          const sendTicketsEmail = {
            email_subject: 'EvenTastic Booking tickets',
            email_content: message,
            email_from: {
              email_address: evenTasticEmail,
              name: "EvenTastic"
            },
            email_to: emailTo
          }
          const emailRes = await emailAPI.postEmails(sendTicketsEmail)

      }
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <ScrollContainer hide height='100%' sx={{ width: '60%' }}>
      <MainBox>
        <ContentBox >
          <div style={{  marginBottom: '20px'}}>
            <b>Card Details:</b>
          </div>
          <div>
          <TextField
            name="cardName"
            required
            fullWidth
            inputProps={{ maxLength: 50 }}
            value={cardName}
            id="cardName"
            label="Card holder name"
            InputLabelProps={{ shrink: true }}
            onChange={changeCardName}
            error={formErrors.cardName}
            helperText={formErrors.cardName ? 'Must be a valid card holder name (at least 1 character long)' : ''}
          />
          <TextField style={{marginTop: '20px'}}
            name="cardNumber"
            required
            fullWidth
            inputProps={{ maxLength: 16 }}
            value={cardNumber}
            id="cardNumber"
            label="Card number"
            InputLabelProps={{ shrink: true }}
            onChange={changeCardNumber}
            error={formErrors.cardNumber}
            helperText={formErrors.cardNumber ? 'Must be a valid 16-digit card number' : ''}
          />
          <TextField style={{marginTop: '20px'}}
            name="cardType"
            required
            fullWidth
            inputProps={{ maxLength: 10 }}
            value={cardType}
            id="cardType"
            label="Card type"
            InputLabelProps={{ shrink: true }}
            onChange={changeCardType}
            error={formErrors.cardType}
            helperText={formErrors.cardType ? 'Must be a valid card type (at least 1 character long)' : ''}
          />
          <TextField style={{marginTop: '20px'}}
            name="cardExpiry"
            required
            fullWidth
            inputProps={{ maxLength: 4 }}
            value={cardExpiry}
            id="cardExpiry"
            label="Card expiry"
            InputLabelProps={{ shrink: true }}
            onChange={changeCardExpiry}
            error={formErrors.cardExpiry}
            helperText={formErrors.cardExpiry ? 'Must be a valid card expiry date of format MM/YY' : ''}
          />
          </div>
        </ContentBox>
        <ButtonBox>
          <Button variant='contained' color="success" onClick={submitBooking}>
            Confirm
          </Button>
          <Button variant='contained' onClick={() => setPage('paymentOptions')}>
            back
          </Button>
        </ButtonBox>
      </MainBox>  
    </ScrollContainer>
  )
}

export default CardDetails
