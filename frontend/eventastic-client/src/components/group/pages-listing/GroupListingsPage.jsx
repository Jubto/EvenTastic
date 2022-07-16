import { useContext, useEffect, forwardRef, useState } from "react";
import { StoreContext } from "../../../utils/context";
import { ScrollContainer } from "../../styles/layouts.styled"
import GroupPendingModal from "../modals/GroupPendingModal";
import { Button, Chip, Stack, Tooltip, Typography } from "@mui/material"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const GroupCard = forwardRef(({
    refresh,
    setPage,
    group,
    setRequestedGroupId,
    setGroupJoinedModal,
    setApiGetGroup }, ref) => {
  const context = useContext(StoreContext);
  const [account] = context.account;
  const [, setLoginModal] = context.logInModal;
  const [joinState, setJoinState] = useState(false)
  const [openPendingModal, setPendingModal] = useState(false)

  const handleJoinRequest = () => {
    setRequestedGroupId(group.group_id)
    setPage('makeRequest')
  }

  const handleJoinClick = (e) => {
    ref.current = e.currentTarget.id; // detect click on join request button and get ID
    setLoginModal(true)
  }

  const handleAcceptClick = () => {
    setApiGetGroup(true)
    setTimeout(() => setGroupJoinedModal(true), 200) 
  }
  
  useEffect(() => {
    for (const member of group.group_members) {
      if (member.account_id === account.account_id) {
        if (member.join_status === 'Accepted') {
          setJoinState('Accepted')
        }
        else if (member.join_status === 'Pending') {
          setJoinState('Pending')
        }
        else {
          setJoinState('Rejected')
        }
        break
      }
    }
  }, [refresh])

  return (
    <Stack direction="row" spacing={2}
      sx={{ border: '3px solid #ad9fa3', borderRadius: '10px', bgcolor: 'antiquewhite', height: '10vh', m: 3, p: 1 }}
    >
      <img
        src={group.group_img}
        width="15%" height='100%'
        alt="Group picture"
      >
      </img>
      <Stack direction="column" spacing={1} width="85%" >
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              {group.group_name}
            </Typography>
            <Chip icon={<PeopleAltIcon />} label={group.group_members.reduce((total, member) => (
              total + (member.join_status === 'Accepted' ? 1 : 0)), 0)}
            />
          </Stack>
          {(() => {
            if (joinState === 'Accepted') {
              return (
                <Tooltip title="Accept Join Request" enterDelay={10}>
                  <Button id={group.group_id} variant='contained' color='success'
                    onClick={handleAcceptClick}
                  >
                    Accepted JOIN
                  </Button>
                </Tooltip>
              )
            }
            else if (joinState === 'Pending') {
              return (
                <Tooltip title="Request Pending" enterDelay={10}>
                  <Button id={group.group_id} variant='contained' color='warning'
                    onClick={() => setPendingModal(true)}
                  >
                    Pending
                  </Button>
                </Tooltip>

              )
            }
            else if (joinState === 'Rejected') {
              return (
                <Tooltip title="Request Rejected, Try again" enterDelay={10}>
                  <Button id={group.group_id} variant='contained' color='error'
                    onClick={handleJoinRequest}
                  >
                    Rejected
                  </Button>
                </Tooltip>

              )
            }
            else {
              return (
                <Tooltip title="Create Join Request" enterDelay={10}>
                  <Button id={group.group_id} variant='contained'
                    onClick={(e) => account.account_id ? handleJoinRequest() : handleJoinClick(e)}
                    sx={{ bgcolor: 'evenTastic.purple', '&:hover': { backgroundColor: 'evenTastic.dark_purple' } }}
                  >
                    Request Join
                  </Button>
                </Tooltip>

              )
            }
          })()}

        </Stack>
        <ScrollContainer thin>
          <Typography>
            {group.group_desc}
          </Typography>
        </ScrollContainer>
      </Stack>
      <GroupPendingModal open={openPendingModal} setOpen={setPendingModal} />
    </Stack>
  )
})

const GroupListingsPage = forwardRef(({
    refresh,
    setPage,
    groupList,
    setRequestedGroupId,
    eventTitle,
    setGroupJoinedModal,
    setApiGetGroup
  }, ref) => {
  return (
    <ScrollContainer thin>
      <Typography variant='h6' align='center' sx={{ mb: 2 }}>
        Request to join a group that suits you and have fun discussing <b>{eventTitle}</b>!
      </Typography>
      {groupList.map((group, idx) =>
        <GroupCard
          ref={ref}
          refresh={refresh}
          key={idx}
          group={group}
          setRequestedGroupId={setRequestedGroupId}
          setPage={setPage}
          setGroupJoinedModal={setGroupJoinedModal}
          setApiGetGroup={setApiGetGroup}
        />
      )}
    </ScrollContainer>
  )
})

export default GroupListingsPage