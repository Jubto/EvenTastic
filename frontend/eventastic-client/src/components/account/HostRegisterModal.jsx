import { Link } from 'react-router-dom';
import ModalTitle from '../modal/ModalTitle';
import ModalBody from '../modal/ModalBody';
import { FlexBox } from '../styles/layouts.styled';
import { Box, Button, Dialog } from '@mui/material';

const HostRegisterModal = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title='Account registered!' close={handleClose}/>
      <ModalBody>
        <Box sx={{mb:'1rem'}}>
          Welcome! You have registered as a host on EvenTastic! 
          Host verification will remain pending until our admin team verifies your organisation.
        </Box>
        <Box>
          In the meantime, customise your event feed now by adding interest tags to your profile!
        </Box>
      </ModalBody>
      <FlexBox justify='space-between'>
        <Button 
          component={Link} to={'/tags'}
          variant='contained' size='small'
          sx={{m:'1rem'}}
        >
          Add tags
        </Button>
        <Button 
          component={Link} to={'/account'}
          variant='contained' size='small'
          sx={{backgroundColor:'evenTastic.dull', m:'1rem'}}
        >
          Skip
        </Button>
      </FlexBox>
    </Dialog>
  )
}

export default HostRegisterModal
