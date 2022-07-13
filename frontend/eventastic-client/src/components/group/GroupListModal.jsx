import { useEffect, useContext, useState } from 'react';
import { StoreContext } from '../../utils/context';
import GroupListingsPage from './pages-listing/GroupListingsPage';
import CreateGroupPage from './pages-listing/CreateGroupPage';
import RequestJoinPage from './pages-listing/RequestJoinPage';
import { FlexBox } from '../styles/layouts.styled';
import { StyledTitle, LargeModal, ModalBodyLarge } from '../styles/modal/modal.styled';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GroupListModal = ({ open, setOpen, eventDetails }) => {
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const [hostDetails, setHostDetails] = context.host;
  const [page, setPage] = useState('listGroups')

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    // api call: 
    // Get /bookings setReviews()
    // Determine all account_id review interactions
    // setMadeReivew() // Determine if account_id has made a reivew or not
  }, [])

  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="Review modal" maxWidth='lg'>
      <StyledTitle>
        <FlexBox justify='space-between'>
          <Typography variant='h5'>
            Request to join a group that suits you and have fun discussing {eventDetails.event_title}
          </Typography>
          <FlexBox>
            {page !== 'listGroups'
              ? ''
              : <Button sx={{mr:3}}
                  variant='contained' color='success'
                  onClick={() => setPage('creatGroup')}
                >
                  Create your own group
                </Button>
            }
            <IconButton aria-label="close" onClick={handleClose} sx={{ ml: 'auto' }}>
              <CloseIcon />
            </IconButton>
          </FlexBox>
        </FlexBox>
      </StyledTitle>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <ModalBodyLarge>
        {(() => {
          if (page === 'listGroups') {
            return (
              <GroupListingsPage setPage={setPage} />
            )
          }
          else if (page === 'creatGroup') {
            return (
              <CreateGroupPage setPage={setPage} />
            )
          }
          else if (page === 'makeRequest') {
            return (
              <RequestJoinPage setPage={setPage} />
            )
          }
        })()}
      </ModalBodyLarge>
    </LargeModal>
  )
}

export default GroupListModal


