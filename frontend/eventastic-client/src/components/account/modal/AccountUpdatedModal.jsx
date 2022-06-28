import { Link } from 'react-router-dom';
import ModalTitle from '../../modal/ModalTitle';
import { ModalBody } from '../../modal/ModalBody.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, Dialog } from '@mui/material';

const AccountUpdatedModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title='Account updated!' close={handleClose} />
      <ModalBody>
        Your account has been updated!
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
    </Dialog>
  )
}

export default AccountUpdatedModal
