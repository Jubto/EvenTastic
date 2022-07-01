import ModalTitle from '../../modal/ModalTitle';
import { ModalBody } from '../../modal/ModalBody.styled';
import { FlexBox } from '../../styles/layouts.styled';
import { Button, Dialog } from '@mui/material';

const HostRegisterModal2 = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title='Host registration requested' close={handleClose} />
      <ModalBody>
        Thank you for registering as a host with us! Host verification will be pending
        until our admin team has verified your organisation.
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

export default HostRegisterModal2
