import ModalTitle from '../../styles/modal/ModalTitle';
import { StandardModal, ModalBody } from '../../styles/modal/Modal.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, Typography } from '@mui/material';

const CancelEventModal = ({ open, setOpen, setCancel }) => {

  const handleClose = () => {
    setOpen(false);
  }

  const handleCancel = () => {
    setCancel(prevstate => !prevstate)
    handleClose()
  }

  return (
    <StandardModal open={open} onClose={handleClose} aria-labelledby="Delete Event modal" maxWidth='lg'>
      <ModalTitle title='Cancel your Event' close={handleClose} />
      <ModalBody>
        <Typography>
        Are you sure you want to cancel this event you're hosting?
        </Typography>
      </ModalBody>
      <FlexBox justify='space-between'>
        <Button onClick={handleCancel}
          variant='contained' size='small' color='error'
          sx={{ m: '1rem' }}
        >
          Delete Event
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

export default CancelEventModal