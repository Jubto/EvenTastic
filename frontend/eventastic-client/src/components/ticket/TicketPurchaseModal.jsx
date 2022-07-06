import { useState } from 'react';
import TicketSelection from './pages/TicketSelection';
import PaymentOptions from './pages/PaymentOptions';
import CardDetails from './pages/CardDetails';
import RewardPoints from './pages/RewardPoints';
import TicketSummary from './pages/TicketSummary';
import { FlexBox } from '../styles/layouts.styled';
import ModalTitle from '../styles/modal/ModalTitle';
import { LargeModal, ModalBodyLarge } from '../styles/modal/Modal.styled';
import { Divider } from '@mui/material';


const TicketPurchaseModal = ({ open, setOpen, event }) => {
  const [page, setPage] = useState('selection')
  const [ticketDetails, setTicketDetails] = useState({})

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="Purchase ticket modal" maxWidth='lg'>
      <ModalTitle title={`Purchase tickets for ${event.event_title}`} close={handleClose} />
      <ModalBodyLarge>
        <FlexBox sx={{ height: '100%', mt: -2 }}>
          ${(() => {
            if (page === 'selection') {
              return (
                <TicketSelection setPage={setPage} setTicket={setTicketDetails} />
              )
            }
            else if (page === 'paymentOptions') {
              return (
                <PaymentOptions setPage={setPage} />
              )
            }
            else if (page === 'cardDetails') {
              return (
                <CardDetails setPage={setPage}  />
              )
            }
            else if (page === 'points') {
              return (
                <RewardPoints />
              )
            }
          })()}
          <Divider orientation='vertical' />
          <TicketSummary ticket={ticketDetails} />
        </FlexBox>
      </ModalBodyLarge>
    </LargeModal>
  )
}

export default TicketPurchaseModal


