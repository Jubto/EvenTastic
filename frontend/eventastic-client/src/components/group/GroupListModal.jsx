import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../utils/context';
import GroupListingsPage from './pages-listing/GroupListingsPage';
import CreateGroupPage from './pages-listing/CreateGroupPage';
import RequestJoinPage from './pages-listing/RequestJoinPage';
import { FlexBox } from '../styles/layouts.styled';
import { StyledTitle, LargeModal, ModalBodyLarge } from '../styles/modal/modal.styled';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GroupListModal = ({ open, setOpen, eventDetails, groupList, setGroupList, setGroupCreatedModal }) => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  const [loginModal, setLoginModal] = context.logInModal;
  const [requestedGroupId, setRequestedGroupId] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [page, setPage] = useState('listGroups')

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setPage('listGroups'), 200);
  }

  useEffect(() => {
    // Allows redirect after clicking 'create group' if user logs in via prompted login modal
    if (loginModal && !account.account_id) {
      setRedirect('creatGroup')
    }
    else if (!loginModal && !account.account_id) {
      setRedirect('listGroups')
    }
    else {
      setPage(redirect)
    }
    if (!open) {
      setRedirect('listGroups')
    }
  }, [loginModal, open])

  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="Review modal" maxWidth='lg'>
      <StyledTitle justify='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4'>
          {(() => {
            if (page === 'listGroups') return 'Time to find a group!'
            else if (page === 'creatGroup') return 'Create your own group'
            else if (page === 'makeRequest') return 'Request to join a group'
          })()}
        </Typography>
        <FlexBox>
          {page !== 'listGroups'
            ? <Button sx={{ mr: 3 }}
              variant='contained' color='warning'
              onClick={() => setPage('listGroups')}
            >
              Cancel
            </Button>
            : <Button sx={{ mr: 3 }}
              variant='contained' color='success'
              onClick={() => account.account_id ? setPage('creatGroup') : setLoginModal(true)}
            >
              Create new group
            </Button>
          }
          <IconButton aria-label="close" onClick={handleClose} sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </FlexBox>
      </StyledTitle>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <ModalBodyLarge sx={{  overflow: 'hidden'}}>
        {(() => {
          if (page === 'listGroups') {
            return (
              <GroupListingsPage 
                setPage={setPage} 
                groupList={groupList}
                setRequestedGroupId={setRequestedGroupId}
                eventTitle={eventDetails.event_title}
              />
            )
          }
          else if (page === 'creatGroup') {
            return (
              <CreateGroupPage 
                setGroupList={setGroupList} 
                eventID={eventDetails.event_id}
                account={account}
                setOpen={setGroupCreatedModal}
                setParent={setOpen}
              />
            )
          }
          else if (page === 'makeRequest') {
            return (
              <RequestJoinPage 
                setPage={setPage} 
                setGroupList={setGroupList}
                group={groupList.filter((group) => group.group_id === requestedGroupId)[0]}
                account={account}
              />
            )
          }
        })()}
      </ModalBodyLarge>
    </LargeModal>
  )
}

export default GroupListModal


