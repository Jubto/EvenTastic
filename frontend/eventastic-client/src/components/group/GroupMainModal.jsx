import { useEffect, useState } from 'react';
import GroupInfoPage from './pages-main/GroupInfoPage'
import GroupChatPage from './pages-main/GroupChatPage';
import GroupMembersPage from './pages-main/GroupMembersPage';
import GroupRequestsPage from './pages-main/GroupRequestsPage';
import { StyledTitle, LargeModal, ModalBodyLarge } from '../styles/modal/modal.styled';
import { Divider, IconButton, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SubjectIcon from '@mui/icons-material/Subject';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const GroupMainModal = ({
  open,
  setOpen,
  eventDetails,
  groupDetails,
  setGroupDetails,
  setHasLeftGroup,
  account
}) => {
  const [page, setPage] = useState('groupInfo')
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    console.log('Main i fire once');
  }, [])

  return (
    <LargeModal open={open} onClose={handleClose} aria-labelledby="Review modal" maxWidth='lg'>
      <StyledTitle justify='space-between'>
        <Tabs value={value} onChange={handleChange} aria-label="Group tabs">
          <Tab icon={<SubjectIcon />} label="Group Info" onClick={() => setPage('groupInfo')} />
          <Tab icon={<ChatIcon />} label="Group Chat" onClick={() => setPage('groupChat')} />
          <Tab icon={<GroupsIcon />} label="Group Members" onClick={() => setPage('groupMembers')} />
          <Tab icon={<GroupAddIcon />} label="Join Requests" onClick={() => setPage('groupRequests')} />
        </Tabs>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </StyledTitle>
      <Divider variant="middle" sx={{ mb: 2 }} />
      <ModalBodyLarge>
        {(() => {
          if (page === 'groupInfo') {
            return (
              <GroupInfoPage
                groupDetails={groupDetails}
                setGroupDetails={setGroupDetails}
                eventDetails={eventDetails}
                accountID={account.account_id}
              />
            )
          }
          else if (page === 'groupChat') {
            return (
              <GroupChatPage
                groupDetails={groupDetails}
                account={account}
              />
            )
          }
          else if (page === 'groupMembers') {
            return (
              <GroupMembersPage
                groupDetails={groupDetails}
                setGroupDetails={setGroupDetails}
                setHasLeftGroup={setHasLeftGroup}
                setGroupMainModal={setOpen}
              />
            )
          }
          else if (page === 'groupRequests') {
            return (
              <GroupRequestsPage
                groupDetails={groupDetails}
                setGroupDetails={setGroupDetails}
                eventID={eventDetails.event_id}
              />
            )
          }
        })()}
      </ModalBodyLarge>
    </LargeModal>
  )
}

export default GroupMainModal


