import { Link } from 'react-router-dom';
import ModalTitle from '../../modal/ModalTitle';
import { ModalBody } from '../../modal/ModalBody.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, Dialog } from '@mui/material';

const AccountWelcomeModal = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title='Welcome to your account page!' close={handleClose} />
      <ModalBody>
        Welcome to your account management page! Try add a profile picture and more details so others
        get an idea of who you are!
      </ModalBody>
      <FlexBox justify='space-between'>
        <Button
          component={Link} to={'/'}
          variant='contained' size='small'
          sx={{ backgroundColor: 'evenTastic.dull', m: '1rem' }}
        >
          Skip
        </Button>
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

export default AccountWelcomeModal