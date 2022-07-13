import { useEffect, useContext, useState } from 'react';
import { StoreContext } from '../../utils/context';
import GroupInfoPage from './pages-main/GroupInfoPage'
import GroupChatPage from './pages-main/GroupChatPage';
import GroupRequestsPage from './pages-main/GroupRequestsPage';
import { FlexBox } from '../styles/layouts.styled';
import { StyledTitle, LargeModal, ModalBodyLarge } from '../styles/modal/modal.styled';
import { Button, Divider, IconButton, Tabs , Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GroupMainModal = ({ open, setOpen, eventDetails }) => {
  const context = useContext(StoreContext);
  const [account, setAccount] = context.account;
  const [hostDetails, setHostDetails] = context.host;
  const [page, setPage] = useState('groupInfo')

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
      <StyledTitle direction='column'>
        <FlexBox justify='space-between'>
          <Typography variant='h5'>
            Your group name
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexBox>
        {/* Add MUI TABS */}
      </StyledTitle>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <ModalBodyLarge>
        {(() => {
          if (page === 'groupInfo') {
            return (
              <GroupInfoPage setPage={setPage} />
            )
          }
          else if (page === 'groupChat') {
            return (
              <GroupChatPage setPage={setPage} />
            )
          }
          else if (page === 'groupRequests') {
            return (
              <GroupRequestsPage setPage={setPage} />
            )
          }
        })()}
      </ModalBodyLarge>
    </LargeModal>
  )
}

export default GroupMainModal


