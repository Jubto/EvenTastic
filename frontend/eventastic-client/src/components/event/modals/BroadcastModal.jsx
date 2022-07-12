import { useState } from 'react';
import EventAPI from '../../../utils/EventAPIHelper';
import { StandardModal, ModalBody, ModalTitle } from '../../styles/modal/modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, TextField, Typography, styled } from '@mui/material';

const api = new EventAPI();

const BroadcastTitle = styled(Typography)`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.palette.evenTastic.grey};
  font-weight: 1000;
`

const BroadcastModal = ({ open, setOpen, eventDetails }) => {
  const [formErrors, setFormErrors] = useState({
    title: false,
    message: false
  })

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title')
    const message = data.get('message')

    formErrors.error = false;
    if (!title) {
      setFormErrors(prevState => { return { ...prevState, title: true } })
      formErrors.error = true
    }
    if (!message) {
      setFormErrors(prevState => { return { ...prevState, message: true } })
      formErrors.error = true
    }

    if (!formErrors.error) {
      const param = {
        'event_id': eventDetails.event_id,
        'booking_status': 'Booked'
      }
      api.getBookings(param)
        .then((res) => {
          const tempBookingData = [
            {
              account_id: 7,
              booking_email: "kentocroft@gmail.com",
              booking_id: 1,
              booking_status: "Booked",
              event_id: 2,
              ticket_details: "{}",
              total_cost: 200
            },
            {
              account_id: 2,
              booking_email: "jubjubfriend@gmail.com",
              booking_id: 1,
              booking_status: "Booked",
              event_id: 2,
              ticket_details: "{}",
              total_cost: 200
            },
            {
              account_id: 2,
              booking_email: "bob@gmail.com",
              booking_id: 1,
              booking_status: "Booked",
              event_id: 2,
              ticket_details: "{}",
              total_cost: 200
            },
            {
              account_id: 2,
              booking_email: "k.croft@student.unsw.edu.au",
              booking_id: 1,
              booking_status: "Booked",
              event_id: 2,
              ticket_details: "{}",
              total_cost: 200
            }
          ]
          // const emailsToBroadcast = res.data.map((booking) => booking.booking_email)
          const emailsToBroadcast = tempBookingData.map((booking) => booking.booking_email)
          console.log(emailsToBroadcast)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="Delete Event modal" maxWidth='lg'>
      <ModalTitle title='Broadcast message' close={handleClose} />
      <ModalBody id='form' component="form" noValidate onSubmit={handleSubmit}>
        <BroadcastTitle variant='subtitle1'>
          Broadcast title
        </BroadcastTitle>
        <TextField
          name="title"
          required
          fullWidth
          id="title"
          label="Broadcast title"
          onChange={() => {
            formErrors.title && setFormErrors(prevState => { return { ...prevState, title: false } })
          }}
          error={formErrors.title}
          helperText={formErrors.title ? 'Cannot be empty' : ''}
          sx={{ mb: 2 }}
        />
        <BroadcastTitle variant='subtitle1'>
          Broadcast message
        </BroadcastTitle>
        <TextField
          name="message"
          required
          fullWidth
          multiline
          rows={6}
          id="message"
          label="Broadcast message"
          onChange={() => {
            formErrors.message && setFormErrors(prevState => { return { ...prevState, message: false } })
          }}
          error={formErrors.message}
          helperText={formErrors.message ? 'Cannot be empty' : ''}
        />
      </ModalBody>
      <FlexBox justify='space-between'>
        <Button onClick={handleClose}
          variant='contained' size='small'
          sx={{ backgroundColor: 'evenTastic.dull', m: '1rem' }}
        >
          Nevermind
        </Button>
        <Button
          variant='contained' size='small' color='success'
          type='submit' form='form' sx={{ m: '1rem' }}
        >
          Broadcast
        </Button>

      </FlexBox>
    </StandardModal>
  )
}

export default BroadcastModal