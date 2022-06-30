import { Link } from 'react-router-dom';
import ModalTitle from '../../modal/ModalTitle';
import { ModalBody } from '../../modal/ModalBody.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, Dialog } from '@mui/material';

const CustomerRegisterModal = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title='Account registered!' close={handleClose} />
      <ModalBody>
        Welcome! You are now a registered EvenTastic user!
        Customise your event feed now by adding interest tags to your profile!
      </ModalBody>
      <FlexBox justify='space-between'>
        <Button
          component={Link} to={'/account?test=yolo'} state={{ from: '/register' }}
          variant='contained' size='small'
          sx={{ backgroundColor: 'evenTastic.dull', m: '1rem' }}
        >
          Skip
        </Button>
        <Button
          component={Link} to={'/tags'}
          variant='contained' size='small'
          sx={{ m: '1rem' }}
        >
          Add tags
        </Button>
      </FlexBox>
    </Dialog>
  )
}

export default CustomerRegisterModal