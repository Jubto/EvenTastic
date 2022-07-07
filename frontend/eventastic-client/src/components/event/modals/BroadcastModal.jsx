import { useState } from 'react';
import { StandardModal, ModalBody, ModalTitle } from '../../styles/modal/modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, TextField, Typography, styled } from '@mui/material';

const BroadcastTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.evenTastic.grey};
  font-weight: 1000;
`

const BroadcastModal = ({ open, setOpen, eventName, setBroadcast }) => {
  const [formErrors, setFormErrors] = useState({
    title: '',
    message: ''
  })

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {

  }

  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="Delete Event modal" maxWidth='lg'>
      <ModalTitle title='Broadcast message' close={handleClose} />
      <ModalBody component="form" noValidate onSubmit={handleSubmit}>
        <BroadcastTitle variant='subtitle1'>
          Event: {eventName}
        </BroadcastTitle>
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
            sx={{ width: { sm: '100%', md: '59%' } }}
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
          type='submit' sx={{ m: '1rem' }}
        >
          Broadcast
        </Button>

      </FlexBox>
    </StandardModal>
  )
}

export default BroadcastModal