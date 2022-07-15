import { StandardModal, ModalBody, ModalTitle } from '../../styles/modal/modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, Typography } from '@mui/material';
import EventAPI from "../../../utils/EventAPIHelper"

const api = new EventAPI()

const CancelTicketModal = ({ open, setOpen, toCancel, setCancelBooking }) => {

  const cancelBooking = (bookingID) => {
    const body = {
      op: "replace",
      path: "/booking_status",
      value: "Cancelled"
    }
    api.patchBookings(bookingID, body)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCancel = () => {
    cancelBooking(toCancel)
    setCancelBooking(toCancel)
    handleClose()
  }

  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="Delete booking modal" maxWidth='lg'>
      <ModalTitle title='Cancel booking' close={handleClose} />
      <ModalBody>
        <Typography>
        Are you sure you want to cancel this booking?
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