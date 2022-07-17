import { useEffect, useContext, useState } from "react"
import { StoreContext } from "../../../utils/context"
import AccountAPI from "../../../utils/AccountAPIHelper";
import GroupAPI from "../../../utils/GroupAPIHelper";
import { FlexBox, ScrollContainer } from "../../styles/layouts.styled";
import { Button, Card, CardMedia, Chip, Typography } from "@mui/material";

const accountApi = new AccountAPI()
const groupApi = new GroupAPI()

const MemberCard = ({ groupDetails, setGroupDetails, eventID, member }) => {
  const context = useContext(StoreContext);
  const [accountGroups, setAccountGroups] = context.groups;
  const [account, setAccount] = useState(false)

  const processRequest = async (status) => {
    try {
      const body = {
        op: "replace",
        path: "/join_status",
        value: status
      }
      console.log(body)
      const patchRes = await groupApi.patchGroupMember(
        groupDetails.group_id, member.group_membership_id, body
      )
      let updatedMembers = groupDetails.group_members.filter((m) => m.account_id !== member.account_id)
      updatedMembers.push(patchRes.data)
      const updatedGroup = { ...groupDetails, group_members: updatedMembers }
      setGroupDetails(updatedGroup) // update local account group
      const temp = accountGroups
      temp[eventID] = updatedGroup
      setAccountGroups(temp) // update global account groups
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    accountApi.getAccount(member.account_id)
      .then((res) => {
        setAccount(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <Card sx={{
      display: 'flex', borderRadius: '10px', height: '20vh',
      bgcolor: '#fff7ec', m: 3, p: 1
    }}
    >
      <CardMedia component="img" image={account.profile_pic}
        alt="User profile picture"
        sx={{ width: '15%', height: '100%', borderRadius: '100px', mr: 2 }}
      />
      <FlexBox direction='column' width="85%" >
        <FlexBox>
          <FlexBox direction='column' sx={{ minWidth: '15%' }}>
            <Typography variant="subtitle1" color="text.secondary">
              Name
            </Typography>
            <Typography>
              {account.first_name} {account.last_name}
            </Typography>
          </FlexBox>
          <FlexBox direction='column' sx={{ width: '65%' }}>
            <Typography variant="subtitle1" color="text.secondary">
              Interests
            </Typography>
            <ScrollContainer thin horizontal='true' sx={{ pb: 0.25 }}>
              {member.interest_tags.map((tag, idx) => (
                <Chip key={idx} color='success' label={tag.name} sx={{ ml: 0.5, mr: 0.5 }} />
              ))}
            </ScrollContainer>
          </FlexBox>
          <FlexBox sx={{ width: '10%', ml: 4 }}>
            <Button variant='contained' color='success'
              onClick={() => processRequest('Accepted')} sx={{ height: '3vh', mr: 2 }}
            >
              Accept
            </Button>
            <Button variant='contained' color='error'
              onClick={() => processRequest('Rejected')} sx={{ height: '3vh' }}
            >
              Decline
            </Button>
          </FlexBox>
        </FlexBox>
        <ScrollContainer thin flex='true' pr='1vw' sx={{ flexDirection: 'column', width: '97%' }} >
          <FlexBox direction='column' sx={{ mr: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              My bio
            </Typography>
            <Typography>
              {account.user_desc}
            </Typography>
          </FlexBox>
          <FlexBox direction='column' sx={{ mr: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Join request
            </Typography>
            <Typography>
              {member.join_desc}
            </Typography>
          </FlexBox>
        </ScrollContainer>
      </FlexBox>
    </Card>
  )
}


const GroupRequestsPage = ({ groupDetails, setGroupDetails, eventID }) => {
  const [isEmpty, setIsEmpty] = useState(0)

  useEffect(() => {
    groupApi.getGroup(groupDetails.group_id)
      .then((res) => {
        setGroupDetails(res.data)
        setIsEmpty(res.data.group_members.filter((member) => member.join_status === 'Pending').length)
      })
      .catch((err) => console.error(err))
  }, [groupDetails])

  return (
    <ScrollContainer thin pr='1vw'>
      {isEmpty
        ? ''
        : <Typography variant="h4" align='center' sx={{mt:5}}>
          No new join requests
        </Typography>
      }
      {groupDetails.group_members.filter((member) => member.join_status === 'Pending').map((member, idx) => (
        <MemberCard
          key={idx}
          groupDetails={groupDetails}
          setGroupDetails={setGroupDetails}
          eventID={eventID}
          member={member}
        />
      ))}
    </ScrollContainer>
  )
}

export default GroupRequestsPage