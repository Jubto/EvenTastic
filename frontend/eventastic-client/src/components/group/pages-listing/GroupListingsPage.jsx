import { ScrollContainer } from "../../styles/layouts.styled"
import { Button, Chip, Stack, Typography, styled } from "@mui/material"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const GroupCard = ({ setPage, group, setRequestedGroupId }) => {

  const handleJoinRequest = () => {
    setRequestedGroupId(group.group_id)
    setPage('makeRequest')
  }

  return (
    <Stack direction="row" spacing={2} 
      sx={{ border: '3px solid #ad9fa3', borderRadius:'10px', bgcolor:'antiquewhite', height:'10vh' , m:3, p:1 }}
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
            <Typography variant='h6' sx={{fontWeight:700}}>
              {group.group_name}
            </Typography>
            <Chip icon={<PeopleAltIcon />} label={group.group_members.length} />
          </Stack>
          <Button 
            variant='contained'
            onClick={handleJoinRequest} 
            sx={{ bgcolor: 'evenTastic.purple', '&:hover': { backgroundColor: 'evenTastic.dark_purple' } }}
          >
            Request Join
          </Button>
        </Stack>
        <ScrollContainer thin>
          <Typography>
            {group.group_desc}
          </Typography>
        </ScrollContainer>
      </Stack>
    </Stack>
  )
}

const GroupListingsPage = ({ setPage, groupList, setRequestedGroupId, eventTitle }) => {
  return (
    <ScrollContainer thin>
      <Typography variant='h6' align='center' sx={{ mb:2 }}>
        Request to join a group that suits you and have fun discussing <b>{eventTitle}</b>!
      </Typography>
      {groupList.map((group, idx) =>
        <GroupCard key={idx} group={group} setRequestedGroupId={setRequestedGroupId} setPage={setPage} />
      )}
    </ScrollContainer>
  )
}

export default GroupListingsPage