import { StandardModal, ModalBody, ModalTitle } from '../../styles/modal/modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button } from '@mui/material';

const UpdateEventSuccessModal = ({ open, setOpen, eventDetails }) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="Update Event Success Modal" maxWidth='lg'>
      <ModalTitle title='Event Updated!' close={handleClose} />
      <ModalBody>
        Your Event Details have been updated.
      </ModalBody>
      <FlexBox justify='space-between'>
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

export default UpdateEventSuccessModal