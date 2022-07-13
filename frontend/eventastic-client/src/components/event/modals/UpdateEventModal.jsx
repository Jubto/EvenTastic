import { useState } from 'react';
import EventAPI from '../../../utils/EventAPIHelper';
import { StandardModal, ModalBody, ModalTitle } from '../../styles/modal/modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, TextField, Typography, styled } from '@mui/material';

const eventAPI = new EventAPI();

const UpdateEventModal = ({ open, setOpen, eventDetails, setSuccessModal }) => {
    const [formErrors, setFormErrors] = useState({
      event_title: false,
      event_short_desc: false,
      event_desc: false,
      event_location: false
    })
  
    const handleClose = () => {
      setOpen(false);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const event_title = data.get('event_title')
      const event_short_desc = data.get('event_short_desc')
      const event_desc = data.get('event_desc')
      const event_location = data.get('event_location')
  
      formErrors.error = false;

      if (!event_title) {
        setFormErrors(prevState => { return { ...prevState, event_title: true } })
        formErrors.error = true
      }
  
      if (!event_short_desc) {
        setFormErrors(prevState => { return { ...prevState, event_short_desc: true } })
        formErrors.error = true
      }

      if (!event_desc) {
        setFormErrors(prevState => { return { ...prevState, event_desc: true } })
        formErrors.error = true
      }

      if (!event_location) {
        setFormErrors(prevState => { return { ...prevState, event_location: true } })
        formErrors.error = true
      }

      if (!formErrors.error) {
        try {
          const updatedEvent = {
            event_title: event_title,
            event_short_desc: event_short_desc,
            event_desc: event_desc,
            event_location: event_location
          }
          const response = await eventAPI.putEvent(eventDetails.event_id, updatedEvent)
          console.log(response)          
          handleClose(true)
          setSuccessModal(true)
        }
        catch(err) {
          console.log(err)
        }
      }
    }
  
    return (
      <StandardModal open={open} onClose={handleClose} aria-labelledby="Update Event Modal" maxWidth='lg'>
        <ModalTitle title='Update Event Details' close={handleClose} />
        <ModalBody id='form' component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            name="event_title"
            required
            fullWidth
            id="event_title"
            label="Event Title"
            defaultValue={eventDetails.event_title}
            onChange={() => {
              formErrors.event_title && setFormErrors(prevState => { return { ...prevState, event_title: false } })
            }}
            error={formErrors.event_title}
            helperText={formErrors.event_title ? 'Cannot be empty' : ''}
            sx={{ mb: 2 }}
          />
          <TextField
            name="event_short_desc"
            required
            fullWidth
            id="event_short_desc"
            label="Event Short Description"
            defaultValue={eventDetails.event_short_desc}
            onChange={() => {
              formErrors.event_short_desc && setFormErrors(prevState => { return { ...prevState, event_short_desc: false } })
            }}
            error={formErrors.event_short_desc}
            helperText={formErrors.event_short_desc ? 'Cannot be empty' : ''}
            sx={{ mb: 2 }}
          />
          <TextField
            name="event_location"
            required
            fullWidth
            id="event_location"
            label="Event Location"
            defaultValue={eventDetails.event_location}
            onChange={() => {
              formErrors.event_location && setFormErrors(prevState => { return { ...prevState, event_location: false } })
            }}
            error={formErrors.event_location}
            helperText={formErrors.event_location ? 'Cannot be empty' : ''}
            sx={{ mb: 2 }}
          />
          <TextField
            name="event_desc"
            required
            fullWidth
            id="event_desc"
            label="Event Overview"
            defaultValue={eventDetails.event_desc}
            multiline
            rows={5}
            onChange={() => {
              formErrors.event_desc && setFormErrors(prevState => { return { ...prevState, event_desc: false } })
            }}
            error={formErrors.event_desc}
            helperText={formErrors.event_desc ? 'Cannot be empty' : ''}
            sx={{ mb: 2 }}
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
            Update
          </Button>
  
        </FlexBox>
      </StandardModal>
    )
  }
  
  export default UpdateEventModal