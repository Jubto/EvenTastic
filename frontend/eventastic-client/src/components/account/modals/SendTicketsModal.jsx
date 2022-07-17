import { StandardModal, ModalBody, ModalTitle } from '../../styles/modal/modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button } from '@mui/material';

const SendTicketsModal = ({ open, setOpen, ticketString }) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="send tickets modal" maxWidth='lg'>
      <ModalTitle title='Send Tickets' close={handleClose} />
      <ModalBody>
        Your seats for this booking are {ticketString}. An email will be sent to your registered email ID with the ticket details.
      </ModalBody>
      <FlexBox justify='end'>
        <Button
          onClick={handleClose}
          variant='contained' size='small'
          sx={{ m: '1rem' }}
        >
          continue
        </Button>
      </FlexBox>
    </StandardModal>
  )
}

export default SendTicketsModal
