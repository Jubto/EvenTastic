import { StandardModal, ModalBody, ModalTitle } from '../styles/modal/modal.styled';
import { FlexBox } from '../styles/layouts.styled';
import { Button } from '@mui/material';

const PurchaseSuccessModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="purchase success modal" maxWidth='lg'>
      <ModalTitle title='Booking Successful!' close={handleClose} />
      <ModalBody>
        Your booking has been completed successfully. An email will be sent to your registered email ID with the ticket details.
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

export default PurchaseSuccessModal
