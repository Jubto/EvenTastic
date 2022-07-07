import { StandardModal, ModalBody, ModalTitle } from '../../styles/modal/modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, Typography } from '@mui/material';

const CancelTicketModal = ({ open, setOpen, setCancel }) => {

  const handleClose = () => {
    setOpen(false);
  }

  const handleCancel = () => {
    setCancel(prevstate => !prevstate)
    handleClose()
  }

  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="Delete booking modal" maxWidth='lg'>
      <ModalTitle title='Cancel booking' close={handleClose} />
      <ModalBody>
        <Typography>
        Are you sure you want to cancel the ticket bookings this event?
        </Typography>
      </ModalBody>
      <FlexBox justify='space-between'>
        <Button onClick={handleCancel}
          variant='contained' size='small' color='error'
          sx={{ m: '1rem' }}
        >
          Cancel booking
        </Button>
        <Button onClick={handleClose}
          variant='contained' size='small'
          sx={{ backgroundColor: 'evenTastic.dull', m: '1rem' }}
        >
          Nevermind
        </Button>
      </FlexBox>
    </StandardModal>
  )
}

export default CancelTicketModal