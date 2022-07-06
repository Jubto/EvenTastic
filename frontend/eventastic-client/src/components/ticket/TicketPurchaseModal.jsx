import TicketSelection from './pages/TicketSelection';
import TicketSummary from './pages/TicketSummary';
import { FlexBox } from '../styles/layouts.styled';
import ModalTitle from '../styles/modal/ModalTitle';
import { LargeModal, ModalBodyLarge } from '../styles/modal/Modal.styled';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, Dialog, styled } from '@mui/material';


const TicketPurchaseModal = ({ open, setOpen, event }) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="login modal" maxWidth='lg'>
      <ModalTitle title={'Ticket purchase'} close={handleClose}/>
      <ModalBodyLarge>
        <FlexBox>
          <TicketSelection/>
          {/* <Divider orientation='vertical'/> */}
          <TicketSummary/>
        </FlexBox>
      </ModalBodyLarge>
      <FlexBox justify='end'>
        <Button
          onClick={handleClose}
          variant='contained' size='small'
          sx={{ m: '1rem' }}
        >
          continue
        </Button>
      </FlexBox>
    </LargeModal>
  )
}

export default TicketPurchaseModal


